const fs = require('fs');
const path = require('path');

const customSrc = fs.readFileSync(path.join(__dirname, 'custom.js'), 'utf8');
const indexSrc = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');

describe('AppsSideBarFolderItem Sling theme', () => {
  test.each([
    ['custom.js', customSrc],
    ['index.js', indexSrc],
  ])('%s uses Sling orange and cream, not MUI primary.main', (_name, src) => {
    expect(src).toMatch(/#ff9800/);
    expect(src).toMatch(/#fff8f0/);
    expect(src).not.toMatch(/theme\.palette\.primary\.main/);
    expect(src).toMatch(/fontSize:\s*16/);
    expect(src).not.toMatch(/fontSize:\s*14/);
    expect(src).not.toMatch(/fontSize:\s*12/);
  });

  test('custom.js still highlights the active route', () => {
    expect(customSrc).toMatch(/className=\{clsx\(classes\.listItem/);
    expect(customSrc).toMatch(/active:/);
    expect(customSrc).toMatch(/getSelectedRoute\(\)/);
  });
});
