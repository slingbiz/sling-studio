import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  colorOption: {
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    border: `1px solid ${theme.palette.text.primary}`,
  },
  colorOptionTriangle: {
    transform: 'rotate(45deg)',
    marginTop: 10,
    marginLeft: 22,
  },
  colorOptionBorder: {
    width: 10,
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
  },
  colorOptionRightIcon: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 20,
    height: 20,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#fff',
    color: theme.palette.primary.main,
  },
  textBase: {
    fontSize: 16,
  },
}));
export default useStyles;
