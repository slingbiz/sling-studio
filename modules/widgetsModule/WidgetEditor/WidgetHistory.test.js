const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'WidgetHistory.js'), 'utf8');

describe('Widget History', () => {
  test('loads versions for this widget and Restore sits on the right', () => {
    expect(src).toMatch(/v1\/widgets\/\$\{widgetId\}\/versions/);
    expect(src).toMatch(/\/revert/);
    expect(src).toMatch(/justifyContent:\s*['"]flex-end['"]/);
    expect(src).toMatch(/>\s*Restore\s*</);
    expect(src).toMatch(/restoreBtn:[\s\S]*visibility:\s*['"]visible['"]/);
    expect(src).not.toMatch(/display:\s*['"]none['"]/);
  });

  test('confirm restore warns that the live site does not change until publish', () => {
    expect(src).toMatch(/Restore this version\?/);
    expect(src).toMatch(/live site does not/);
    expect(src).toMatch(/Restored as a draft/);
    expect(src).toMatch(/canRestore/);
  });

  test('clicking a version opens read-only Monaco in sling cream chrome', () => {
    expect(src).toMatch(/@monaco-editor\/react/);
    expect(src).toMatch(/readOnly:\s*true/);
    expect(src).toMatch(/sling-cream|#fff8f0/);
    expect(src).toMatch(/SLING_ORANGE|#ff9800/);
    expect(src).toMatch(/fontSize:\s*14/);
    expect(src).toMatch(/name:[\s\S]*fontSize:\s*16/);
    expect(src).not.toMatch(/fontSize:\s*12/);
    expect(src).not.toMatch(/theme\.palette\.primary\.main/);
    expect(src).not.toMatch(/Export CSV/);
  });

  test('one orange loader and human errors', () => {
    expect(src).toMatch(/CircularProgress/);
    expect(src).toMatch(/loading \?/);
    expect(src).toMatch(/Only Owners, Admins, and Publishers/);
    expect(src).toMatch(/Could not load history/);
  });
});
