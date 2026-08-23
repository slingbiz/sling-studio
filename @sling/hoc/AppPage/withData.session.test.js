const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'withData.js'), 'utf8');

describe('AppPage withData session', () => {
  test('treats logged-in as stored user and accessToken or token', () => {
    expect(src).toMatch(/getItem\(\s*['"]accessToken['"]\s*\)/);
    expect(src).toMatch(/accessToken.*token|storedAccessToken|storedToken/);
    expect(src).toMatch(/removeItem\(\s*['"]user['"]\s*\)/);
  });
});
