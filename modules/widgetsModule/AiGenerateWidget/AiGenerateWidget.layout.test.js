const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');

describe('AiGenerateWidget layout', () => {
  test('collapses the prompt as soon as generate starts, not after the model returns', () => {
    const generateStart = src.slice(src.indexOf('const handleGenerate'));
    const beforeAwait = generateStart.slice(0, generateStart.indexOf('await streamGenerate'));
    expect(beforeAwait).toMatch(/setPromptOpen\(false\)/);
  });

  test('keeps the preview and code panes visible while generating', () => {
    expect(src).toMatch(/isWorking \|\| phase === 'complete'/);
  });

  test('Enter generates and Shift+Enter still makes a new line', () => {
    expect(src).toMatch(/e\.key === 'Enter' && !e\.shiftKey/);
    expect(src).toMatch(/e\.preventDefault\(\)/);
  });

  test('preview and code panes share the same 480px height', () => {
    expect(src).toMatch(/previewContainer:[\s\S]*height:\s*480/);
    expect(src).toMatch(/previewPlaceholder:[\s\S]*height:\s*480/);
    expect(src).toMatch(/codePane:[\s\S]*height:\s*480/);
  });
});
