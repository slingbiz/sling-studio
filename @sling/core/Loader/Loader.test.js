const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');

describe('Shared Loader', () => {
  test('uses Sling orange, not default MUI blue', () => {
    expect(src).toMatch(/#ff9800/);
    expect(src).not.toMatch(/color=['"]primary['"]/);
    expect(src).not.toMatch(/palette\.primary/);
  });
});
