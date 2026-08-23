const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'AddWidgetModal.js'), 'utf8');
const tabsSrc = fs.readFileSync(
  path.join(__dirname, '../../WidgetEditor/WidgetEditorTabs.js'),
  'utf8',
);

describe('AddWidgetModal combined editor', () => {
  test('uses the shared Widget, Code, and Meta & Props editor', () => {
    expect(src).toMatch(/WidgetEditorTabs/);
    expect(tabsSrc).toMatch(/['"]Widget['"]/);
    expect(tabsSrc).toMatch(/['"]Code['"]/);
    expect(tabsSrc).toMatch(/['"]Meta & Props['"]/);
  });

  test('hides the Widget Type dropdown and always persists type widget', () => {
    expect(src).toMatch(/type:\s*['"]widget['"]/);
    expect(src).not.toMatch(/componentType/);
    expect(src).not.toMatch(/label:\s*['"]Block['"]/);
    expect(src).not.toMatch(/label:\s*['"]Component['"]/);
    expect(src).not.toMatch(/name=['"]type['"]/);
  });

  test('keeps Cancel and Save on the modal', () => {
    expect(src).toMatch(/Cancel/);
    expect(src).toMatch(/updateProp \? 'Update' : 'Save'/);
  });

  test('modal save actions sit on the right with sling orange', () => {
    expect(src).toMatch(/justifyContent:\s*['"]flex-end['"]/);
    expect(src).toMatch(/SLING_ORANGE|#ff9800/);
  });
});
