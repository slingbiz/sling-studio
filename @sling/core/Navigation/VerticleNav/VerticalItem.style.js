import {makeStyles} from '@material-ui/core/styles';
import {Fonts, ThemeMode} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => {
  return {
    navItem: {
      height: 40,
      marginTop: 2,
      marginBottom: 2,
      cursor: 'pointer',
      textDecoration: 'none !important',
      width: 'calc(100% - 16px)',
      borderRadius: '0 30px 30px 0',
      paddingLeft:
        theme.direction === 'ltr' ? (props) => 24 + 40 * props.level : 12,
      paddingRight:
        theme.direction === 'rtl' ? (props) => 24 + 40 * props.level : 12,
      '&.nav-item-header': {
        textTransform: 'uppercase',
      },
      '&.active': {
        backgroundColor: theme.palette.primary.main,
        pointerEvents: 'none',
        transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
        '& .nav-item-text': {
          color: theme.palette.common.white + '!important',
          fontWeight: Fonts.MEDIUM,
        },
        '& .nav-item-icon': {
          color: theme.palette.common.white + '!important',
        },
      },

      '&:hover, &:focus': {
        '& .nav-item-text': {
          color: (props) =>
            props.themeMode === ThemeMode.LIGHT
              ? theme.palette.primary.main
              : '#fff',
        },

        '& .nav-item-icon': {
          color: (props) =>
            props.themeMode === ThemeMode.LIGHT
              ? theme.palette.primary.main
              : '#fff',
        },

        '& .nav-item-icon-arrow': {
          color: (props) =>
            props.themeMode === ThemeMode.LIGHT
              ? theme.palette.primary.main
              : '#fff',
        },
      },
      '& .nav-item-icon': {
        color: theme.palette.sidebar.textColor,
      },
      '& .nav-item-text': {
        color: theme.palette.sidebar.textColor,
        fontWeight: Fonts.MEDIUM,
      },
    },
    listIcon: {
      fontSize: 18,
      [theme.breakpoints.up('xl')]: {
        // fontSize: 20,
      },
    },
    listItemText: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontWeight: Fonts.REGULAR,
    },
  };
});
export default useStyles;
