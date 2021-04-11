import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  listItem: {
    paddingLeft: '10px',
    paddingRight: '0',
    paddingTop: '5px',
    paddingBottom: '5px',
    backgroundColor: 'transparent',

    '& .MuiListItemText-root': {
      [theme.breakpoints.down('lg')]: {
        marginTop: 0,
        marginBottom: 0,
      },
    },

    '& .MuiTypography-body1': {
      fontSize: '14px',
      color: '#A8A8A8',
    },

    '& svg': {
      fontSize: '18px',
      color: '#A8A8A8',
    },

    '&:hover,&:focus,&.active': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.main,

      '& svg': {
        fontSize: '18px',
        color: theme.palette.primary.main,
      },

      '& .MuiTypography-root': {
        color: theme.palette.primary.main,
      },
    },

    '&.active': {
      color: theme.palette.primary.main,
      fontWeight: Fonts.MEDIUM,

      '& svg, & .MuiTypography-root': {
        fontWeight: Fonts.MEDIUM,
        color: theme.palette.primary.main,
      },
    },
  },
}));
export default useStyles;
