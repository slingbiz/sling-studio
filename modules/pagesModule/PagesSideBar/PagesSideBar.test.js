const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
const styleSrc = fs.readFileSync(path.join(__dirname, 'index.style.js'), 'utf8');

describe('Pages sidebar', () => {
  test('lists Templates and inner layout tabs, not Guide or task leftovers', () => {
    expect(src).toMatch(/name:\s*'Templates'/);
    expect(src).toMatch(/name:\s*'Layout'/);
    expect(src).not.toMatch(/name:\s*'Guide'/);
    expect(src).not.toMatch(/name:\s*'Market Place'/);
    expect(src).not.toMatch(/Coming Soon/);
    expect(src).not.toMatch(/isAddTaskOpen/);
    expect(src).not.toMatch(/AddNewTask/);
  });

  test('selected styles use Sling orange and cream, not MUI primary', () => {
    expect(styleSrc).toMatch(/#ff9800/);
    expect(styleSrc).toMatch(/#fff8f0/);
    expect(styleSrc).not.toMatch(/palette\.primary\.main/);
  });
});
