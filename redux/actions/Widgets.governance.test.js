const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'Widgets.js'), 'utf8');

describe('AI widget save cannot skip review', () => {
  test('generate and save always persist AI widgets as draft', () => {
    expect(src).toMatch(/source:\s*'ai_generated'/);
    expect(src).toMatch(/status:\s*'draft'/);
    expect(src).not.toMatch(/status:\s*'published'/);
  });

  test('publish is a dedicated API call, not a local status flip', () => {
    expect(src).toMatch(/\$\{SERVICE_URL\}v1\/widgets\/\$\{widgetId\}\/publish/);
    expect(src).toMatch(/\$\{SERVICE_URL\}v1\/widgets\/\$\{widgetId\}\/submit-for-review/);
  });

  test('saveGeneratedWidget checks code policy before POST', () => {
    expect(src).toMatch(/checkCodePolicy/);
    const saveFn = src.slice(src.indexOf('export const saveGeneratedWidget'), src.indexOf('export const submitForReview'));
    expect(saveFn).toMatch(/checkCodePolicy/);
    expect(saveFn).toMatch(/policy\.allowed|!policy\.allowed/);
  });
});
