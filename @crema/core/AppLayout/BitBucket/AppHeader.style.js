import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bitBucketResHeader: {
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    position: 'fixed',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 30,
      paddingRight: 30,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuIcon: {
    width: 35,
    height: 35,
  },
  pointer: {
    cursor: 'pointer',
  },
  logoRoot: {
    verticalAlign: 'middle',
    display: 'inline-block',
    height: 30,
  },
}));
export default useStyles;
