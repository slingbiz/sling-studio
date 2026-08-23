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
});
