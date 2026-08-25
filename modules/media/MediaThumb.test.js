const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'MediaThumb.js'), 'utf8');

describe('MediaThumb', () => {
  test('missing url skips the img request and broken files use onError', () => {
    expect(src).toMatch(/onError/);
    expect(src).toMatch(/No image/);
    expect(src).toMatch(/!url \|\| failed/);
    expect(src).toMatch(/SLING_CREAM|#fff8f0/);
    expect(src).toMatch(/fontSize:\s*14/);
    expect(src).toMatch(/Open Sans/);
  });
});
