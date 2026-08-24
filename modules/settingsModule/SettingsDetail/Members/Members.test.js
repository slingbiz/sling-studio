const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
const detailSrc = fs.readFileSync(path.join(__dirname, '../index.js'), 'utf8');
const sidebarSrc = fs.readFileSync(
  path.join(__dirname, '../../SettingsSideBar/index.js'),
  'utf8',
);

describe('Settings → Members', () => {
  test('SettingsDetail renders the Members page', () => {
    expect(detailSrc).toMatch(/members:\s*Members/);
  });

  test('sidebar links to members and hides it from people who cannot manage', () => {
    expect(sidebarSrc).toMatch(/alias:\s*'members'/);
    expect(sidebarSrc).toMatch(/role === 'owner'/);
    expect(sidebarSrc).toMatch(/role === 'admin'/);
    expect(sidebarSrc).toMatch(/item\.alias !== 'members'/);
    expect(sidebarSrc).toMatch(/\/settings\/\$\{item\.alias\}/);
  });

  test('invite is the primary action on the right in Sling orange', () => {
    expect(src).toMatch(/justifyContent:\s*['"]flex-end['"]/);
    expect(src).toMatch(/SLING_ORANGE|#ff9800/);
    expect(src).toMatch(/>\s*Invite\s*</);
    expect(src).toMatch(/Send invite/);
    expect(src).toMatch(/v1\/members\/invite/);
    expect(src).toMatch(/emailSent/);
    expect(src).toMatch(/Email did not send/);
  });

  test('403 tells the user only owners and admins can manage members', () => {
    expect(src).toMatch(/status === 403/);
    expect(src).toMatch(/Only Owners and Admins/);
  });

  test('uses Sling type scale, not Linear 12px', () => {
    expect(src).toMatch(/primaryBtn:[\s\S]*fontSize:\s*14/);
    expect(src).toMatch(/name:[\s\S]*fontSize:\s*16/);
    expect(src).toMatch(/cell:[\s\S]*fontSize:\s*14/);
    expect(src).not.toMatch(/fontSize:\s*12/);
    expect(src).not.toMatch(/fontSize:\s*13/);
  });
});
