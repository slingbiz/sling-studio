const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'withData.js'), 'utf8');

describe('Public withData session', () => {
  test('checks accessToken and does not bounce signin without one', () => {
    expect(src).toMatch(/getItem\(\s*['"]accessToken['"]\s*\)/);
    expect(src).toMatch(/removeItem\(\s*['"]user['"]\s*\)/);

    const signinPush = src.slice(src.indexOf("pathname === '/signin'"));
    expect(signinPush).toMatch(/getItem\(\s*['"]accessToken['"]\s*\)/);
    expect(signinPush).toMatch(/initialUrl/);
  });
});
