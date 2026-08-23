const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');

describe('AiGenerateWidget layout', () => {
  test('collapses the prompt as soon as generate starts, not after the model returns', () => {
    const generateStart = src.slice(src.indexOf('const handleGenerate'));
    const beforeAwait = generateStart.slice(0, generateStart.indexOf('await streamGenerate'));
    expect(beforeAwait).toMatch(/setPromptOpen\(false\)/);
  });

  test('imports and uses the shared three-section editor tabs', () => {
    expect(src).toMatch(/WidgetEditorTabs/);
    expect(src).toMatch(/from ['"].*WidgetEditor\/WidgetEditorTabs['"]/);
  });

  test('keeps the editor visible while generating', () => {
    expect(src).toMatch(/isWorking \|\| phase === 'complete'/);
  });

  test('Enter generates and Shift+Enter still makes a new line', () => {
    expect(src).toMatch(/e\.key === 'Enter' && !e\.shiftKey/);
    expect(src).toMatch(/e\.preventDefault\(\)/);
  });

  test('saving props on a stored AI widget calls updateWidget', () => {
    expect(src).toMatch(/updateWidget/);
    expect(src).toMatch(/widget\?._id \|\| widget\?\.id/);
  });

  test('submit for review uses id or _id so a saved draft always shows the button', () => {
    expect(src).toMatch(/widget\?._id \|\| widget\?\.id/);
    expect(src).toMatch(/Submit for Review/);
  });

  test('admins and publishers get Publish; everyone else submits for review', () => {
    expect(src).toMatch(/publishWidgetAction/);
    expect(src).toMatch(/role === 'admin'/);
    expect(src).toMatch(/role === 'publisher'/);
    expect(src).toMatch(/'Publish'/);
    expect(src).toMatch(/Saved as draft/);
  });
});
