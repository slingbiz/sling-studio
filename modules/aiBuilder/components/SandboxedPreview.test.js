const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'SandboxedPreview.js'), 'utf8');

describe('SandboxedPreview', () => {
  test('loads the standalone preview runtime, not the Next.js Studio app', () => {
    expect(src).toMatch('/preview-runtime/widget-preview.html');
    expect(src).not.toMatch('/sandbox/widget-preview?');
  });

  test('does not treat iframe onLoad as ready, so a crashed Next boot cannot fake success', () => {
    expect(src).not.toMatch(/onLoad=\{\(\) => setIsReady\(true\)\}/);
  });
});
