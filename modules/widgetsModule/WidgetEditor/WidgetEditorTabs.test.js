const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'WidgetEditorTabs.js'), 'utf8');

describe('WidgetEditorTabs', () => {
  test('exposes Widget, Code, and Meta & Props tabs', () => {
    expect(src).toMatch(/['"]Widget['"]/);
    expect(src).toMatch(/['"]Code['"]/);
    expect(src).toMatch(/['"]Meta & Props['"]/);
  });

  test('selected tab uses brand orange', () => {
    expect(src).toMatch(/#ff9800/);
  });

  test('Widget tab previews code in SandboxedPreview or shows No live preview', () => {
    expect(src).toMatch(/SandboxedPreview/);
    expect(src).toMatch(/No live preview/);
  });

  test('keeps page-builder props as name, propType, dataType, default', () => {
    expect(src).toMatch(/name:\s*['"]['"]/);
    expect(src).toMatch(/propType/);
    expect(src).toMatch(/dataType/);
    expect(src).toMatch(/default:\s*['"]['"]/);
    expect(src).not.toMatch(/requiredProps/);
  });

  test('does not offer Block or Component as a widget type', () => {
    expect(src).not.toMatch(/label:\s*['"]Block['"]/);
    expect(src).not.toMatch(/label:\s*['"]Component['"]/);
    expect(src).not.toMatch(/componentType/);
  });
});
