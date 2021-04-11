import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import {
  FooterType,
  HeaderType,
  LayoutType,
  NavStyle,
  RouteTransition,
  ThemeMode,
  ThemeStyle,
  ThemeStyleRadius,
} from '../../../shared/constants/AppEnums';

const breakpoints = createBreakpoints({});
const cardRadius = ThemeStyleRadius.STANDARD;
const defaultConfig = {
  theme: {
    spacing: 4,
    direction: 'ltr', //ltr, rtl
    palette: {
      type: ThemeMode.LIGHT,
      background: {
        paper: '#FFFFFF',
        default: '#F4F7FE',
      },
      primary: {
        main: '#0A8FDC',
        contrastText: '#fff',
      },
      secondary: {
        main: '#F04F47',
      },
      sidebar: {
        bgColor: '#313541',
        textColor: '#808183',
      },
      gray: {
        50: '#fafafa',
        100: '#f7fafc',
        200: '#edf2f7',
        300: '#E0E0E0',
        400: '#c5c6cb',
        500: '#A8A8A8',
        600: '#666666',
        700: '#4a5568',
        800: '#201e21',
        900: '#1a202c',
        A100: '#d5d5d5',
        A200: '#aaaaaa',
        A400: '#303030',
        A700: '#616161',
      },
      text: {
        primary: '#495057',
        secondary: '#74788d',
        disabled: '#909098',
        hint: '#aeafb8',
        white: '#fff',
      },
    },
    status: {
      danger: 'orange',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    typography: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
    },
    overrides: {
      MuiTypography: {
        h1: {
          fontSize: 22,
        },
        h2: {
          fontSize: 20,
        },
        h3: {
          fontSize: 18,
        },
        h4: {
          fontSize: 16,
        },
        h5: {
          fontSize: 14,
        },
        h6: {
          fontSize: 14,
        },
        subtitle1: {
          fontSize: 14,
        },
        subtitle2: {
          fontSize: 16,
        },
        body1: {
          fontSize: 14,
        },
        body2: {
          fontSize: 12,
        },
      },
      MuiToggleButton: {
        root: {
          borderRadius: cardRadius,
        },
      },
      MuiCardLg: {
        root: {
          borderRadius:
            cardRadius === ThemeStyleRadius.STANDARD
              ? ThemeStyleRadius.STANDARD
              : ThemeStyleRadius.MODERN + 20,
        },
      },
      MuiCard: {
        root: {
          borderRadius: cardRadius,
          boxShadow: '0px 5px 6px rgba(0, 0, 0, 0.04)',
          '& .MuiCardContent-root:last-child': {
            paddingBottom: 16,
          },
        },
      },
      MuiButton: {
        root: {
          borderRadius: cardRadius,
          boxShadow: '0px 5px 6px rgba(0, 0, 0, 0.04)',
          [breakpoints.down('md')]: {
            paddingTop: '8px !important',
            paddingBottom: '8px !important',
          },
        },
      },
    },
  },
  themeStyle: ThemeStyle.STANDARD,
  themeMode: ThemeMode.SEMI_DARK,
  navStyle: NavStyle.STANDARD,
  layoutType: LayoutType.FULL_WIDTH,
  footerType: FooterType.FLUID,
  headerType: HeaderType.DARK,
  rtAnim: RouteTransition.NONE,
  footer: false,
  locale: {
    languageId: 'english',
    locale: 'en',
    name: 'English',
    icon: 'us',
  },
  rtlLocale: ['ar'],
};
export default defaultConfig;
