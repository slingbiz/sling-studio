const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
const pageSrc = fs.readFileSync(
  path.join(__dirname, '../../../pages/invite/[token].js'),
  'utf8',
);

describe('Accept invite', () => {
  test('invite page is public and stores tokens the same way signin does', () => {
    expect(pageSrc).toMatch(/hoc\/Public/);
    expect(src).toMatch(/v1\/members\/invites/);
    expect(src).toMatch(/localStorage.setItem\('user'/);
    expect(src).toMatch(/localStorage.setItem\('token'/);
    expect(src).toMatch(/localStorage.setItem\('accessToken'/);
    expect(src).toMatch(/localStorage.setItem\('refreshToken'/);
    expect(src).toMatch(/loginToken/);
  });

  test('existing accounts see Join / log in, not a create-password form', () => {
    expect(src).toMatch(/existingAccount/);
    expect(src).toMatch(/>\s*Join\s*</);
    expect(src).toMatch(/Log in/);
    expect(src).toMatch(/loggedInAsInvitee/);
    expect(src).toMatch(/localStorage.getItem\('user'\)/);
    expect(src).toMatch(/You already have a Sling account/);
  });
});
