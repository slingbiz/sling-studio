import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 48,
    '&.active': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.contrastText + '!important',
      pointerEvents: 'none',
      '& .list-item-text-primary': {
        color: 'inherit',
      },
      '& .list-item-icon': {
        color: 'inherit',
      },
    },
    '& .list-item-icon': {},
    '& .list-item-text': {
      padding: '0 0 0 16px',
    },
    color: theme.palette.text.primary,
    textDecoration: 'none!important',
    '&.dense': {
      padding: '8px 12px 8px 12px',
      minHeight: 40,
      '& .list-item-text': {
        padding: '0 0 0 8px',
      },
    },
  },
}));
export default useStyles;
