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
});
