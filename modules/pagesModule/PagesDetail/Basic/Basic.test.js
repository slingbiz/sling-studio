const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');

describe('Page template Basic', () => {
  test('Save writes template meta and does not fake read-only mode', () => {
    expect(src).toMatch(/setLayoutConfig/);
    expect(src).toMatch(/>\s*Save\s*</);
    expect(src).not.toMatch(/read-only mode/);
    expect(src).not.toMatch(/SHOW_MESSAGE/);
    expect(src).not.toMatch(/Allow Bots/);
  });

  test('Save sits on the right with signed-off primary chrome', () => {
    expect(src).toMatch(/justifyContent:\s*['"]flex-end['"]/);
    expect(src).toMatch(/justifyContent:\s*['"]space-between['"]/);
    expect(src).toMatch(/SLING_ORANGE|#ff9800/);
    expect(src).toMatch(/primaryBtn:[\s\S]*fontSize:\s*14/);
    expect(src).toMatch(/primaryBtn:[\s\S]*textTransform:\s*['"]none['"]/);
    expect(src).toMatch(/#f57c00/);
  });

  test('uses two-column cream fields, 14px body, 16px titles', () => {
    expect(src).toMatch(/SLING_CREAM|#fff8f0/);
    expect(src).toMatch(/fields:[\s\S]*gridTemplateColumns:\s*['"]1fr 1fr['"]/);
    expect(src).toMatch(/sectionTitle:[\s\S]*fontSize:\s*16/);
    expect(src).toMatch(/fieldLabel:[\s\S]*fontSize:\s*14/);
    expect(src).toMatch(/Open Sans/);
    expect(src).toMatch(/htmlFor='pageKey'/);
    expect(src).toMatch(/htmlFor='title'/);
    expect(src).toMatch(/htmlFor='description'/);
    expect(src).toMatch(/disabled/);
  });

  test('shows one loader and human empty copy', () => {
    expect(src).toMatch(/loading \?/);
    expect(src).toMatch(/CircularProgress/);
    expect(src).toMatch(/This template could not be found/);
  });
});
