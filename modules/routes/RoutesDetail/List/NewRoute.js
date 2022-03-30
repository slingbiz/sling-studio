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
import Typography from "@material-ui/core/Typography";

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

const NewRoute = ({open, setOpen}) => {
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
      fullWidth={'md'}
      maxWidth={'sm'}
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}>
      <AppBar className={classes.appBar} color='transparent'>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='close'>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            {' Routes / Add a Route'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container alignItems='center'>
        <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
          <Tabs
            value={value}
            textColor='inherit'
            onChange={handleChange}
            aria-label='Route Tabs'>
            <Tab label='Basic' />
            <Tab label='Regex' disabled />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          {value === 0 ? <Basic setOpen={setOpen} /> : <Regex />}
        </Grid>
      </Grid>
    </Dialog>
  );
};
export default NewRoute;
