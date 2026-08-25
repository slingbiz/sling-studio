const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
const preview = fs.readFileSync(path.join(__dirname, 'SectionPreview.js'), 'utf8');
const contract = fs.readFileSync(path.join(__dirname, 'sectionContract.js'), 'utf8');
const stream = fs.readFileSync(path.join(__dirname, 'streamPageGenerate.js'), 'utf8');
const processed = fs.readFileSync(path.join(__dirname, 'ProcessedSetup.js'), 'utf8');
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
    expect(src).toMatch(/I want a landing page/);
    expect(src).toMatch(/>\s*Generate\s*</);
    expect(src).toMatch(/processing \? 'Processing…' : 'Process'/);
    expect(src).toMatch(/This page is broken into \$\{count\} widgets/);
    expect(src).not.toMatch(/Chip/);
    expect(src).not.toMatch(/—/);
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
});
