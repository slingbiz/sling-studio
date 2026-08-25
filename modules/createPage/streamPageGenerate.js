import {AI_SERVICE_URL} from '../../shared/constants/Services';

function getAiBase() {
  return (AI_SERVICE_URL || '').replace(/\/$/, '');
}

async function readSse(res, callbacks, signal) {
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let complete = null;

  while (true) {
    if (signal?.aborted) {
      reader.cancel().catch(() => {});
      throw new DOMException('Aborted', 'AbortError');
    }
    const {done, value} = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, {stream: true});
    const events = buffer.split('\n\n');
    buffer = events.pop();
    for (const event of events) {
      for (const line of event.split('\n')) {
        if (!line.startsWith('data: ')) continue;
        try {
          const data = JSON.parse(line.slice(6));
          switch (data.type) {
            case 'status':
              callbacks.onStatus?.(data.message);
              break;
            case 'code_token':
              callbacks.onCodeToken?.(data.text);
              break;
            case 'page':
              callbacks.onPage?.(data.page);
              break;
            case 'section':
              callbacks.onSection?.(data.section);
              break;
            case 'complete':
              complete = {page: data.page, sections: data.sections};
              callbacks.onComplete?.(complete);
              break;
            case 'error':
              throw new Error(data.message || 'Could not generate this page.');
            default:
              break;
          }
        } catch (err) {
          if (err instanceof SyntaxError) continue;
          throw err;
        }
      }
    }
  }

  return complete;
}

async function generateOnce(prompt, themeConfig, signal) {
  const aiBase = getAiBase();
  if (!aiBase) {
    throw new Error('AI service is not configured.');
  }
  const res = await fetch(`${aiBase}/page/generate`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({prompt, themeConfig}),
    signal,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Could not generate this page. Try a clearer prompt.');
  }
  if (!data.page || !Array.isArray(data.sections) || data.sections.length < 2) {
    throw new Error('That page did not split into sections. Try again.');
  }
  return data;
}

export async function streamPageFromPrompt(prompt, themeConfig, callbacks = {}, signal) {
  const aiBase = getAiBase();
  if (!aiBase) {
    throw new Error('AI service is not configured.');
  }

  const res = await fetch(`${aiBase}/page/generate/stream`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({prompt, themeConfig}),
    signal,
  });

  if (res.status === 404 || res.status === 405) {
    callbacks.onStatus?.('Generating…');
    const data = await generateOnce(prompt, themeConfig, signal);
    callbacks.onPage?.(data.page);
    data.sections.forEach((section) => callbacks.onSection?.(section));
    callbacks.onComplete?.(data);
    return data;
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Generation failed (${res.status})`);
  }

  const complete = await readSse(res, callbacks, signal);
  if (!complete?.page || !Array.isArray(complete.sections) || complete.sections.length < 2) {
    throw new Error('That page did not split into sections. Try again.');
  }
  return complete;
}
