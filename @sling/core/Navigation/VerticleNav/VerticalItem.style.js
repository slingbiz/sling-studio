import {makeStyles} from '@material-ui/core/styles';
import {Fonts, ThemeMode} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => {
  return {
    navItem: {
      height: 64,
      marginTop: 2,
      marginBottom: 2,
      cursor: 'pointer',
      textDecoration: 'none !important',
      width: 'calc(100% - 16px)',
      borderRadius: 8,
      overflow: 'hidden',
      paddingLeft:
        theme.direction === 'ltr' ? (props) => 12 + 20 * props.level : 12,
      paddingRight:
        theme.direction === 'rtl' ? (props) => 12 + 20 * props.level : 12,
      transition: 'background-color 180ms cubic-bezier(0.22, 1, 0.36, 1)',
      '&.nav-item-header': {
        textTransform: 'uppercase',
      },
      '&.active': {
        backgroundColor: '#ff9800',
        pointerEvents: 'none',
        '& .nav-item-text': {
          color: theme.palette.common.white + '!important',
          fontWeight: Fonts.MEDIUM,
        },
        '& .nav-item-icon': {
          color: theme.palette.common.white + '!important',
        },
      },

      '&:hover, &:focus': {
        backgroundColor: 'rgba(255, 152, 0, 0.1)',
        '& .nav-item-text': {
          color: (props) =>
            props.themeMode === ThemeMode.LIGHT
              ? '#ff9800'
              : '#fff',
        },

        '& .nav-item-icon': {
          color: (props) =>
            props.themeMode === ThemeMode.LIGHT
              ? '#ff9800'
              : '#fff',
        },

        '& .nav-item-icon-arrow': {
          color: (props) =>
            props.themeMode === ThemeMode.LIGHT
              ? '#ff9800'
              : '#fff',
        },
      },
      '&.active:hover, &.active:focus': {
        backgroundColor: '#ff9800',
      },
      '& .nav-item-icon': {
        color: theme.palette.sidebar.textColor,
      },
      '& .nav-item-text': {
        color: theme.palette.sidebar.textColor,
        fontWeight: Fonts.MEDIUM,
        fontSize: 16,
        fontFamily: 'Open Sans, system-ui, sans-serif',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    listIcon: {
      fontSize: 24,
      [theme.breakpoints.up('xl')]: {
        fontSize: 26,
      },
    },
    listItemText: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontWeight: Fonts.REGULAR,
    },
    disabled: {
      color: '#cfcfcf',
    },
  };
});
export default useStyles;
