const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'TemplateProps.js'), 'utf8');
const settings = fs.readFileSync(
  path.join(__dirname, 'LayoutSettings.js'),
  'utf8',
);

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
    expect(src).toMatch(/handleValueChange\(pickerKey, url\)/);
    expect(src).not.toMatch(/getMediaConstants/);
  });
});

describe('TemplateProps inspector', () => {
  test('labels Source and Value on always-open cards', () => {
    expect(src).toMatch(/>\s*Source\s*</);
    expect(src).toMatch(/>\s*Value\s*</);
    expect(src).toMatch(/Response derived/);
    expect(src).toMatch(/Static derived/);
    expect(src).not.toMatch(/AccordionSummary/);
    expect(src).not.toMatch(/CheckCircleIcon/);
    expect(src).not.toMatch(/CancelIcon/);
  });

  test('Add prop modal has name, data type, and default, then updateWidget', () => {
    expect(src).toMatch(/>\s*Add prop\s*</);
    expect(src).toMatch(/Prop name/);
    expect(src).toMatch(/Data type/);
    expect(src).toMatch(/Default value/);
    expect(src).toMatch(/label: 'String'/);
    expect(src).toMatch(/label: 'Number'/);
    expect(src).toMatch(/label: 'Image'/);
    expect(src).toMatch(/This widget's code must read the new prop/);
    expect(src).toMatch(/updateWidget/);
    expect(src).toMatch(/selectedWidget\?._id/);
    expect(src).toMatch(/propType: 'static'/);
    expect(src).not.toMatch(/Add New Prop/);
  });

  test('empty state keeps Add and does not send people to Widgets as the only CTA', () => {
    expect(src).toMatch(/This widget has no props yet/);
    expect(src).toMatch(/>\s*Add prop\s*</);
    expect(src).not.toMatch(/Add props for this widget in Widgets/);
  });

  test('rejects empty and duplicate names', () => {
    expect(src).toMatch(/Enter a prop name/);
    expect(src).toMatch(/already exists/);
  });

  test('writes values as they type into cellProps', () => {
    expect(src).toMatch(/cellProps\[propKey\] = next/);
    expect(src).toMatch(/cellProps\[name\] = instance/);
  });
});

describe('LayoutSettings passes the selected widget', () => {
  test('finds selectedWidget by key and passes it into TemplateProps', () => {
    expect(settings).toMatch(/w\.key === key/);
    expect(settings).toMatch(/selectedWidget=\{selectedWidget\}/);
  });
});
