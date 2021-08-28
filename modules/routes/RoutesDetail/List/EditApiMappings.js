import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Grid,
  Tab,
  Tabs,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Regex from './Regex';
import Basic from './Basic';

const useStyles = makeStyles((theme) => ({
  boxLayoutView: {padding: '1.5em'},

  appBar: {
    position: 'relative',
  },
  toolBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const EditRoute = ({setOpen, open, titleKey, pageKey, apiObj}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <IconButton onClick={handleClose}>
            <ArrowBackIcon />
          </IconButton>
          <Tabs
            value={value}
            textColor='inherit'
            onChange={handleChange}
            aria-label='Route Tabs'>
            <Tab label='Basic' />
            <Tab label='Regex' disabled />
          </Tabs>
          <Button autoFocus color='inherit' onClick={handleClose}>
            Cancel
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container alignItems='center'>
        <Grid item xs={12}>
          {value === 0 ? (
            <Basic setOpen={setOpen} apiObj={apiObj} />
          ) : (
            <Regex />
          )}
        </Grid>
      </Grid>
    </Dialog>
  );
};
export default EditRoute;
