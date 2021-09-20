import React, {useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {Fonts} from '../../../../shared/constants/AppEnums';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  boxLayoutView: {padding: '1.5em'},
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
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
    // backgroundColor: 'lightgrey',
    border: '1px solid #d6d3d3',
    borderRadius: '4px',
    justifyContent: 'center',
    margin: '0.5em',
    flex: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const AddWidgetModal = ({open, setOpen, titleKey, pageKey}) => {
  const classes = useStyles();
  const childRef = useRef();


  const handleClose = () => {
    setOpen(false);
  };

  const handleRootSave = () => {
    childRef.current.saveLayoutConfig();
    handleClose();
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='close'>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            {' Widgets / Add a Widget'}
          </Typography>
          <Button autoFocus color='inherit' onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus color='inherit' onClick={handleRootSave}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <Card
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              padding: '1.5em',
              marginTop: '1.5em',
              alignItems: 'center',
            }}>
            <Box
              component='h2'
              className={classes.textTruncate}
              color='text.primary'
              fontWeight={Fonts.BOLD}>
              {'Upload Widget'}
            </Box>
            <Box
              component='h4'
              color='text.secondary'
              fontWeight={Fonts.MEDIUM}>
              {'Please select a valid widget.json file.'}
            </Box>
            <Paper className={classes.root}>
              <Divider className={classes.divider} orientation='vertical' />
            </Paper>
            <Divider style={{marginTop: 15, marginBottom: 15}} />
            <Box></Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Card
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              padding: '1.5em',
              marginTop: '1.5em',
            }}>
            aaf
          </Card>
        </Grid>
      </Grid>
    </Dialog>
  );
};
export default AddWidgetModal;
