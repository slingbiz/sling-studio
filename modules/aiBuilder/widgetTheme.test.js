import {resolveWidgetTheme, buildWidgetGeneratePayload} from './widgetTheme';

const tenantTheme = {
  palette: {
    primary: {main: '#112233', contrastText: '#fff'},
    secondary: {main: '#445566'},
  },
};

describe('resolveWidgetTheme', () => {
  test('uses the tenant theme when present, not hardcoded #ff9800', () => {
    const resolved = resolveWidgetTheme(tenantTheme);
    expect(resolved.palette.primary.main).toBe('#112233');
    expect(JSON.stringify(resolved)).not.toContain('#ff9800');
  });

  test('falls back to the provided default theme when tenant theme is missing', () => {
    const fallback = {palette: {primary: {main: '#0A8FDC'}}};
    expect(resolveWidgetTheme(null, fallback).palette.primary.main).toBe('#0A8FDC');
  });
});

describe('buildWidgetGeneratePayload', () => {
  test('AI generate request includes tenant theme as themeConfig', () => {
    const payload = buildWidgetGeneratePayload('Login form with email and password', tenantTheme);
    expect(payload.themeConfig.palette.primary.main).toBe('#112233');
    expect(JSON.stringify(payload)).not.toContain('#ff9800');
  });
});
