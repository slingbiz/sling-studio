const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
const preview = fs.readFileSync(path.join(__dirname, 'SectionPreview.js'), 'utf8');
const contract = fs.readFileSync(path.join(__dirname, 'sectionContract.js'), 'utf8');
const stream = fs.readFileSync(path.join(__dirname, 'streamPageGenerate.js'), 'utf8');
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
    expect(src).toMatch(/This page will be \$\{count\} widget/);
    expect(src).not.toMatch(/Chip/);
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
    expect(preview).toMatch(/section\.label/);
    expect(preview).toMatch(/boxShadow/);
    expect(preview).toMatch(/borderColor: SLING_ORANGE/);
    expect(preview).toMatch(/fitContent/);
    expect(preview).not.toMatch(/height:\s*280/);
    expect(src).toMatch(/classes\.canvas/);
    expect(contract).not.toMatch(/transform:\s*['"]translateY/);
  });

  test('Process saves drafts and never publishes', () => {
    expect(actions).toMatch(/saveGeneratedWidget/);
    expect(actions).toMatch(/quiet:\s*true/);
    expect(actions).toMatch(/isNewRecord:\s*true/);
    expect(actions).toMatch(/SAVE_ROUTE/);
    expect(actions).not.toMatch(/\/publish/);
    expect(actions).not.toMatch(/status:\s*'published'/);
  });
});
