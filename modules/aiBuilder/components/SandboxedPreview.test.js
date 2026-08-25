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

  test('shows a loader until the sandbox reports RENDER_SUCCESS', () => {
    expect(src).toMatch(/aria-label='Loading preview'/);
    expect(src).toMatch(/RENDER_SUCCESS/);
    expect(src).toMatch(/setPainted\(true\)/);
  });

  test('clips the iframe so a tall widget cannot blow out the card', () => {
    expect(src).toMatch(/overflow: 'hidden'/);
  });

  test('fitContent sizes to sandbox HEIGHT and turns off inner scroll', () => {
    expect(src).toMatch(/fitContent/);
    expect(src).toMatch(/HEIGHT/);
    expect(src).toMatch(/pointerEvents: fitContent \? 'none' : 'auto'/);
  });

  test('does not reload the iframe when onError identity changes', () => {
    expect(src).toMatch(/onErrorRef/);
    expect(src).not.toMatch(/}, \[onError\]\);/);
  });
});
