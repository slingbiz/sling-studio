import {
  ThemeMode,
  ThemeStyle,
  ThemeStyleRadius,
} from '../../../shared/constants/AppEnums';
import {isBreakPointDown} from '../Utils';

export const ThemeSetting = {
  UPDATE_THEME: 'UPDATE_THEME',
  SET_FOOTER: 'SET_FOOTER',
  SET_FOOTER_TYPE: 'SET_FOOTER_TYPE',
  UPDATE_THEME_MODE: 'UPDATE_THEME_MODE',
  UPDATE_HEADER_MODE: 'UPDATE_HEADER_MODE',
  UPDATE_THEME_STYLE: 'UPDATE_THEME_STYLE',
  UPDATE_LAYOUT_STYLE: 'UPDATE_LAYOUT_STYLE',
  SET_RTL: 'SET_RTL',
  CHANGE_LOCALE: 'CHANGE_LOCALE',
  CHANGE_NAV_STYLE: 'CHANGE_NAV_STYLE',
  CHANGE_RT_ANIM: 'CHANGE_RT_ANIM',
  UPDATE_PRIMARY_COLOR: 'UPDATE_PRIMARY_COLOR',
  UPDATE_SIDEBAR_COLOR: 'UPDATE_SIDEBAR_COLOR',
  UPDATE_SECONDARY_COLOR: 'UPDATE_SECONDARY_COLOR',
};

export function contextReducer(state, action) {
  switch (action.type) {
    case ThemeSetting.UPDATE_THEME: {
      return {
        ...state,
        theme: action.payload,
        primary: action.payload.palette.primary.main,
        secondary: action.payload.palette.secondary.main,
      };
    }
    case ThemeSetting.SET_FOOTER: {
      return {
        ...state,
        footer: action.payload,
      };
    }
    case ThemeSetting.SET_FOOTER_TYPE: {
      return {
        ...state,
        footerType: action.payload,
      };
    }
    case ThemeSetting.UPDATE_THEME_MODE: {
      let theme = state.theme;
      if (action.payload === ThemeMode.DARK) {
        theme.palette.type = ThemeMode.DARK;
        theme.palette.background = {
          paper: '#313541',
          default: '#393D4B',
        };
        theme.palette.text = {
          primary: 'rgba(255, 255, 255, 0.87)',
          secondary: 'rgba(255, 255, 255, 0.67)',
          disabled: 'rgba(255, 255, 255, 0.38)',
          hint: 'rgba(255, 255, 255, 0.38)',
        };
      } else {
        theme.palette.type = ThemeMode.LIGHT;
        theme.palette.background = {
          paper: '#FFFFFF',
          default: '#f3f4f6',
        };
        theme.palette.text = {
          primary: 'rgba(0, 0, 0, 0.87)',
          secondary: 'rgba(0, 0, 0, 0.67)',
          disabled: 'rgba(0, 0, 0, 0.38)',
          hint: 'rgba(0, 0, 0, 0.38)',
        };
      }
      return {
        ...state,
        theme,
        themeMode: action.payload,
      };
    }
    case ThemeSetting.UPDATE_HEADER_MODE: {
      return {
        ...state,
        headerMode: action.payload,
      };
    }
    case ThemeSetting.UPDATE_THEME_STYLE: {
      const theme = state.theme;

      if (action.payload === ThemeStyle.MODERN) {
        if (isBreakPointDown('md')) {
          theme.overrides.MuiCard.root.borderRadius = 20;
          theme.overrides.MuiToggleButton.root.borderRadius = 20;
        } else {
          theme.overrides.MuiCard.root.borderRadius = ThemeStyleRadius.MODERN;
          theme.overrides.MuiToggleButton.root.borderRadius =
            ThemeStyleRadius.MODERN;
        }
        theme.overrides.MuiButton.root.borderRadius = ThemeStyleRadius.MODERN;
        theme.overrides.MuiCardLg.root.borderRadius =
          ThemeStyleRadius.MODERN + 20;
      } else {
        theme.overrides.MuiCard.root.borderRadius = ThemeStyleRadius.STANDARD;
        theme.overrides.MuiToggleButton.root.borderRadius =
          ThemeStyleRadius.STANDARD;
        theme.overrides.MuiButton.root.borderRadius = ThemeStyleRadius.STANDARD;
        theme.overrides.MuiCardLg.root.borderRadius = ThemeStyleRadius.STANDARD;
      }

      return {
        ...state,
        theme,
        themeStyle: action.payload,
      };
    }
    case ThemeSetting.UPDATE_LAYOUT_STYLE: {
      return {
        ...state,
        layoutType: action.payload,
      };
    }
    case ThemeSetting.SET_RTL: {
      const theme = state.theme;
      if (action.payload) {
        theme.direction = 'rtl';
      } else {
        theme.direction = 'ltr';
      }
      return {
        ...state,
        theme,
        isRTL: action.payload,
      };
    }
    case ThemeSetting.CHANGE_LOCALE: {
      return {
        ...state,
        locale: action.payload,
      };
    }
    case ThemeSetting.CHANGE_NAV_STYLE: {
      return {
        ...state,
        navStyle: action.payload,
      };
    }
    case ThemeSetting.CHANGE_RT_ANIM: {
      return {
        ...state,
        rtAnim: action.payload,
      };
    }
    case ThemeSetting.UPDATE_PRIMARY_COLOR: {
      return {
        ...state,
        primary: action.payload,
      };
    }
    case ThemeSetting.UPDATE_SIDEBAR_COLOR: {
      return {
        ...state,
        sidebarColor: action.payload,
      };
    }
    case ThemeSetting.UPDATE_SECONDARY_COLOR: {
      return {
        ...state,
        secondary: action.payload,
      };
    }
    default:
      return state;
  }
}
