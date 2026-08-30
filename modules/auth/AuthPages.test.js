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

  test('does not ship leftover Firebase login', () => {
    expect(fs.existsSync(path.join(__dirname, 'Signin/SigninFirebase.js'))).toBe(
      false,
    );
    expect(fs.existsSync(path.join(__dirname, 'Signup/SignupFirebase.js'))).toBe(
      false,
    );
  });

  test('both pages share the cream shell', () => {
    expect(read('Signin/index.js')).toMatch(/AuthShell/);
    expect(read('Signup/index.js')).toMatch(/AuthShell/);
    expect(read('AuthShell.js')).toMatch(/SLING_CREAM|SLING_ORANGE|SLING_INK/);
  });

  test('shell fills the page and centers the card', () => {
    const shell = read('AuthShell.js');
    expect(shell).toMatch(/width:\s*['"]100%['"]/);
    expect(shell).toMatch(/alignItems:\s*['"]center['"]/);
    expect(shell).toMatch(/justifyContent:\s*['"]center['"]/);
    const layout = fs.readFileSync(
      path.join(__dirname, '../../@sling/hoc/Public/AuthLayout.js'),
      'utf8',
    );
    expect(layout).toMatch(/width:\s*['"]100%['"]/);
    expect(layout).toMatch(/flexDirection:\s*['"]column['"]/);
  });
});
