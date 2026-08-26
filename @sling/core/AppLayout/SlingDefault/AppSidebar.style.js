import {makeStyles} from '@material-ui/core';
import {ThemeMode} from '../../../../shared/constants/AppEnums';

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const useStyles = makeStyles((theme) => {
  return {
    miniSidebar: {
      zIndex: 1109,
      width: '19rem',
      height: `calc(100vh - 70px)`,
      overflow: 'hidden',
      transition: `width 280ms ${EASE}`,

      [theme.breakpoints.up('xl')]: {
        width: '5.5rem',
      },

      '& .sl-user-info': {
        paddingLeft: '10px !important',
        paddingRight: '10px !important',
        transition: `padding 280ms ${EASE}`,

        [theme.breakpoints.up('xl')]: {
          paddingLeft: '12px !important',
          paddingRight: '12px !important',
        },
      },

      '& .nav-item-icon': {
        transition: `margin 280ms ${EASE}`,
        display: 'block',
        flexShrink: 0,
      },

      '& .MuiListItemText-root': {
        minWidth: 0,
        overflow: 'hidden',
        flex: '1 1 auto',
      },

      '& .nav-item': {
        overflow: 'hidden',
        borderRadius: 8,
        marginLeft: 8,
        marginRight: 8,
        width: 'calc(100% - 16px)',
        paddingLeft: 12,
        paddingRight: 12,
        transition: `background-color 180ms ${EASE}`,

        [theme.breakpoints.up('xl')]: {
          height: 64,
          paddingLeft: 12,
        },
      },

      [theme.breakpoints.up('lg')]: {
        width: '5.5rem',
        position: 'fixed',
        left: 0,

        '& .nav-item-text, & .nav-item-icon-arrow': {
          opacity: 0,
          visibility: 'hidden',
          position: 'absolute',
          width: 0,
          height: 0,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          transition: `opacity 120ms ${EASE}, visibility 120ms ${EASE}`,
        },

        '& .ps__rail-y, & .ps__rail-x': {
          display: 'none',
        },

        '& .nav-item-header, & .user-info, & .collapse-children': {
          display: 'none',
        },

        '& .MuiListItemText-root': {
          flex: '0 0 0',
          minWidth: 0,
          width: 0,
          margin: 0,
          padding: 0,
          overflow: 'hidden',
        },
        '& .nav-item': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 48,
          minHeight: 48,
          paddingLeft: 0,
          paddingRight: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
        '& .nav-item-icon': {
          marginLeft: '0 !important',
          marginRight: '0 !important',
        },
        '& .nav-item > span': {
          marginLeft: '0 !important',
          marginRight: '0 !important',
        },
        '& .MuiIconButton-root': {
          display: 'none',
        },
      },

      '&:hover': {
        [theme.breakpoints.up('lg')]: {
          width: '16rem',

          '& .nav-item-text, & .nav-item-icon-arrow': {
            opacity: 1,
            visibility: 'visible',
            position: 'static',
            width: 'auto',
            height: 'auto',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            transition: `opacity 180ms ${EASE} 90ms, visibility 180ms ${EASE} 90ms`,
          },

          '& .MuiListItemText-root': {
            flex: '1 1 auto',
            width: 'auto',
            minWidth: 0,
          },

          '& .nav-item-header, & .user-info, & .collapse-children': {
            display: 'block',
          },

          '& .nav-item-icon': {
            marginLeft: '0 !important',
          },

          '& .nav-item': {
            justifyContent: 'flex-start',
            width: 'calc(100% - 16px)',
            paddingLeft: 12,
            paddingRight: 12,
            marginLeft: 8,
            marginRight: 8,
            borderRadius: 8,
          },
          '& .nav-item > span': {
            marginRight: '16px !important',
          },
          '& .MuiIconButton-root': {
            display: 'inline-flex',
          },
          '& .ps__rail-y': {
            display: 'block',
          },
          '& .collapse-children .nav-item': {
            paddingLeft: 36,
          },
          '& .collapse-children .collapse-children .nav-item': {
            paddingLeft: 56,
          },
          '& .collapse-children .collapse-children .collapse-children .nav-item': {
            paddingLeft: 76,
          },
        },

        [theme.breakpoints.up('xl')]: {
          '& .nav-item': {
            paddingLeft: 12,
            marginLeft: 8,
          },
          '& .collapse-children .nav-item': {
            paddingLeft: 36,
          },
          '& .collapse-children .collapse-children .nav-item': {
            paddingLeft: 56,
          },
          '& .collapse-children .collapse-children .collapse-children .nav-item': {
            paddingLeft: 76,
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
      borderRight: '1px solid #eae8e8',
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
