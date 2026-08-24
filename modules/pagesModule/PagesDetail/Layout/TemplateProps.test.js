const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'TemplateProps.js'), 'utf8');

describe('TemplateProps gallery pick', () => {
  test('no longer tells people to use Image Constants', () => {
    expect(src).not.toMatch(/Image Constants/);
    expect(src).not.toMatch(/Array of Image/);
    expect(src).toMatch(/workspace/);
    expect(src).toMatch(/URL is stored on the prop/);
  });

  test('shows a always-visible Gallery button for image props', () => {
    expect(src).toMatch(/isImageProp/);
    expect(src).toMatch(/>\s*Gallery\s*</);
    expect(src).toMatch(/galleryBtn:[\s\S]*visibility:\s*['"]visible['"]/);
    expect(src).toMatch(/type === 'media'|type:\s*propObj\.type/);
  });

  test('picking writes a single image url string onto the prop value', () => {
    expect(src).toMatch(/GalleryPickerModal/);
    expect(src).toMatch(/handleChange\(\{propKey: pickerKey, event: \{target: \{value: url\}\}\}\)/);
    expect(src).not.toMatch(/getMediaConstants/);
  });
});
