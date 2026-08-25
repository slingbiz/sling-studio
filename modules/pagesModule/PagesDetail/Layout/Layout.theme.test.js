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
  'SelectBreakpoints.js',
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
const settings = read('LayoutSettings.js');
const breakpoints = read('SelectBreakpoints.js');
const switches = read('DeviceVisibilitySwitches.js');

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
    expect(templateProps).toMatch(/>\s*Add prop\s*</);
    expect(templateProps).toMatch(/>\s*Gallery\s*</);
    expect(templateProps).toMatch(/updateWidget/);
  });

  test('delete and edit actions stay visible, not hover-only', () => {
    expect(read('DragMeEdit.js')).toMatch(/visibility:\s*['"]visible['"]/);
    expect(read('LayoutEditView.js')).toMatch(/opacity:\s*1/);
    expect(read('index.js')).toMatch(/Edit Layout/);
    expect(read('index.js')).toMatch(/router\.query\?\.edit/);
  });

  test('General Settings is a white card with ink labels and human breakpoints', () => {
    const panel = settings + breakpoints + switches;
    expect(panel).toMatch(/#ff9800/);
    expect(panel).toMatch(/#163a5f/);
    expect(breakpoints).toMatch(/Mobile \(sm\)/);
    expect(breakpoints).toMatch(/Tablet \(md\)/);
    expect(breakpoints).toMatch(/Desktop \(lg\)/);
    expect(breakpoints).toMatch(/name=\{bp\.id\}/);
    expect(settings).toMatch(/Click a widget on the canvas to edit settings/);
    const accordionOpens = settings.match(/<Accordion\b[^>]*>/g) || [];
    expect(accordionOpens.every((tag) => !/disabled=/.test(tag))).toBe(true);
    expect(settings).not.toMatch(/color=['"]text\.secondary['"]/);
    expect(breakpoints).not.toMatch(/color=['"]text\.secondary['"]/);
    expect(switches).toMatch(/MuiFormControlLabel-label/);
  });

  test('widget library cards use a light ink shadow and 16px names', () => {
    expect(editView).toMatch(/0 1px 3px rgba\(22,58,95,0\.12\)/);
    expect(editView).toMatch(/widgetLabel:[\s\S]*fontSize:\s*16/);
    expect(editView).toMatch(/#163a5f/);
  });
});
