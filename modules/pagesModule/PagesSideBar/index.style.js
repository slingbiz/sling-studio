import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  listItem: {
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '12px',
    paddingBottom: '12px',
    borderBottom: '1px solid #f0e6d8',
    backgroundColor: 'transparent',

    '& .MuiListItemText-root': {
      [theme.breakpoints.down('lg')]: {
        marginTop: 0,
        marginBottom: 0,
      },
    },

    '& .MuiTypography-body1': {
      fontSize: '14px',
      color: '#6b645c',
    },

    '& svg': {
      fontSize: '18px',
      color: '#6b645c',
    },

    '&:hover,&:focus': {
      backgroundColor: '#fff8f0',
      color: '#6b645c',

      '& svg': {
        fontSize: '18px',
        color: '#6b645c',
      },

      '& .MuiTypography-root': {
        color: '#6b645c',
      },
    },

    '&.active': {
      backgroundColor: '#fff8f0',
      color: '#ff9800',
      fontWeight: Fonts.MEDIUM,

      '& svg, & .MuiTypography-root': {
        fontWeight: Fonts.MEDIUM,
        color: '#ff9800',
      },
    },
  },
}));
export default useStyles;
