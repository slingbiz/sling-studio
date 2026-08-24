const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');

describe('WidgetReviewQueue cannot skip review', () => {
  test('Publish is only offered for approved widgets', () => {
    expect(src).toMatch(/status === 'approved'/);
    expect(src).toMatch(/handlePublish/);
    const publishBlock = src.slice(src.indexOf("status === 'approved'"), src.indexOf("status === 'draft'"));
    expect(publishBlock).toMatch(/handlePublish/);
    expect(publishBlock).not.toMatch(/handleSubmitForReview/);
  });

  test('draft can submit for review but cannot publish', () => {
    const draftBlock = src.slice(src.indexOf("status === 'draft'"), src.indexOf('</Box>', src.indexOf("status === 'draft'")));
    expect(draftBlock).toMatch(/handleSubmitForReview/);
    expect(draftBlock).not.toMatch(/handlePublish/);
  });

  test('pending review can approve or reject, not publish', () => {
    const pendingBlock = src.slice(src.indexOf("status === 'pending_review'"), src.indexOf("status === 'approved'"));
    expect(pendingBlock).toMatch(/handleApprove/);
    expect(pendingBlock).toMatch(/handleRejectOpen/);
    expect(pendingBlock).not.toMatch(/handlePublish/);
  });

  test('always shows a live preview when the widget has code', () => {
    expect(src).toMatch(/SandboxedPreview/);
    expect(src).toMatch(/themeOverrides=\{tenantTheme\}/);
    expect(src).toMatch(/style=\{\{height: 360\}\}/);
    expect(src).not.toMatch(/Hide Preview/);
    expect(src).not.toMatch(/Show Preview/);
    expect(src).toMatch(/No live preview/);
  });

  test('tab changes use one list spinner, not the page overlay too', () => {
    expect(src).toMatch(/quiet:\s*true/);
    expect(src).not.toMatch(/common\.loading/);
    expect(src).toMatch(/CircularProgress/);
  });

  test('uses Sling orange for tabs and Approve, not default MUI blue', () => {
    expect(src).toMatch(/SLING_ORANGE/);
    expect(src).toMatch(/primaryBtn/);
    expect(src).not.toMatch(/indicatorColor='primary'/);
    expect(src).not.toMatch(/color='primary'/);
  });
});
