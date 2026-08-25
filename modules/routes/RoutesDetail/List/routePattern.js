export function keysFromPattern(pattern = '') {
  return (pattern.match(/<[^>]+>/g) || []).map((token) => token.slice(1, -1));
}

export function buildSample(pattern = '', params = {}) {
  return keysFromPattern(pattern).reduce((acc, key) => {
    const value = params[key];
    return value ? acc.replace(`<${key}>`, value) : acc;
  }, pattern);
}

export function samplesFromRoute(route = {}) {
  const pattern = route.url_string || '';
  const keys = keysFromPattern(pattern);
  const params = {};
  keys.forEach((key) => {
    params[key] = '';
  });
  let sample = route.sample_string || '';
  let restPattern = pattern;
  keys.forEach((key) => {
    const token = `<${key}>`;
    const idx = restPattern.indexOf(token);
    if (idx < 0) {
      return;
    }
    const prefix = restPattern.slice(0, idx);
    if (!sample.startsWith(prefix)) {
      return;
    }
    sample = sample.slice(prefix.length);
    restPattern = restPattern.slice(idx + token.length);
    const nextLt = restPattern.indexOf('<');
    const literal = nextLt === -1 ? restPattern : restPattern.slice(0, nextLt);
    if (literal) {
      const end = sample.indexOf(literal);
      params[key] = end === -1 ? sample : sample.slice(0, end);
      sample = end === -1 ? '' : sample.slice(end);
    } else {
      params[key] = sample;
      sample = '';
    }
  });
  return params;
}
