const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');

describe('AiGenerateWidget tenant theme wiring', () => {
  test('does not pass hardcoded SLING_WIDGET_THEME into generate or preview', () => {
    expect(src).not.toMatch(/streamGenerate\([\s\S]*SLING_WIDGET_THEME/);
    expect(src).not.toMatch(/themeConfig:\s*SLING_WIDGET_THEME/);
    expect(src).not.toMatch(/generateWidget\([^)]*SLING_WIDGET_THEME/);
    expect(src).not.toMatch(/themeOverrides=\{SLING_WIDGET_THEME\}/);
  });

  test('uses resolveWidgetTheme so preview and generate share the tenant theme', () => {
    expect(src).toMatch(/resolveWidgetTheme/);
    expect(src).toMatch(/themeOverrides=\{/);
  });
});
