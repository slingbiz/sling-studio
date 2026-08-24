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
    expect(src).toMatch(/SLING_ORANGE|#ff9800/);
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

  test('meta fields use sling orange and cream fill, not palette.primary.main', () => {
    expect(src).toMatch(/SLING_ORANGE|#ff9800/);
    expect(src).toMatch(/SLING_CREAM|#fff8f0/);
    expect(src).toMatch(/background:\s*SLING_CREAM/);
    expect(src).not.toMatch(/theme\.palette\.primary\.main/);
    expect(src).not.toMatch(/#0A8FDC/);
  });

  test('meta fields fill a two-column grid with labels above, not a skinny left stack', () => {
    expect(src).toMatch(/fields:[\s\S]*gridTemplateColumns:\s*['"]1fr 1fr['"]/);
    expect(src).toMatch(/fieldWide/);
    expect(src).toMatch(/fieldLabel/);
    expect(src).toMatch(/htmlFor=/);
    expect(src).toMatch(/fontSize:\s*14/);
    expect(src).toMatch(/Open Sans/);
    expect(src).not.toMatch(/maxWidth:\s*560/);
  });

  test('Required Props is a table with headers, Add on the right, and delete always visible', () => {
    expect(src).toMatch(/Required Props/);
    expect(src).toMatch(/Prop Name/);
    expect(src).toMatch(/Data Type/);
    expect(src).toMatch(/Default Value/);
    expect(src).toMatch(/Prop Type/);
    expect(src).toMatch(/propsHead:[\s\S]*justifyContent:\s*['"]space-between['"]/);
    expect(src).toMatch(/>\s*Add\s*</);
    expect(src).toMatch(/deleteBtn:[\s\S]*visibility:\s*['"]visible['"]/);
    expect(src).not.toMatch(/Export CSV/);
  });

  test('code tab uses Monaco with line numbers and sling cream chrome', () => {
    expect(src).toMatch(/@monaco-editor\/react/);
    expect(src).toMatch(/lineNumbers:\s*['"]on['"]/);
    expect(src).toMatch(/fontSize:\s*14/);
    expect(src).toMatch(/sling-cream|#fff8f0/);
    expect(src).toMatch(/#ff9800/);
    expect(src).not.toMatch(/<textarea/);
  });
});
