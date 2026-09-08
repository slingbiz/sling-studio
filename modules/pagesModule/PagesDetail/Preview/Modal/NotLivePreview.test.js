const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'NotLivePreview.js'), 'utf8');

describe('unpublished Routes preview empty state', () => {
  test('tells people the page is not live and where to publish', () => {
    expect(src).toMatch(/This page is not live yet/);
    expect(src).toMatch(/Publish the widgets to see it on the site/);
    expect(src).toMatch(/\/create/);
    expect(src).toMatch(/\/widgets\/widgets-integration\?status=draft/);
    expect(src).toMatch(/Go to Create/);
    expect(src).toMatch(/Open drafts/);
  });

  test('uses Sling gold chrome with the primary action on the right', () => {
    expect(src).toMatch(/#ff9800/);
    expect(src).toMatch(/#fff8f0/);
    expect(src).toMatch(/#163a5f/);
    expect(src).toMatch(/Open Sans/);
    expect(src).toMatch(/fontSize:\s*14/);
    expect(src).toMatch(/justifyContent:\s*['"]flex-end['"]/);
    expect(src).toMatch(/Go to Create/);
    const actions = src.slice(src.indexOf('actions:'));
    expect(actions.indexOf('Open drafts')).toBeLessThan(actions.indexOf('Go to Create'));
  });
});
