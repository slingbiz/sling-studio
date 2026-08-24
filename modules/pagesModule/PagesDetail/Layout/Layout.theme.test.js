const fs = require('fs');
const path = require('path');

const dir = __dirname;
const layoutFiles = [
  'LayoutEditView.js',
  'LayoutView.js',
  'LayoutHeader.js',
  'DragMe.js',
  'DragMeEdit.js',
  'EditLayout.js',
  'LayoutSettings.js',
  'TemplateProps.js',
  'DeviceVisibilitySwitches.js',
  'index.js',
  'WidgetLibraryPreview.js',
];

const read = (name) => fs.readFileSync(path.join(dir, name), 'utf8');
const combined = layoutFiles.map(read).join('\n');
const editView = read('LayoutEditView.js');
const preview = read('WidgetLibraryPreview.js');
const templateProps = read('TemplateProps.js');

describe('Layout editor 2026 ink restyle', () => {
  test('uses 2026 ink blue and Sling orange', () => {
    expect(combined).toMatch(/#163a5f/);
    expect(combined).toMatch(/#ff9800/);
  });

  test('does not use leftover MUI cyan or Material Blue 500', () => {
    expect(combined).not.toMatch(/#0081CB/i);
    expect(combined).not.toMatch(/#1976d2/i);
  });

  test('Search Widgets is still present and runs on icon and Enter', () => {
    expect(editView).toMatch(/Search Widgets/);
    expect(editView).toMatch(/onClick=\{applySearch\}/);
    expect(editView).toMatch(/e\.key === 'Enter'/);
  });

  test('widget library prefers a thumbnail then a capped live preview', () => {
    expect(preview).toMatch(/item\.image/);
    expect(preview).toMatch(/screenshot/);
    expect(preview).toMatch(/SandboxedPreview/);
    expect(preview).toMatch(/MAX_LIVE = 3/);
    expect(preview).toMatch(/IntersectionObserver/);
    expect(editView).toMatch(/WidgetLibraryPreview/);
  });

  test('does not fake Add New Prop and keeps Gallery pick', () => {
    expect(templateProps).not.toMatch(/Add New Prop/);
    expect(templateProps).toMatch(/>\s*Gallery\s*</);
  });

  test('delete and edit actions stay visible, not hover-only', () => {
    expect(read('DragMeEdit.js')).toMatch(/visibility:\s*['"]visible['"]/);
    expect(read('LayoutEditView.js')).toMatch(/opacity:\s*1/);
    expect(read('index.js')).toMatch(/Edit Layout/);
  });
});
