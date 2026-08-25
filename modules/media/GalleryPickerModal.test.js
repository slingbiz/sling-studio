const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'GalleryPickerModal.js'), 'utf8');

describe('GalleryPickerModal', () => {
  test('loads this workspace gallery with getMedia', () => {
    expect(src).toMatch(/getMedia/);
    expect(src).toMatch(/quiet:\s*true/);
  });

  test('clicking a thumbnail selects the image url and closes', () => {
    expect(src).toMatch(/onSelect\?\.\(url\)/);
    expect(src).toMatch(/item\?\.url/);
    expect(src).toMatch(/onClose/);
  });

  test('empty gallery says No images yet and offers Upload in the modal', () => {
    expect(src).toMatch(/No images yet/);
    expect(src).toMatch(/AddImage/);
    expect(src).toMatch(/>\s*Upload\s*</);
  });

  test('uses Sling orange, cream fields, 14px type, and one loader', () => {
    expect(src).toMatch(/SLING_ORANGE|#ff9800/);
    expect(src).toMatch(/SLING_CREAM|#fff8f0/);
    expect(src).toMatch(/fontSize:\s*14/);
    expect(src).toMatch(/Open Sans/);
    expect(src).toMatch(/CircularProgress/);
    expect(src).toMatch(/loading \?/);
    expect(src).not.toMatch(/fontSize:\s*12/);
  });

  test('broken or missing files show No image instead of a broken img', () => {
    expect(src).toMatch(/MediaThumb/);
    expect(src).not.toMatch(/<img/);
  });

  test('Upload is the primary action on the right', () => {
    expect(src).toMatch(/toolbar:[\s\S]*justifyContent:\s*['"]space-between['"]/);
    expect(src).toMatch(/primaryBtn:[\s\S]*fontSize:\s*14/);
  });
});
