const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
const modalSrc = fs.readFileSync(path.join(__dirname, 'Modal/index.js'), 'utf8');

describe('Page template Preview', () => {
  test('lists real workspace routes only, not dummy urls', () => {
    expect(src).not.toMatch(/booking\.com/);
    expect(src).not.toMatch(/demo\.sling\.biz/);
    expect(src).not.toMatch(/urlList/);
    expect(src).toMatch(/page_template === pageKey/);
    expect(src).toMatch(/This template has no routes yet/);
  });

  test('search sits on the left and Preview is the signed-off primary on the right', () => {
    expect(src).toMatch(/justifyContent:\s*['"]space-between['"]/);
    expect(src).toMatch(/placeholder='Search urls'/);
    expect(src).toMatch(/SLING_ORANGE|#ff9800/);
    expect(src).toMatch(/SLING_CREAM|#fff8f0/);
    expect(src).toMatch(/primaryBtn:[\s\S]*fontSize:\s*14/);
    expect(src).toMatch(/primaryBtn:[\s\S]*textTransform:\s*['"]none['"]/);
    expect(src).not.toMatch(/color=['"]primary['"]/);
  });

  test('preview modal close uses ink-bar ghost chrome', () => {
    expect(modalSrc).toMatch(/#163a5f/);
    expect(modalSrc).toMatch(/closeBtn:[\s\S]*fontSize:\s*14/);
    expect(modalSrc).toMatch(/textTransform:\s*['"]none['"]/);
    expect(modalSrc).toMatch(/>\s*Close\s*</);
    expect(modalSrc).not.toMatch(/#0288d1/);
    expect(modalSrc).not.toMatch(/color=['"]inherit['"]/);
  });

  test('urlItemSelected includes #ff9800', () => {
    expect(src).toMatch(/urlItemSelected:[\s\S]*#ff9800/);
    expect(src).toMatch(/urlItem:[\s\S]*1px solid #eee/);
    expect(src).toMatch(/urlTextSelected:[\s\S]*fontSize:\s*16/);
    expect(src).toMatch(/urlTextSelected:[\s\S]*fontWeight:\s*600/);
    expect(src).toMatch(/CheckCircleIcon/);
    expect(src).toMatch(/selectedCheck:[\s\S]*#ff9800/);
  });
});
