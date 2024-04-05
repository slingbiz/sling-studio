import {makeStyles} from '@material-ui/core/styles';
import {NavStyle} from '../../../shared/constants/AppEnums';

const getHeaderHeight = (navStyle, screenSize) => {
  if (
    navStyle === NavStyle.HOR_DARK_LAYOUT ||
    navStyle === NavStyle.HOR_LIGHT_NAV ||
    navStyle === NavStyle.H_DEFAULT
  )
    return screenSize >= 1280 ? 124 + 20 : 70 + 10; // 50 Header Height + 20/10 Padding Bottom
  if (navStyle === NavStyle.BIT_BUCKET) return 0; // 0 Header Height

  return screenSize >= 600 ? 70 : 60;
};

const useStyles = makeStyles((theme) => ({
  appsContainer: (props) => ({
    height: '100%',
    display: 'flex',
  }),
  appsSidebar: {
    // height: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '17rem',
    },
    [theme.breakpoints.up('xl')]: {
      width: '20rem',
    },
  },
  pagesSideBar: {
    height: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '14rem',
    },
    [theme.breakpoints.up('xl')]: {
      width: '15rem',
    },
  },
  appsMainContent: (props) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${props.fullView ? 0 : 13}rem)`,
      paddingLeft: props.fullView ? 0 : 40,
    },
    [theme.breakpoints.up('xl')]: {
      width: `calc(100% - ${props.fullView ? 0 : 20}rem)`,
    },
  }),
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuIcon: {
    width: 35,
    height: 35,
  },
  appSidebarDrawer: {
    margin: '0',
    padding: '0',
    width: '19rem',
    '& .listItem': {
      zIndex: 1305,
    },
  },
  scLauncher: {
    '& .sc-header, & .sc-message--content.sent .sc-message--text, & .sc-header--close-button:hover':
      {
        backgroundColor: `${theme.palette.primary.main} !important`,
      },
  },
}));
export default useStyles;
