const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');

describe('Settings sidebar folderList', () => {
  test('keeps Company, Keys, Members, Audit and not Theme', () => {
    expect(src).toMatch(/name:\s*'Company'/);
    expect(src).toMatch(/name:\s*'Keys & Usage'/);
    expect(src).toMatch(/name:\s*'Members'/);
    expect(src).toMatch(/name:\s*'Audit'/);
    expect(src).not.toMatch(/name:\s*'Theme'/);
    expect(src).not.toMatch(/alias:\s*'theme'/);
  });
});
