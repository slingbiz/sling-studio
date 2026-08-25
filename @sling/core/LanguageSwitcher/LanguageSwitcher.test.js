const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');

describe('Header View site', () => {
  test('opens the live site URL, not Frontend or shop', () => {
    expect(src).toMatch(/>\s*View site\s*</);
    expect(src).toMatch(/aria-label='View site'/);
    expect(src).toMatch(/account\?\.clientUrl/);
    expect(src).toMatch(/target:\s*['"]_blank['"]/);
    expect(src).not.toMatch(/>\s*Frontend\s*</);
    expect(src).not.toMatch(/>\s*View shop\s*</);
  });

  test('uses signed-off Sling orange, not MUI uppercase', () => {
    expect(src).toMatch(/#ff9800/);
    expect(src).toMatch(/textTransform:\s*['"]none['"]/);
    expect(src).toMatch(/fontSize:\s*14/);
    expect(src).not.toMatch(/orange\[500\]/);
    expect(src).not.toMatch(/textTransform:\s*['"]uppercase['"]/);
  });

  test('does not send people to Studio when the site URL is missing', () => {
    expect(src).toMatch(/disabled:\s*true/);
    expect(src).toMatch(/Settings → Company/);
    expect(src).not.toMatch(/clientUrl \|\| '\/'/);
  });
});
