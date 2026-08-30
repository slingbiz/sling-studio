const fs = require('fs');
const path = require('path');

const read = (rel) => fs.readFileSync(path.join(__dirname, rel), 'utf8');

describe('login and signup look like Sling', () => {
  test('login does not fake Remember Me or leftover tabs', () => {
    const signin = read('Signin/index.js');
    const form = read('Signin/SigninJwtAuth.js');
    expect(signin).not.toMatch(/Tabs/);
    expect(form).not.toMatch(/Remember Me|rememberMe/);
    expect(form).not.toMatch(/Checkbox/);
    expect(form).toMatch(/authButtonStyles|#ff9800/);
    expect(form).toMatch(/Try the demo account/);
  });

  test('signup keeps email-taken under the email field', () => {
    const signup = read('Signup/index.js');
    const form = read('Signup/SignupJwtAuth.js');
    expect(signup).not.toMatch(/Tabs/);
    expect(form).toMatch(/emailTakenError/);
    expect(form).toMatch(/authButtonStyles|#ff9800/);
    expect(form).not.toMatch(/Checkbox/);
  });

  test('both pages share the cream shell', () => {
    expect(read('Signin/index.js')).toMatch(/AuthShell/);
    expect(read('Signup/index.js')).toMatch(/AuthShell/);
    expect(read('AuthShell.js')).toMatch(/SLING_CREAM|SLING_ORANGE|SLING_INK/);
  });
});
