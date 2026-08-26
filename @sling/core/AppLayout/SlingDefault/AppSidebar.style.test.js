const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'AppSidebar.style.js'), 'utf8');

describe('SlingDefault mini rail hover', () => {
  test('expands width only, with a smooth ease, and never animates all', () => {
    expect(src).toMatch(/cubic-bezier\(0\.22, 1, 0\.36, 1\)/);
    expect(src).toMatch(/transition: `width 280ms/);
    expect(src).not.toMatch(/transition:\s*['"]all /);
  });

  test('labels stay one line and fade in after the rail has room', () => {
    expect(src).toMatch(/whiteSpace:\s*['"]nowrap['"]/);
    expect(src).toMatch(/opacity: 0/);
    expect(src).toMatch(/opacity: 1/);
    expect(src).toMatch(/90ms/);
    expect(src).not.toMatch(/opecity/);
  });

  test('active pill stays a rounded tile, not a stretching half-capsule', () => {
    expect(src).toMatch(/borderRadius: 8/);
    expect(src).not.toMatch(/30px 30px 0/);
  });

  test('collapsed rail centers icons in a square tile', () => {
    expect(src).toMatch(/justifyContent:\s*['"]center['"]/);
    expect(src).toMatch(/marginLeft:\s*['"]auto['"]/);
    expect(src).toMatch(/marginRight:\s*['"]auto['"]/);
    expect(src).toMatch(/width:\s*48/);
    expect(src).toMatch(/position:\s*['"]absolute['"]/);
    expect(src).toMatch(/flex:\s*['"]0 0 0['"]/);
  });
});
