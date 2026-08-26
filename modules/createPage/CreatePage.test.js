const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
const preview = fs.readFileSync(path.join(__dirname, 'SectionPreview.js'), 'utf8');
const contract = fs.readFileSync(path.join(__dirname, 'sectionContract.js'), 'utf8');
const stream = fs.readFileSync(path.join(__dirname, 'streamPageGenerate.js'), 'utf8');
const processed = fs.readFileSync(path.join(__dirname, 'ProcessedSetup.js'), 'utf8');
const attemptsSrc = fs.readFileSync(path.join(__dirname, 'createAttempts.js'), 'utf8');
const actions = fs.readFileSync(
  path.join(__dirname, '../../redux/actions/CreatePage.js'),
  'utf8',
);

describe('Create page builder', () => {
  test('has a heading, a big prompt, starters, and Process', () => {
    expect(src).toMatch(/createCopy\.title/);
    expect(src).toMatch(/component='h1'/);
    expect(src).toMatch(/textAlign:\s*['"]center['"]/);
    expect(src).toMatch(/gridTemplateColumns:\s*['"]1fr 1fr['"]/);
    expect(src).toMatch(/placeholder='Describe this page'/);
    expect(src).not.toMatch(/I want a landing page/);
    expect(src).toMatch(/>\s*Generate\s*</);
    expect(src).toMatch(/processing \? 'Processing…' : 'Process'/);
    expect(src).toMatch(/This page is broken into \$\{count\} widgets/);
    expect(src).not.toMatch(/Chip/);
    expect(src).not.toMatch(/—/);
    expect(src).not.toMatch(/#ffd59a/);
    expect(src).not.toMatch(/#7a4a00/);
    expect(src).not.toMatch(/#ffe3b8/);
    expect(src).toMatch(/starterBtnSelected/);
    expect(src).toMatch(/#163a5f/);
    expect(contract).not.toMatch(/—/);
  });

  test('explains governed widgets and lets people follow up', () => {
    expect(contract).toMatch(/govern, give props, and publish/);
    expect(src).toMatch(/Ask to change this page/);
    expect(src).toMatch(/>\s*Improve\s*</);
    expect(src).toMatch(/Recent pages/);
    expect(stream).toMatch(/followUp/);
  });

  test('streams code live and paints sections as they arrive', () => {
    expect(src).toMatch(/streamPageFromPrompt/);
    expect(src).toMatch(/Streaming/);
    expect(src).toMatch(/chars received/);
    expect(src).toMatch(/The page appears here as each section finishes/);
    expect(stream).toMatch(/\/page\/generate\/stream/);
    expect(stream).toMatch(/code_token/);
    expect(stream).toMatch(/onSection/);
  });

  test('hover boxes are Studio chrome on one page, not inner-scrolling cards', () => {
    expect(preview).toMatch(/data-sling-section/);
    expect(preview).toMatch(/&:hover, &:focus-within/);
    expect(preview).toMatch(/ensureWidgetLabel/);
    expect(preview).toMatch(/boxShadow/);
    expect(preview).toMatch(/borderColor: SLING_ORANGE/);
    expect(preview).toMatch(/fitContent/);
    expect(preview).not.toMatch(/height:\s*280/);
    expect(src).toMatch(/classes\.canvas/);
    expect(contract).not.toMatch(/transform:\s*['"]translateY/);
  });

  test('Process saves drafts; Publish is a later dedicated call', () => {
    expect(actions).toMatch(/saveGeneratedWidget/);
    expect(actions).toMatch(/quiet:\s*true/);
    expect(actions).toMatch(/isNewRecord:\s*true/);
    expect(actions).toMatch(/SAVE_ROUTE/);
    expect(actions).toMatch(/publishGeneratedPage/);
    expect(actions).toMatch(/publishWidgetAction/);
    expect(processed).toMatch(/Publishing/);
    expect(processed).toMatch(/Page route/);
    expect(processed).toMatch(/Page widgets/);
    expect(processed).toMatch(/Page template/);
    expect(processed).toMatch(/Go to Routes/);
    const processFn = actions.slice(
      actions.indexOf('export const processGeneratedPage'),
      actions.indexOf('export const publishGeneratedPage'),
    );
    expect(processFn).not.toMatch(/\/publish/);
    expect(processFn).not.toMatch(/status:\s*'published'/);
  });

  test('keeps the processed page so people can come back after inspecting drafts', () => {
    expect(src).toMatch(/query:\s*\{\s*setup/);
    expect(src).toMatch(/findCreateAttempt/);
    expect(src).toMatch(/Back to setup/);
    expect(src).toMatch(/Open one to get back/);
    expect(processed).toMatch(/View generated page/);
    expect(processed).toMatch(/status:\s*'draft'/);
    expect(processed).toMatch(/\/routes\?q=/);
    expect(processed).toMatch(/come back here after you inspect/);
    expect(attemptsSrc).toMatch(/findCreateAttempt/);
    expect(attemptsSrc).toMatch(/stripCodes/);
  });

  test('setup widget tiles keep one line names and aligned Open buttons', () => {
    expect(processed).toMatch(/displayWidgetName/);
    expect(processed).toMatch(/textOverflow:\s*['"]ellipsis['"]/);
    expect(processed).toMatch(/whiteSpace:\s*['"]nowrap['"]/);
    expect(processed).toMatch(/marginTop:\s*['"]auto['"]/);
    expect(processed).toMatch(/<Tooltip/);
    expect(processed).not.toMatch(/ensureWidgetLabel/);
  });

  test('prompt field is a white Studio input with ink focus, not a cream AI box', () => {
    const field = src.slice(src.indexOf('field:'), src.indexOf('starters:'));
    expect(field).toMatch(/background:\s*['"]#fff['"]/);
    expect(field).toMatch(/borderColor:\s*['"]#163a5f['"]/);
    expect(field).not.toMatch(/SLING_CREAM/);
    expect(field).not.toMatch(/SLING_ORANGE/);
    expect(src).toMatch(/placeholder='Describe this page'/);
  });

  test('empty Create sits on cream with a white prompt card, not a blank white page', () => {
    const page = src.slice(src.indexOf('page:'), src.indexOf('emptyPage:'));
    const card = src.slice(src.indexOf('promptCard:'), src.indexOf('heading:'));
    expect(page).toMatch(/background:\s*SLING_CREAM/);
    expect(card).toMatch(/background:\s*['"]#fff['"]/);
    expect(card).toMatch(/boxShadow/);
    expect(src).toMatch(/classes\.promptCard/);
    expect(src).toMatch(/color:\s*STUDIO_INK/);
  });
});
