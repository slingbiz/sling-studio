const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
const page404 = fs.readFileSync(
  path.join(__dirname, '../../../pages/404.js'),
  'utf8',
);

describe('Sling 404', () => {
  test('is branded and sends signed-out people to login', () => {
    expect(src).toMatch(/#ff9800/);
    expect(src).toMatch(/#fff8f0/);
    expect(src).toMatch(/#163a5f/);
    expect(src).toMatch(/Open Sans/);
    expect(src).toMatch(/sling\.biz/);
    expect(src).toMatch(/Go to Create/);
    expect(src).toMatch(/hasStudioSession/);
    expect(src).toMatch(/location\.replace\(\s*['"]\/signin['"]\s*\)/);
    expect(src).not.toMatch(/errorPageImages\/404/);
    expect(src).not.toMatch(/color=['"]primary['"]/);
    expect(src).not.toMatch(/#0A8FDC/);
  });

  test('pages/404 uses the shared Sling 404', () => {
    expect(page404).toMatch(/modules\/errorPages\/Error404/);
    expect(page404).not.toMatch(/errorPageImages\/404/);
  });
});
