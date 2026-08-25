const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
const copy = fs.readFileSync(path.join(__dirname, 'pageIntro.js'), 'utf8');

describe('AppsContainer page heading', () => {
  test('renders a heading and description so people know what the page is', () => {
    expect(src).toMatch(/component='h1'/);
    expect(src).toMatch(/description/);
    expect(src).toMatch(/#163a5f/);
    expect(src).toMatch(/fontSize: 20/);
    expect(src).toMatch(/fontSize: 14/);
  });

  test('keeps human copy for the main Studio screens', () => {
    expect(copy).toMatch(/A template is the layout/);
    expect(copy).toMatch(/A route is a URL/);
    expect(copy).toMatch(/Building blocks for templates/);
    expect(copy).toMatch(/Who can work in this workspace/);
  });

  test('every main rail module passes a heading and a one-line description', () => {
    const readModule = (rel) =>
      fs.readFileSync(path.join(__dirname, '../../../modules', rel), 'utf8');
    expect(readModule('pagesModule/index.js')).toMatch(/description=\{intro\.description\}/);
    expect(readModule('routes/index.js')).toMatch(/description=\{routesCopy\.description\}/);
    expect(readModule('themeModule/index.js')).toMatch(/description=\{themeCopy\.description\}/);
    expect(readModule('settingsModule/index.js')).toMatch(/description=\{intro\.description\}/);
    expect(readModule('widgetsModule/index.js')).toMatch(/description=\{intro\.description\}/);
    expect(readModule('media/index.js')).toMatch(/description=\{intro\.description\}/);
  });
});
