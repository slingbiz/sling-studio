const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'VerticalItem.js'), 'utf8');

describe('VerticalItem disabled nav items', () => {
  test('hides disabled items instead of greying them out', () => {
    expect(src).toMatch(/if\s*\(\s*item\.disabled\s*\)/);
    expect(src).toMatch(/return null/);
    expect(src).not.toMatch(/item\.disabled \? '' : item\.url/);
    expect(src).not.toMatch(/item\.disabled \? classes\.disabled/);
  });
});
