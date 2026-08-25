const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
const tileSrc = fs.readFileSync(
  path.join(__dirname, 'TemplateTilePreview.js'),
  'utf8',
);
const previewUrlSrc = fs.readFileSync(
  path.join(__dirname, '../previewUrl.js'),
  'utf8',
);
const pagesIndexSrc = fs.readFileSync(
  path.join(__dirname, '../index.js'),
  'utf8',
);

describe('Pages list + Add template modal', () => {
  test('Add template is the human title and primary action on the right', () => {
    expect(src).toMatch(/Add template/);
    expect(src).not.toMatch(/Add Template Id/);
    expect(src).toMatch(/justifyContent:\s*['"]flex-end['"]/);
    expect(src).toMatch(/justifyContent:\s*['"]space-between['"]/);
    expect(pagesIndexSrc).toMatch(/title=\{!all \? 'Page templates' : getTitle\(\)\}/);
    expect(src).not.toMatch(/AppsHeader/);
  });

  test('uses Sling orange and cream, not MUI primary buttons', () => {
    expect(src).toMatch(/#ff9800/);
    expect(src).toMatch(/#fff8f0/);
    expect(src).toMatch(/primaryBtn:[\s\S]*fontSize:\s*14/);
    expect(src).toMatch(/outlineBtn:[\s\S]*fontSize:\s*14/);
    expect(src).toMatch(/actionBtn:[\s\S]*fontSize:\s*14/);
    expect(src).not.toMatch(/palette\.primary\.main/);
    expect(src).not.toMatch(/palette\.primary\.light/);
    expect(src).not.toMatch(/orange\[500\]/);
  });

  test('modal keeps unique id, title, and description on a two-column grid', () => {
    expect(src).toMatch(/htmlFor='templateId'/);
    expect(src).toMatch(/htmlFor='title'/);
    expect(src).toMatch(/htmlFor='description'/);
    expect(src).toMatch(/fields:[\s\S]*gridTemplateColumns:\s*['"]1fr 1fr['"]/);
    expect(src).toMatch(/fieldWide/);
    expect(src).toMatch(/addPageTemplate\(templateKey/);
    expect(src).toMatch(/>\s*Save\s*</);
    expect(src).toMatch(/>\s*Cancel\s*</);
  });

  test('search sits on the left and Edit and Delete stay visible', () => {
    expect(src).toMatch(/placeholder='Search templates'/);
    expect(src).toMatch(/toolbarLeft/);
    expect(src).toMatch(/aria-label='Edit'/);
    expect(src).toMatch(/aria-label='Delete'/);
    expect(src).toMatch(/variant='text'/);
    expect(src).not.toMatch(/>\s*Configure\s*</);
    expect(src).not.toMatch(/onMouseOver/);
    expect(src).not.toMatch(/showDelete/);
    expect(src).not.toMatch(/Export/);
  });

  test('shows one orange loader and an empty state, not an empty table while loading', () => {
    expect(src).toMatch(/loading \?/);
    expect(src).toMatch(/CircularProgress/);
    expect(src).toMatch(/No page templates yet/);
    expect(src).toMatch(/No templates match this search/);
    expect(src).toMatch(/Templates \{visibleKeys\.length\}/);
    expect(src).not.toMatch(/Loading templates/);
  });

  test('tiles show a real storefront preview, with the default image until it loads', () => {
    expect(src).toMatch(/LivePreviewGate/);
    expect(src).toMatch(/TemplateTilePreview/);
    expect(src).toMatch(/buildPreviewUrl\(route, clientUrl\)/);
    expect(src).toMatch(/Assign a route to see this page on the storefront/);
    expect(src).toMatch(/getRoutesList\(\{size: 100, quiet: true\}\)/);
    expect(src).toMatch(/repeat\(3, minmax\(0, 1fr\)\)/);
    expect(src).not.toMatch(/auto-fill/);
    expect(src).not.toMatch(/preview_image/);
    expect(src).not.toMatch(/getPreviewUrlsCount/);
    expect(tileSrc).toMatch(/PreviewIframe/);
    expect(tileSrc).toMatch(/pagelayout_default/);
    expect(tileSrc).toMatch(/silent/);
    expect(tileSrc).toMatch(/IntersectionObserver/);
    expect(previewUrlSrc).toMatch(/sample_string \|\| route\.url_string/);
    expect(previewUrlSrc).toMatch(/if \(!route \|\| !clientUrl\)/);
  });
});
