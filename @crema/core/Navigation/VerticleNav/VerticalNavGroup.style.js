import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  return {
    navItem: {
      height: 40,
      marginTop: 2,
      marginBottom: 2,
      paddingLeft:
        theme.direction === 'ltr' ? (props) => 24 + 40 * props.level : 12,
      paddingRight:
        theme.direction === 'rtl' ? (props) => 24 + 40 * props.level : 12,
      color: (props) =>
        props.themeMode === 'light'
          ? theme.palette.text.secondary
          : 'rgba(255,255,255,0.38)',
      fontWeight: 700,
      fontSize: 14,
      cursor: 'pointer',
      textDecoration: 'none!important',

      [theme.breakpoints.up('xl')]: {
        // fontSize: 16,
        marginTop: 4,
        marginBottom: 4,
      },
      '&.nav-item-header': {
        textTransform: 'uppercase',
      },
    },
  };
});

export default useStyles;
