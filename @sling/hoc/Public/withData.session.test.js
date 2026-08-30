const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'withData.js'), 'utf8');

describe('Public withData session', () => {
  test('checks accessToken and does not bounce signin without one', () => {
    expect(src).toMatch(/getItem\(\s*['"]accessToken['"]\s*\)/);
    expect(src).toMatch(/removeItem\(\s*['"]user['"]\s*\)/);

    expect(src).toMatch(/isPublicAuthPath/);
    expect(src).toMatch(/getItem\(\s*['"]accessToken['"]\s*\)/);
    expect(src).toMatch(/initialUrl/);
  });

  test('invite accept stays public so a guest can join', () => {
    expect(src).toMatch(/startsWith\(['"]\/invite['"]\)/);
  });
});
