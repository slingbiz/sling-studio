const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');

describe('InfoView session toasts', () => {
  test('does not toast 401 / please authenticate / invalidSession', () => {
    expect(src).toMatch(/please authenticate/i);
    expect(src).toMatch(/invalidSession/i);
    expect(src).toMatch(/401/);
  });
});
