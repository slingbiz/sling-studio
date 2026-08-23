import defaultConfig from '../../@sling/utility/ContextProvider/defaultConfig';

export function resolveWidgetTheme(tenantTheme, fallbackTheme = defaultConfig.theme) {
  if (tenantTheme && tenantTheme.palette && tenantTheme.palette.primary && tenantTheme.palette.primary.main) {
    return tenantTheme;
  }
  return fallbackTheme;
}

export function buildWidgetGeneratePayload(prompt, tenantTheme, fallbackTheme) {
  return {
    prompt,
    themeConfig: resolveWidgetTheme(tenantTheme, fallbackTheme),
  };
}
