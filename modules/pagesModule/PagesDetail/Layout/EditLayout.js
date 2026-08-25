import React, {useEffect, useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import {Fonts} from '../../../../shared/constants/AppEnums';
import LayoutView from './LayoutEditView';
import {getWidgets} from '../../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  boxLayoutView: {padding: '1.5em'},
  appBar: {
    position: 'relative',
    backgroundColor: '#163a5f',
    color: '#fff',
    boxShadow: 'none',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontSize: 14,
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 600,
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: 14,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    marginTop: 5,
    marginBottom: 5,
  },
  textTruncate: {
    padding: '10px 0',
  },
  componentBox: {
    height: '8em',
    width: '100%',
    border: '1px solid #d6d3d3',
    borderRadius: '4px',
    justifyContent: 'center',
    margin: '0.5em',
    flex: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cancelBtn: {
    textTransform: 'none',
    color: '#fff',
    fontSize: 14,
    fontWeight: 500,
    fontFamily: 'Open Sans, sans-serif',
    border: '1px solid rgba(255,255,255,0.55)',
    backgroundColor: 'transparent',
    padding: '6px 16px',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.08)',
    },
  },
  applyBtn: {
    textTransform: 'none',
    backgroundColor: '#ff9800',
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'Open Sans, sans-serif',
    marginLeft: 15,
    padding: '6px 18px',
    boxShadow: 'none',
    '&:hover, &:focus': {
      backgroundColor: '#f57c00',
      boxShadow: 'none',
    },
  },
  button: {
    backgroundColor: '#ff9800',
    marginBottom: 20,
    color: '#fff',
    fontWeight: Fonts.BOLD,
    paddingRight: 20,
    paddingLeft: 20,
    '&:hover, &:focus': {
      backgroundColor: '#f57c00',
      color: '#fff',
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

// fake data generator
const getItems = (count, offset = 0, classes) =>
  Array.from({length: count}, (v, k) => k).map((k) => {
    let content = `Widget ${k + offset}`;
    if (k == 0) {
      content = (
        <>
          <SearchIcon />
          <Box
            component='h6'
            className={classes.textTruncate}
            color='text.primary'
            fontWeight={Fonts.BOLD}>
            {'Search Bar'}
          </Box>
        </>
      );
    }
    return {
      id: `item-${k + offset}`,
      content,
    };
  });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const EditLayout = ({open, setOpen, titleKey, pageKey}) => {
  console.log(pageKey, 'pageKey');
  const classes = useStyles();
  const childRef = useRef();
  const dispatch = useDispatch();
  const {widgets} = useSelector(({widgets}) => widgets);

  useEffect(() => {
    dispatch(getWidgets({size: 1000}));
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRootSave = async () => {
    childRef.current.saveLayoutConfig();
    await sleep(3000);
    handleClose();
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}>
      <AppBar className={classes.appBar} color='default'>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
            disableRipple>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            {titleKey} {' / Edit'}
          </Typography>
          <Button
            autoFocus={true}
            className={classes.cancelBtn}
            onClick={handleClose}
            disableRipple>
            Cancel
          </Button>
          <Button
            className={classes.applyBtn}
            autoFocus={true}
            onClick={handleRootSave}
            disableRipple>
            Apply Changes
          </Button>
        </Toolbar>
      </AppBar>
      <LayoutView
        getItems={getItems}
        widgets={widgets || []}
        ref={childRef}
        pageKey={pageKey}
        isEditable={true}
        key={'edit'}
      />
    </Dialog>
  );
};
export default EditLayout;
