import {resolveWidgetTheme, buildWidgetGeneratePayload, fillPaletteShades} from './widgetTheme';

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
    expect(resolved.palette.primary[400]).toBe('#112233');
    expect(resolved.palette.grey[400]).toBeTruthy();
    expect(JSON.stringify(resolved)).not.toContain('#ff9800');
  });

  test('fills missing palette shade indexes so makeStyles can read [400]', () => {
    const palette = fillPaletteShades({
      primary: {main: '#112233'},
    });
    expect(palette.primary[400]).toBe('#112233');
    expect(palette.grey[400]).toBe('#bdbdbd');
    expect(palette.common.white).toBe('#fff');
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
