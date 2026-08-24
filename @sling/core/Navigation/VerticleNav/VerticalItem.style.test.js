const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'VerticalItem.style.js'), 'utf8');

describe('VerticalItem main rail Sling theme', () => {
  test('selected and hover use Sling orange, not MUI primary.main', () => {
    expect(src).toMatch(/#ff9800/);
    expect(src).not.toMatch(/theme\.palette\.primary\.main/);
    expect(src).not.toMatch(/#0A8FDC/);
  });

  test('still highlights the active route', () => {
    expect(src).toMatch(/&.active/);
    expect(src).toMatch(/backgroundColor:\s*['"]#ff9800['"]/);
  });
});
