const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'routesConfig.js'), 'utf8');

describe('main left rail routesConfig', () => {
  test('keeps real product surfaces', () => {
    const titles = [...src.matchAll(/title:\s*'([^']+)'/g)].map(
      (match) => match[1],
    );
    expect(titles).toEqual([
      'Home',
      'Create',
      'Page Templates',
      'Routes',
      'Widgets',
      'Media',
      'Theme',
      'Settings',
    ]);
  });

  test('does not list dead or greyed stubs', () => {
    expect(src).not.toMatch(/disabled:\s*true/);
    expect(src).not.toMatch(/AI Builder/);
    expect(src).not.toMatch(/SiteMap/);
    expect(src).not.toMatch(/Amp Pages/);
    expect(src).not.toMatch(/Emailers/);
    expect(src).not.toMatch(/Analytics/);
    expect(src).not.toMatch(/Build & Deploy/);
    expect(src).not.toMatch(/Market Place/);
    expect(src).not.toMatch(/Coming Soon/);
    expect(src).not.toMatch(/headless-apis/);
    expect(src).not.toMatch(/All Apis/);
    expect(src).toMatch(/url:\s*'\/create'/);
    expect(src).toMatch(/title:\s*'Create'/);
    expect(src).toMatch(/title:\s*'Theme'/);
  });

  test('PM skill records Headless APIs rail as gone and Theme as main rail', () => {
    const skill = fs.readFileSync(
      path.join(__dirname, '../.cursor/skills/pm-ui-review/SKILL.md'),
      'utf8',
    );
    expect(skill).toMatch(/Headless APIs rail is gone/);
    expect(skill).toMatch(/Theme is a main rail/);
    expect(skill).toMatch(/Create \(`\/create`\) generates a page as named sections/);
  });
});
