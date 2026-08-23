const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');

describe('WidgetsIntegration live preview', () => {
  test('renders a sandboxed preview when a widget has code', () => {
    expect(src).toMatch(/item\.code \?/);
    expect(src).toMatch(/SandboxedPreview/);
  });

  test('does not baseline-align cards so the grid stays even', () => {
    expect(src).not.toMatch(/alignItems='baseline'/);
    expect(src).toMatch(/alignItems='stretch'/);
  });

  test('old widgets without code use a fixed preview slot, not the widget name', () => {
    expect(src).toMatch(/No live preview/);
    expect(src).toMatch(/previewSlot/);
  });

  test('does not nest a Grid inside the card, which let previews blow the row height', () => {
    const cardStart = src.indexOf('className={classes.widgetCard}');
    const cardChunk = src.slice(cardStart, cardStart + 800);
    expect(cardChunk).not.toMatch(/<Grid/);
  });

  test('lists published widgets by default and can filter to drafts', () => {
    expect(src).toMatch(/status:\s*'published'/);
    expect(src).toMatch(/label: 'Published'/);
    expect(src).toMatch(/label: 'Draft'/);
  });

  test('does not force type: widget so all widget records appear in one list', () => {
    expect(src).toMatch(/useState\(\{status:\s*'published'\}\)/);
    expect(src).not.toMatch(/type:\s*'widget'/);
    expect(src).not.toMatch(/getWidgetType/);
  });

  test('maps an array even if widgets is a nested API object', () => {
    expect(src).toMatch(/Array\.isArray\(widgets\) \? widgets : \[\]/);
  });

  test('does not dump removable status - published chips next to the yellow filter', () => {
    expect(src).not.toMatch(/status - \$\{/);
    expect(src).not.toMatch(/onDelete=\{\(\) => handleDeleteFilter/);
    expect(src).not.toMatch(/Object\.keys\(filter\)/);
  });

  test('does not show the inline ListEmptyResult loader', () => {
    expect(src).not.toMatch(/loading=\{loading\}/);
  });

  test('fetches the first page of 8 widgets', () => {
    expect(src).toMatch(/size:\s*8/);
    expect(src).toMatch(/page:\s*0/);
  });

  test('appends the next page when the grid sentinel intersects', () => {
    expect(src).toMatch(/IntersectionObserver/);
    expect(src).toMatch(/append:\s*true/);
  });
});
