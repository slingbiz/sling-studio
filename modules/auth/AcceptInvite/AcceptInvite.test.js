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
});
