import {makeStyles} from '@material-ui/core';
import {ThemeMode} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => {
  return {
    drawerContainer: {
      paddingLeft: 0,
      paddingTop: 0,
      paddingBottom: 0,
      maxHeight: '100vh',
      width: '19rem',
      [theme.breakpoints.up('xl')]: {
        width: '21.6rem',
      },
    },
    sidebarBg: {
      overflow: 'hidden',
      backgroundColor: (props) =>
        props.themeMode === ThemeMode.SEMI_DARK
          ? theme.palette.sidebar.bgColor
          : props.themeMode === ThemeMode.LIGHT
          ? 'white'
          : '#313541',
    },
    drawerScrollAppSidebar: {
      paddingTop: 8,
      paddingBottom: 32,
      height: 'calc(100vh - 58px) !important',
    },
  };
});
export default useStyles;
