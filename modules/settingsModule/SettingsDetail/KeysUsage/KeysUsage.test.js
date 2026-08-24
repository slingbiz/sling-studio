const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
const copySrc = fs.readFileSync(path.join(__dirname, 'CopyButton.js'), 'utf8');

describe('Settings → Keys & Usage', () => {
  test('keeps API key, client id, copy, and the setup guide', () => {
    expect(src).toMatch(/account\?\.apiKey/);
    expect(src).toMatch(/account\?\.user/);
    expect(src).toMatch(/Copy API key/);
    expect(src).toMatch(/Copy client id/);
    expect(src).toMatch(/GUIDE_URL/);
    expect(src).toMatch(/Sling Key Usage and Frontend Setup/);
  });

  test('Copy is the primary action on the right in Sling orange', () => {
    expect(src).toMatch(/justifyContent:\s*['"]flex-end['"]/);
    expect(src).toMatch(/SLING_ORANGE|#ff9800/);
    expect(copySrc).toMatch(/SLING_ORANGE|#ff9800/);
    expect(copySrc).toMatch(/copyBtn:[\s\S]*fontSize:\s*14/);
    expect(copySrc).toMatch(/['"]Copy['"]/);
    expect(copySrc).not.toMatch(/color=['"]primary['"]/);
  });

  test('uses cream fields, not default MUI blue', () => {
    expect(src).toMatch(/SLING_CREAM|#fff8f0/);
    expect(src).toMatch(/background:\s*SLING_CREAM/);
    expect(src).not.toMatch(/rgb\(232,\s*241,\s*250\)/);
    expect(src).not.toMatch(/palette\.primary/);
  });

  test('uses Sling type scale, not Linear 12px', () => {
    expect(src).toMatch(/name:[\s\S]*fontSize:\s*16/);
    expect(src).toMatch(/hint:[\s\S]*fontSize:\s*14/);
    expect(src).toMatch(/field:[\s\S]*fontSize:\s*14/);
    expect(src).not.toMatch(/fontSize:\s*12/);
    expect(src).not.toMatch(/fontSize:\s*13/);
    expect(copySrc).not.toMatch(/fontSize:\s*12/);
  });
});
