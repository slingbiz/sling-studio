import {makeStyles} from '@material-ui/core';
import {ThemeMode} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => {
  return {
    container: {
      width: '19rem',
      maxHeight: '100vh',
      [theme.breakpoints.up('xl')]: {
        width: '21.6rem',
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
      paddingTop: 8,
      paddingBottom: 20,
    },
    drawerScrollAppSidebar: {
      paddingTop: 8,
      paddingBottom: 20,
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
