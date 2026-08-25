const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');

describe('Headless APIs inner nav', () => {
  test('hides All Apis and other mock folders', () => {
    expect(src).toMatch(/export const folderList = \[\]/);
    expect(src).not.toMatch(/All Apis/);
    expect(src).not.toMatch(/alias:\s*'api-list'/);
    expect(src).not.toMatch(/alias:\s*'sling-mappings'/);
    expect(src).not.toMatch(/alias:\s*'auto-sync'/);
    expect(src).not.toMatch(/alias:\s*'guide'/);
    expect(src).not.toMatch(/alias:\s*'basic'/);
  });
});
