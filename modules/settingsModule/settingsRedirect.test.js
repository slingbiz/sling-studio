const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');

describe('Settings module', () => {
  test('old /settings/theme URLs move to the Theme rail', () => {
    expect(src).toMatch(/all\?\.\[0\] === 'theme'/);
    expect(src).toMatch(/router\.replace\('\/theme'\)/);
  });
});
