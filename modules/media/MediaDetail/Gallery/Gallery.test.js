const fs = require('fs');
const path = require('path');

const gallerySrc = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
const addSrc = fs.readFileSync(path.join(__dirname, 'AddImage.js'), 'utf8');
const editSrc = fs.readFileSync(path.join(__dirname, 'SidebarDrawer.js'), 'utf8');
const thumbSrc = fs.readFileSync(
  path.join(__dirname, '../../MediaThumb.js'),
  'utf8',
);
const pickerSrc = fs.readFileSync(
  path.join(__dirname, '../../GalleryPickerModal.js'),
  'utf8',
);
const sidebarSrc = fs.readFileSync(
  path.join(__dirname, '../../MediaSideBar/index.js'),
  'utf8',
);
const mediaSrc = fs.readFileSync(path.join(__dirname, '../../index.js'), 'utf8');
const detailSrc = fs.readFileSync(path.join(__dirname, '../index.js'), 'utf8');
const actionsSrc = fs.readFileSync(
  path.join(__dirname, '../../../../redux/actions/Media.js'),
  'utf8',
);

describe('Studio Media Gallery', () => {
  test('sidebar lists Gallery and hides Media Constants', () => {
    expect(sidebarSrc).toMatch(/name:\s*'Media Gallery'/);
    expect(sidebarSrc).toMatch(/alias:\s*'gallery'/);
    expect(sidebarSrc).not.toMatch(/Media Constants/);
    expect(sidebarSrc).not.toMatch(/alias:\s*'constants'/);
  });

  test('/media opens Gallery and leftover routes redirect', () => {
    expect(mediaSrc).toMatch(/all\?\.\[0\] \|\| 'gallery'/);
    expect(mediaSrc).toMatch(/description=\{intro\.description\}/);
    expect(mediaSrc).not.toMatch(/MediaList/);
    expect(mediaSrc).not.toMatch(/'guide'/);
    expect(detailSrc).toMatch(/constants:\s*'gallery'/);
    expect(detailSrc).toMatch(/basic:\s*'gallery'/);
    expect(detailSrc).toMatch(/router\.replace\('\/media\/gallery'\)/);
  });

  test('search icon and Enter both filter the list', () => {
    expect(gallerySrc).toMatch(/const runSearch/);
    expect(gallerySrc).toMatch(/event\.key === 'Enter'/);
    expect(gallerySrc).toMatch(/aria-label='Search'/);
    expect(gallerySrc).toMatch(/onClick=\{runSearch\}/);
  });

  test('primary Upload is header-right and there is no add_circle FAB', () => {
    expect(gallerySrc).toMatch(/>\s*Upload\s*</);
    expect(gallerySrc).toMatch(/justifyContent:\s*['"]space-between['"]/);
    expect(gallerySrc).not.toMatch(/add_circle/);
  });

  test('uses Sling orange and one loader without a 0 images flash', () => {
    expect(gallerySrc).toMatch(/SLING_ORANGE|#ff9800/);
    expect(gallerySrc).toMatch(/CircularProgress/);
    expect(gallerySrc).toMatch(/loading \?/);
    expect(gallerySrc).not.toMatch(/fontSize:\s*12/);
  });

  test('delete is always visible and confirms in a modal', () => {
    expect(gallerySrc).toMatch(/aria-label='Delete image'/);
    expect(gallerySrc).toMatch(/Delete this image\?/);
    expect(gallerySrc).toMatch(/classes\.actions[\s\S]*Delete image/);
  });

  test('edit save updates and copy URL stays; Image Key is gone', () => {
    expect(editSrc).toMatch(/updateImage/);
    expect(editSrc).toMatch(/Copy URL/);
    expect(editSrc).toMatch(/added_on/);
    expect(editSrc).toMatch(/updated_on/);
    expect(editSrc).not.toMatch(/Image Key/);
    expect(editSrc).not.toMatch(/addImage/);
    expect(addSrc).not.toMatch(/Image Key/);
    expect(addSrc).not.toMatch(/imgKey/);
  });

  test('broken or missing files show a No image placeholder, not a broken icon', () => {
    expect(thumbSrc).toMatch(/onError/);
    expect(thumbSrc).toMatch(/No image/);
    expect(thumbSrc).toMatch(/!url \|\| failed/);
    expect(gallerySrc).toMatch(/MediaThumb/);
    expect(gallerySrc).toMatch(/Copy URL/);
    expect(gallerySrc).toMatch(/>\s*Edit\s*</);
    expect(gallerySrc).toMatch(/aria-label='Delete image'/);
    expect(editSrc).toMatch(/MediaThumb/);
    expect(pickerSrc).toMatch(/MediaThumb/);
    expect(gallerySrc).not.toMatch(/<img/);
    expect(editSrc).not.toMatch(/<img/);
    expect(pickerSrc).not.toMatch(/<img/);
  });

  test('redux hits real update and delete routes and drops the Constants mock', () => {
    expect(actionsSrc).toMatch(/v1\/media\/updateImage/);
    expect(actionsSrc).toMatch(/Api\.post\(`\$\{SERVICE_URL\}v1\/media\/updateImage`/);
    expect(actionsSrc).toMatch(/Api\.delete\(`\$\{SERVICE_URL\}v1\/media\/deleteImage\/\$\{/);
    expect(actionsSrc).toMatch(/v1\/media\/saveImage/);
    expect(actionsSrc).toMatch(/v1\/media\/uploadImage/);
    expect(actionsSrc).not.toMatch(/\/api\/updateMediaConstant/);
  });
});
