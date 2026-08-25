const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');

describe('Sling snackbar', () => {
  test('uses Studio ink and orange, not leftover MUI green or primary blue', () => {
    expect(src).toMatch(/#163a5f/);
    expect(src).toMatch(/#ff9800/);
    expect(src).toMatch(/Open Sans/);
    expect(src).toMatch(/fontSize:\s*14/);
    expect(src).toMatch(/borderRadius:\s*8/);
    expect(src).toMatch(/horizontal:\s*'right'/);
    expect(src).toMatch(/zIndex:\s*2000/);
    expect(src).not.toMatch(/green\[600\]/);
    expect(src).not.toMatch(/amber\[700\]/);
    expect(src).not.toMatch(/theme\.palette\.primary\.main/);
  });
});
