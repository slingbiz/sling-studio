const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'Auth.js'), 'utf8');

describe('Auth.js login token storage', () => {
  test('onJwtSignIn stores tokens.access.token as token', () => {
    const signIn = src.slice(
      src.indexOf('export const onJwtSignIn'),
      src.indexOf('export const onJwtUserSignUp'),
    );
    expect(signIn).toMatch(
      /localStorage\.setItem\(\s*['"]token['"]\s*,\s*tokens\.access\.token\s*\)/,
    );
    expect(signIn).not.toMatch(
      /localStorage\.setItem\(\s*['"]token['"]\s*,\s*response\.data\.token\s*\)/,
    );
  });
});
