import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tableCell: {
    fontSize: 13,
    padding: 8,
    whiteSpace: 'nowrap',
    '&:first-child': {
      paddingLeft: 20,
    },
    '&:last-child': {
      paddingRight: 20,
    },
  },
  whiteSpace: {
    whiteSpace: 'no-wrap',
  },
  anchar: {
    color: theme.palette.primary.main,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    display: 'inline-block',
  },
  badgeRoot: {
    padding: '3px 5px',
    borderRadius: 4,
    fontSize: 14,
    display: 'inline-block',
  },
}));
export default useStyles;
