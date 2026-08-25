import defaultConfig from '../../@sling/utility/ContextProvider/defaultConfig';

const GREY_SHADES = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
  A100: '#d5d5d5',
  A200: '#aaaaaa',
  A400: '#303030',
  A700: '#616161',
};

function withShades(color, fallbackMain) {
  if (typeof color === 'string') {
    color = {main: color};
  }
  if (!color || typeof color !== 'object') {
    color = {main: fallbackMain};
  }
  const main = color.main || color[500] || fallbackMain;
  const next = {...color};
  if (!next.main) next.main = main;
  if (next[400] == null) next[400] = next.light || main;
  if (next[500] == null) next[500] = main;
  if (next[600] == null) next[600] = next.dark || main;
  if (next[300] == null) next[300] = next.light || main;
  return next;
}

export function fillPaletteShades(palette) {
  if (!palette || typeof palette !== 'object') return palette;
  palette.primary = withShades(palette.primary, '#ff9800');
  palette.secondary = withShades(palette.secondary, '#163a5f');
  palette.error = withShades(palette.error, '#d32f2f');
  const grey = {
    ...GREY_SHADES,
    ...(typeof palette.grey === 'object' && palette.grey ? palette.grey : {}),
    ...(typeof palette.gray === 'object' && palette.gray ? palette.gray : {}),
  };
  if (grey[400] == null) grey[400] = GREY_SHADES[400];
  palette.grey = grey;
  if (!palette.common || typeof palette.common !== 'object') {
    palette.common = {black: '#000', white: '#fff'};
  } else if (!palette.common.white) {
    palette.common = {...palette.common, white: '#fff', black: palette.common.black || '#000'};
  }
  return palette;
}

export function resolveWidgetTheme(tenantTheme, fallbackTheme = defaultConfig.theme) {
  const base =
    tenantTheme &&
    tenantTheme.palette &&
    tenantTheme.palette.primary &&
    tenantTheme.palette.primary.main
      ? tenantTheme
      : fallbackTheme;
  return {
    ...base,
    palette: fillPaletteShades({...(base?.palette || {})}),
  };
}

export function buildWidgetGeneratePayload(prompt, tenantTheme, fallbackTheme) {
  return {
    prompt,
    themeConfig: resolveWidgetTheme(tenantTheme, fallbackTheme),
  };
}
