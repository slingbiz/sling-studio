const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');

describe('Pages detail routing', () => {
  test('does not mount a Data Coming Soon page', () => {
    expect(src).not.toMatch(/DataSource/);
    expect(src).not.toMatch(/data:\s*DataSource/);
    expect(src).not.toMatch(/Coming Soon/);
  });

  test('old /data urls land on Layout', () => {
    expect(src).toMatch(/section === 'data' \? Layout/);
    expect(src).toMatch(/\/pages\/\$\{pageKey\}\/layout/);
    expect(src).toMatch(/section === 'data' && pageKey/);
  });
});
