import makeStyles from '@material-ui/core/styles/makeStyles';
import {Fonts} from '../../constants/AppEnums';
import {fade} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  '@global': {
    // for global styles
    '.MuiLink-root': {
      fontWeight: Fonts.REGULAR,
    },
    '.pointer': {
      cursor: 'pointer',
    },
    '.MuiTableCell-stickyHeader': {
      backgroundColor: theme.palette.background.paper,
    },
    '.item-hover': {
      transition: 'all .2s ease',
      transform: 'scale(1)',
      '&:hover': {
        backgroundColor: fade(theme.palette.primary.main, 0.1),
        transform: 'translateY(-2px)',
        boxShadow: `0 3px 10px 0 ${fade(theme.palette.common.black, 0.2)}`,
      },
    },
    '.card-hover': {
      transition: 'all 0.3s ease',
      transform: 'scale(1)',
      '&:hover': {
        boxShadow: '0 4px 8px rgba(0,0,0,.45)',
        transform: 'scale(1.05)',
      },
    },
  },
}));

export default useStyles;
