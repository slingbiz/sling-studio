import {makeStyles} from '@material-ui/core/styles';
import {Fonts, ThemeMode} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => {
  return {
    navItem: {
      height: 40,
      marginTop: 2,
      marginBottom: 2,
      width: 'calc(100% - 16px)',
      borderRadius: '0 30px 30px 0',
      paddingLeft:
        theme.direction === 'ltr' ? (props) => 24 + 40 * props.level : 24,
      paddingRight:
        theme.direction === 'rtl' ? (props) => 24 + 40 * props.level : 24,

      '& .nav-item-text': {
        fontWeight: Fonts.REGULAR,
        // fontSize: 16,
        color: theme.palette.sidebar.textColor,

        [theme.breakpoints.up('xl')]: {
          marginTop: 4,
          marginBottom: 4,
          // fontSize: 18,
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
      fontSize: 18,
      [theme.breakpoints.up('xl')]: {
        // fontSize: 20,
      },
    },
  };
});
export default useStyles;
