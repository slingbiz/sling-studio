import {makeStyles} from '@material-ui/core/styles';
import {Fonts, ThemeMode} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => {
  return {
    navItem: {
      height: 40,
      marginTop: 2,
      marginBottom: 2,
      width: 'calc(100% - 16px)',
      borderRadius: 8,
      paddingLeft:
        theme.direction === 'ltr' ? (props) => 24 + 40 * props.level : 24,
      paddingRight:
        theme.direction === 'rtl' ? (props) => 24 + 40 * props.level : 24,

      '& .nav-item-text': {
        fontWeight: Fonts.MEDIUM,
        fontSize: 16,
        fontFamily: 'Open Sans, system-ui, sans-serif',
        color: theme.palette.sidebar.textColor,

        [theme.breakpoints.up('xl')]: {
          marginTop: 4,
          marginBottom: 4,
        },
      },

      '& .nav-item-icon': {
        color: theme.palette.sidebar.textColor,
      },

      '& .nav-item-icon-arrow': {
        color: theme.palette.sidebar.textColor,
      },

      '& .MuiIconButton-root': {
        marginRight: -16,
      },

      '&.open, &:hover, &:focus': {
        '& .nav-item-text': {
          fontWeight: Fonts.MEDIUM,
          color: (props) =>
            props.themeMode === ThemeMode.LIGHT ? '#313541' : '#fff',
        },

        '& .nav-item-icon': {
          color: (props) =>
            props.themeMode === ThemeMode.LIGHT ? '#313541' : '#fff',
        },

        '& .nav-item-icon-arrow': {
          color: (props) =>
            props.themeMode === ThemeMode.LIGHT ? '#313541' : '#fff',
        },
      },
    },
    listItemText: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    listIcon: {
      fontSize: 24,
      [theme.breakpoints.up('xl')]: {
        fontSize: 26,
      },
    },
  };
});
export default useStyles;
