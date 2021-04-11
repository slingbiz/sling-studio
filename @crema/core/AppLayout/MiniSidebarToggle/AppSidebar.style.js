import {makeStyles} from '@material-ui/core';
import {ThemeMode} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => {
  return {
    container: {
      paddingLeft: 0,
      paddingTop: 0,
      paddingBottom: 0,
      maxHeight: '100vh',
      position: 'relative',
      top: 0,
      left: 0,
      zIndex: 1109,
      width: '19rem',
      transition: 'all 0.5s ease',

      [theme.breakpoints.up('lg')]: {
        position: 'fixed',
        '&.mini-sidebar-collapsed': {
          width: '4rem',

          '& + .main-content': {
            marginLeft: '4rem',
            width: 'calc(100vw - 4rem)',
            flex: 'auto',

            '& .app-bar': {
              width: 'calc(100vw - 4rem)',
            },
          },

          '& .cr-user-info': {
            paddingLeft: '12px !important',
            paddingRight: '12px !important',
          },

          '& .nav-item-icon': {
            display: 'block',
          },

          '& .nav-item-text, & .nav-item-icon-arrow': {
            opecity: 0,
            visibility: 'hidden',
          },

          '& .nav-item-header, & .user-info, & .collapse-children': {
            display: 'none',
          },

          '& .nav-item': {
            width: 48,
            paddingLeft: 14,
            marginLeft: 8,
            borderRadius: '50%',
          },
        },
      },

      [theme.breakpoints.up('xl')]: {
        width: '21rem',
        '&.mini-sidebar-collapsed': {
          width: '5rem',

          '& + .main-content': {
            marginLeft: '5rem',
            width: 'calc(100vw - 5rem)',

            '& .app-bar': {
              width: 'calc(100vw - 5rem)',
            },
          },

          '& .cr-user-info': {
            paddingLeft: '16px !important',
            paddingRight: '16px !important',
          },

          '& .nav-item': {
            height: 48,
            paddingLeft: 13,
            marginLeft: 12,
          },
        },
      },

      '&:hover': {
        [theme.breakpoints.up('lg')]: {
          '&.mini-sidebar-collapsed': {
            width: '21.6rem',

            '& .nav-item-text, & .nav-item-icon-arrow': {
              opecity: 1,
              visibility: 'visible',
            },

            '& .nav-item-header, & .user-info, & .collapse-children': {
              display: 'block',
            },

            '& .nav-item': {
              width: 'calc(100% - 16px)',
              paddingLeft: 17,
              marginLeft: 0,
              borderRadius: '0 30px 30px 0',
            },
            '& .collapse-children .nav-item': {
              paddingLeft: 67,
            },
            '& .collapse-children .collapse-children .nav-item': {
              paddingLeft: 117,
            },
            '& .collapse-children .collapse-children .collapse-children .nav-item': {
              paddingLeft: 167,
            },
          },
        },

        [theme.breakpoints.up('xl')]: {
          '&.mini-sidebar-collapsed': {
            '& .nav-item': {
              paddingLeft: 24,
              marginLeft: 0,
            },
            '& .collapse-children .nav-item': {
              paddingLeft: 74,
            },
            '& .collapse-children .collapse-children .nav-item': {
              paddingLeft: 124,
            },
            '& .collapse-children .collapse-children .collapse-children .nav-item': {
              paddingLeft: 174,
            },
          },
        },
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
      height: 'calc(100vh - 58px) !important',

      [theme.breakpoints.up('xl')]: {
        height: 'calc(100vh - 65px) !important',
      },
    },
    drawerScrollAppSidebar: {
      paddingTop: 8,
      paddingBottom: 20,
      height: 'calc(100vh - 58px) !important',

      [theme.breakpoints.up('xl')]: {
        height: 'calc(100vh - 65px) !important',
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
