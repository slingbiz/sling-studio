const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
const pageIndex = fs.readFileSync(
  path.join(__dirname, '../../pages/headless-apis/index.js'),
  'utf8',
);
const pageAll = fs.readFileSync(
  path.join(__dirname, '../../pages/headless-apis/[...all].js'),
  'utf8',
);

describe('Headless APIs module', () => {
  test('old urls land on Widgets, not Guide splash', () => {
    expect(src).toMatch(/router\.replace\('\/widgets'\)/);
    expect(pageIndex).toMatch(/router\.replace\('\/widgets'\)/);
    expect(pageAll).toMatch(/router\.replace\('\/widgets'\)/);
    expect(src).not.toMatch(/ApisSideBar/);
    expect(pageIndex).not.toMatch(/apisModule/);
    expect(pageAll).not.toMatch(/apisModule/);
  });
});
