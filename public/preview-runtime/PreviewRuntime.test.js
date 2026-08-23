const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'widget-preview.html'), 'utf8');

describe('preview runtime scope', () => {
  test('includes MUI components that are objects, not only functions', () => {
    expect(src).toMatch(/typeof value === 'object'/);
    expect(src).not.toMatch(
      /typeof MaterialUI\[key\] === 'function'\) \{\s*scope\[key\] = MaterialUI\[key\];/,
    );
  });

  test('allows unpkg source-map requests so the runtime does not die on connect-src none', () => {
    expect(src).toMatch(/connect-src https:\/\/unpkg.com/);
  });

  test('does not force the preview document to full viewport height', () => {
    expect(src).not.toMatch(/min-height:\s*100vh/);
  });

  test('lets a tall or wide widget scroll inside the preview pane', () => {
    expect(src).toMatch(/overflow:\s*auto/);
    expect(src).not.toMatch(/#sling-sandbox-root \{[\s\S]*overflow:\s*hidden/);
  });
});
