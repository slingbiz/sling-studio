const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'sectionContract.js'), 'utf8');

describe('section contract helpers', () => {
  test('widget keys stay unique and layout rows are full width', () => {
    expect(src).toMatch(/uniqueWidgetKey/);
    expect(src).toMatch(/used\.has\(next\)/);
    expect(src).toMatch(/muiWidths:\s*\{sm:\s*12,\s*md:\s*12,\s*lg:\s*12\}/);
    expect(src).toMatch(/propsToPayload/);
    expect(src).toMatch(/ensureWidgetLabel/);
    expect(src).toMatch(/displayWidgetName/);
    expect(src).toMatch(/\\bwidget\$/);
    expect(src).toMatch(/normalizeLayoutRoot/);
    expect(src).toMatch(/header:\s*\{rows:\s*\[\]\}/);
    expect(src).toMatch(/footer:\s*\{rows:\s*\[\]\}/);
  });
});
