const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');

describe('Widgets sidebar folderList', () => {
  test('has Widgets and does not include Blocks or Components names', () => {
    expect(src).toMatch(/name:\s*'Widgets'/);
    expect(src).toMatch(/alias:\s*'widgets-integration'/);
    expect(src).not.toMatch(/name:\s*'Blocks'/);
    expect(src).not.toMatch(/name:\s*'Components'/);
  });

  test('hides Review Queue unless the signed-in user can publish', () => {
    expect(src).toMatch(/name:\s*'Review Queue'/);
    expect(src).toMatch(/adminOnly:\s*true/);
    expect(src).toMatch(/visibleFolders/);
    expect(src).toMatch(/role === 'admin'/);
    expect(src).toMatch(/role === 'publisher'/);
  });
});
