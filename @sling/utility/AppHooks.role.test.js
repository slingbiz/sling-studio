const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'AppHooks.js'), 'utf8');

describe('AppHooks JWT role', () => {
  test('uses the role from /auth instead of forcing the default user role', () => {
    expect(src).toMatch(/res\.data\.role \|\| storedUser\?\.role \|\| defaultUser\.role/);
    expect(src).not.toMatch(/role:\s*defaultUser\.role,/);
  });
});
