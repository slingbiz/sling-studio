const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
const detailSrc = fs.readFileSync(path.join(__dirname, '../index.js'), 'utf8');
const sidebarSrc = fs.readFileSync(
  path.join(__dirname, '../../SettingsSideBar/index.js'),
  'utf8',
);

describe('Settings → Audit', () => {
  test('SettingsDetail renders the Audit page', () => {
    expect(detailSrc).toMatch(/audit:\s*Audit/);
  });

  test('sidebar links to audit and hides it from people who cannot manage', () => {
    expect(sidebarSrc).toMatch(/alias:\s*'audit'/);
    expect(sidebarSrc).toMatch(/ownerAdminOnly/);
    expect(sidebarSrc).toMatch(/'members'/);
    expect(sidebarSrc).toMatch(/'audit'/);
    expect(sidebarSrc).toMatch(/role === 'owner'/);
    expect(sidebarSrc).toMatch(/role === 'admin'/);
  });

  test('search is on the left, Members-style table, no Export CSV', () => {
    expect(src).toMatch(/toolbarLeft/);
    expect(src).toMatch(/Search by action or widget/);
    expect(src).toMatch(/Events \{tc\}/);
    expect(src).toMatch(/Widget \/ object/);
    expect(src).toMatch(/v1\/audit/);
    expect(src).not.toMatch(/Export CSV/);
    expect(src).not.toMatch(/Last seen/);
  });

  test('403 tells the user only owners and admins can view audit', () => {
    expect(src).toMatch(/status === 403/);
    expect(src).toMatch(/Only Owners and Admins/);
  });

  test('uses Sling type scale, orange/cream, one loader', () => {
    expect(src).toMatch(/SLING_ORANGE|#ff9800/);
    expect(src).toMatch(/SLING_CREAM|#fff8f0/);
    expect(src).toMatch(/name:[\s\S]*fontSize:\s*16/);
    expect(src).toMatch(/cell:[\s\S]*fontSize:\s*14/);
    expect(src).toMatch(/Open Sans/);
    expect(src).not.toMatch(/fontSize:\s*12/);
    expect(src).not.toMatch(/theme\.palette\.primary\.main/);
    expect(src).toMatch(/CircularProgress/);
    expect(src).toMatch(/loading \?/);
    expect(src).not.toMatch(/Loading audit/);
  });

  test('empty state tells them to generate or save a widget', () => {
    expect(src).toMatch(/Nothing has been governed yet/);
    expect(src).toMatch(/Generate or save a widget/);
  });
});
