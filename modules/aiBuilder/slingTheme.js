// Brand tokens from sling.biz / slingEarly — orange, not default MUI blue.
export const SLING_ORANGE = '#ff9800';
export const SLING_ORANGE_SOFT = '#ff9387';
export const SLING_CREAM = '#fff8f0';
export const SLING_INK = '#212121';

export const SLING_WIDGET_THEME = {
  palette: {
    primary: {
      main: SLING_ORANGE,
      contrastText: '#fff',
    },
    secondary: {
      main: SLING_ORANGE_SOFT,
      contrastText: '#fff',
    },
    background: {
      default: SLING_CREAM,
      paper: '#FFFFFF',
    },
    text: {
      primary: SLING_INK,
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: 'Open Sans, system-ui, sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 6,
  },
};

export const SLING_TENANT_THEME_PRESET = {
  palette: {
    primary: {
      main: SLING_ORANGE,
      contrastText: '#fff',
    },
    secondary: {
      main: SLING_ORANGE_SOFT,
      contrastText: '#fff',
    },
    background: {
      default: SLING_CREAM,
      paper: '#FFFFFF',
    },
    text: {
      primary: SLING_INK,
      secondary: '#666666',
    },
    sidebar: {
      bgColor: SLING_INK,
      textColor: '#b0b0b0',
    },
    gray: {
      500: '#A8A8A8',
    },
  },
  typography: {
    fontFamily: 'Open Sans, system-ui, sans-serif',
  },
  divider: 'rgba(0, 0, 0, 0.08)',
};
