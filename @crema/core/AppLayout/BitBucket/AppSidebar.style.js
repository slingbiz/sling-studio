import {makeStyles} from '@material-ui/core';
import {ThemeMode} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => {
  return {
    bitBucketSidebar: {
      width: '19rem',
      display: 'flex',
      position: 'relative',
      transition: 'all 0.5s ease',

      [theme.breakpoints.up('xl')]: {
        width: '21.6rem',
      },
    },
    appSidebarContainer: {
      paddingLeft: 0,
      paddingTop: 0,
      paddingBottom: 0,
      transition: 'all 0.5s ease',
      width: '15.7rem',

      [theme.breakpoints.up('xl')]: {
        width: '17.3rem',
      },
    },
    sidebarBg: {
      backgroundColor: (props) =>
        props.themeMode === ThemeMode.SEMI_DARK
          ? theme.palette.sidebar.bgColor
          : props.themeMode === ThemeMode.LIGHT
          ? 'white'
          : '#313541',
    },
    scrollAppSidebar: {
      height: 'calc(100vh - 56px) !important',

      [theme.breakpoints.up('sm')]: {
        height: 'calc(100vh - 70px) !important',
      },
    },
    drawerScrollAppSidebar: {
      paddingTop: 8,
      paddingBottom: 20,
      height: 'calc(100vh - 56px) !important',

      [theme.breakpoints.up('sm')]: {
        height: 'calc(100vh - 70px) !important',
      },
    },
    bitBucketBtn: {
      position: 'absolute',
      top: 20,
      right: '-12px',
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      cursor: 'pointer',
      zIndex: 9,
      display: 'none',

      [theme.breakpoints.up('lg')]: {
        display: 'block',
      },
      '& svg': {
        display: 'block',
      },
    },
    sidebarStandard: {
      height: '100%',
      width: '100%',
      color: 'white',
      overflow: 'hidden',
    },
  };
});
export default useStyles;
