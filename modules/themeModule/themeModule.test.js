const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
const pageSrc = fs.readFileSync(
  path.join(__dirname, '../../pages/theme/index.js'),
  'utf8',
);

describe('Theme main rail page', () => {
  test('renders Theme settings full width, not inside Settings', () => {
    expect(src).toMatch(/from '\.\.\/settingsModule\/SettingsDetail\/Theme'/);
    expect(src).toMatch(/fullView/);
    expect(src).not.toMatch(/SettingsSideBar/);
    expect(pageSrc).toMatch(/modules\/themeModule/);
  });
});
