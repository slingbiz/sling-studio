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

  test('listIcon is at least 24px and nav type is not 12px', () => {
    const listIcon = src.match(/listIcon:\s*\{[\s\S]*?\n    \}/)[0];
    const iconSize = Number(listIcon.match(/fontSize:\s*(\d+)/)[1]);
    expect(iconSize).toBeGreaterThanOrEqual(24);
    expect(src).toMatch(/nav-item-text[\s\S]*?fontSize:\s*16/);
    expect(src).not.toMatch(/fontSize:\s*12\b/);
  });
});
