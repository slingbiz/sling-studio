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

  test('always shows Review Queue so submitted widgets have a home', () => {
    expect(src).toMatch(/name:\s*'Review Queue'/);
    expect(src).not.toMatch(/adminOnly:\s*true/);
  });

  test('lists AI Generate as the second item after Widgets', () => {
    const folderStart = src.indexOf('export const folderList');
    const folderEnd = src.indexOf('];', folderStart);
    const names = [
      ...src.slice(folderStart, folderEnd).matchAll(/name:\s*'([^']+)'/g),
    ].map((match) => match[1]);
    expect(names[0]).toBe('Widgets');
    expect(names[1]).toBe('AI Generate');
    expect(names[2]).toBe('Review Queue');
  });
});
