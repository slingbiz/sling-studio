const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');

describe('WidgetsIntegration live preview', () => {
  test('renders a sandboxed preview when a widget has code', () => {
    expect(src).toMatch(/item\.code \?/);
    expect(src).toMatch(/SandboxedPreview/);
  });
});
