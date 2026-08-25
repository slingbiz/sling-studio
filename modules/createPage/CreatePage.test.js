const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
const preview = fs.readFileSync(path.join(__dirname, 'SectionPreview.js'), 'utf8');
const contract = fs.readFileSync(path.join(__dirname, 'sectionContract.js'), 'utf8');
const actions = fs.readFileSync(
  path.join(__dirname, '../../redux/actions/CreatePage.js'),
  'utf8',
);

describe('Create page builder', () => {
  test('has a heading, a big prompt, starters, and Process', () => {
    expect(src).toMatch(/createCopy\.title/);
    expect(src).toMatch(/I want a landing page/);
    expect(src).toMatch(/>\s*Generate\s*</);
    expect(src).toMatch(/processing \? 'Processing…' : 'Process'/);
    expect(src).toMatch(/This page will be \{count\} widget/);
  });

  test('hover boxes are Studio chrome, not generated CSS', () => {
    expect(preview).toMatch(/data-sling-section/);
    expect(preview).toMatch(/&:hover, &:focus-within/);
    expect(preview).toMatch(/section\.label/);
    expect(contract).not.toMatch(/transform:\s*['"]translateY/);
  });

  test('Process saves drafts and never publishes', () => {
    expect(actions).toMatch(/\/page\/generate/);
    expect(actions).toMatch(/saveGeneratedWidget/);
    expect(actions).toMatch(/quiet:\s*true/);
    expect(actions).toMatch(/isNewRecord:\s*true/);
    expect(actions).toMatch(/SAVE_ROUTE/);
    expect(actions).not.toMatch(/\/publish/);
    expect(actions).not.toMatch(/status:\s*'published'/);
  });
});
