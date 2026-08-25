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

      [theme.breakpoints.up('lg')]: {
        width: '5.5rem',
        position: 'fixed',
        left: 0,

        '& .nav-item-text, & .nav-item-icon-arrow': {
          opacity: 0,
          visibility: 'hidden',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          transition: `opacity 120ms ${EASE}, visibility 120ms ${EASE}`,
        },

        '& .nav-item-header, & .user-info, & .collapse-children': {
          display: 'none',
        },
      },

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

        [theme.breakpoints.up('lg')]: {
          marginRight: '5px !important',
          marginLeft: '5px !important',
        },

        [theme.breakpoints.up('xl')]: {
          marginRight: '0 !important',
          marginLeft: '0 !important',
        },
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

      '&:hover': {
        [theme.breakpoints.up('lg')]: {
          width: '16rem',

          '& .nav-item-text, & .nav-item-icon-arrow': {
            opacity: 1,
            visibility: 'visible',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            transition: `opacity 180ms ${EASE} 90ms, visibility 180ms ${EASE} 90ms`,
          },

          '& .nav-item-header, & .user-info, & .collapse-children': {
            display: 'block',
          },

          '& .nav-item-icon': {
            marginLeft: '0 !important',
          },

          '& .nav-item': {
            width: 'calc(100% - 16px)',
            paddingLeft: 12,
            marginLeft: 8,
            borderRadius: 8,
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
