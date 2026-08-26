const fs = require('fs');
const path = require('path');
const {
  layoutRowsFromWidgets,
  buildLayoutRoot,
} = require('./sectionContract');

const src = fs.readFileSync(path.join(__dirname, 'sectionContract.js'), 'utf8');

const widgets = (n) =>
  Array.from({length: n}, (_, i) => ({
    key: `W${i + 1}`,
    type: 'widget',
    props: [],
  }));

describe('section contract helpers', () => {
  test('widget keys stay unique and layout uses the sm/md/lg grid', () => {
    expect(src).toMatch(/uniqueWidgetKey/);
    expect(src).toMatch(/used\.has\(next\)/);
    expect(src).toMatch(/layoutRowsFromWidgets/);
    expect(src).toMatch(/HALF_WIDTH/);
    expect(src).toMatch(/THIRD_WIDTH/);
    expect(src).toMatch(/propsToPayload/);
    expect(src).toMatch(/ensureWidgetLabel/);
    expect(src).toMatch(/displayWidgetName/);
    expect(src).toMatch(/\\bwidget\$/);
    expect(src).toMatch(/normalizeLayoutRoot/);
    expect(src).toMatch(/header:\s*\{rows:\s*\[\]\}/);
    expect(src).toMatch(/footer:\s*\{rows:\s*\[\]\}/);
  });

  test('five widgets: full-width hero and CTA, three-up in the middle', () => {
    const rows = layoutRowsFromWidgets(widgets(5));
    expect(rows).toHaveLength(3);
    expect(rows[0].cells).toHaveLength(1);
    expect(rows[0].cells[0].payload.muiWidths).toEqual({
      sm: 12,
      md: 12,
      lg: 12,
    });
    expect(rows[1].cells).toHaveLength(3);
    expect(rows[1].cells[0].payload.muiWidths).toEqual({
      sm: 12,
      md: 6,
      lg: 4,
    });
    expect(rows[2].cells).toHaveLength(1);
    expect(rows[2].cells[0].key).toBe('W5');
  });

  test('six widgets: hero, two half-width rows, CTA', () => {
    const rows = layoutRowsFromWidgets(widgets(6));
    expect(rows.map((row) => row.cells.length)).toEqual([1, 2, 2, 1]);
    expect(rows[1].cells[0].payload.muiWidths).toEqual({
      sm: 12,
      md: 6,
      lg: 6,
    });
    expect(buildLayoutRoot(widgets(6)).body.rows).toHaveLength(4);
  });
});
