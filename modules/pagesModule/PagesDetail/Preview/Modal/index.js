import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  Grid,
  Slide,
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  Dialog,
  Button,
  Box,
} from '@material-ui/core';
import LaptopIcon from '@material-ui/icons/Laptop';
import TabletAndroidIcon from '@material-ui/icons/TabletAndroid';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import {useState} from 'react';
import Desktop from './Desktop';
import Tablet from './Tablet';
import Mobile from './Mobile';

const useStyles = makeStyles((theme) => ({
  boxLayoutView: {padding: '1.5em'},
  activeIcon: {
    color: '#FFFFFF',
    backgroundColor: '#0288d1',
    '&:hover': {
      backgroundColor: '#0277bd',
    },
  },
  titlePreview:{
    fontWeight: 'bold',
  },
  inactiveIcon: {
    color: '#B0BEC5',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: '#eceff1',
    },
  },
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

const PreviewModal = ({open, setOpen, urlToPreview}) => {
  const classes = useStyles();
  const [screenMode, setScreenMode] = useState('DESKTOP');

  const handleClose = () => {
    setOpen(false);
  };

  const getIconColorClass = (curr) => {
    return curr === screenMode ? classes.activeIcon : classes.inactiveIcon;
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Grid container direction='row' alignItems='center'>
            <Grid item xs={4}>
              <Box style={{display: 'flex', alignItems: 'center'}}>
                <IconButton onClick={handleClose}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography  className={classes.titlePreview}>
                  {urlToPreview}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4} style={{textAlign: 'center'}}>
              <Box my={3} mx={3}>
                <Button
                  style={{
                    borderRadius: '1% !important',
                  }}
                  className={getIconColorClass('DESKTOP')}
                  onClick={() => setScreenMode('DESKTOP')}>
                  <LaptopIcon className={getIconColorClass('DESKTOP')} />
                  <Typography variant='caption' component='span'>
                    &nbsp; Laptop
                  </Typography>
                </Button>
                <Button
                  className={getIconColorClass('TABLET')}
                  onClick={() => setScreenMode('TABLET')}>
                  <TabletAndroidIcon className={getIconColorClass('TABLET')} />
                  <Typography variant='caption' component='span'>
                  &nbsp;Tablet
                  </Typography>
                </Button>
                <Button
                  className={getIconColorClass('MOBILE')}
                  onClick={() => setScreenMode('MOBILE')}>
                  <PhoneAndroidIcon className={getIconColorClass('MOBILE')} />
                  <Typography variant='caption' component='span'>
                  &nbsp; Mobile
                  </Typography>
                </Button>
              </Box>
            </Grid>
            <Grid item xs={4} style={{textAlign: 'end'}}>
              <Button autoFocus color='inherit' onClick={handleClose}>
                Close
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid
        container
        className={classes.root}
        alignItems='center'
        direction='column'>
        <Grid item xs={12}>
          <Box my={5}>
            {screenMode === 'DESKTOP' && (
              <Desktop urlToPreview={urlToPreview} />
            )}
            {screenMode === 'TABLET' && <Tablet urlToPreview={urlToPreview} />}
            {screenMode === 'MOBILE' && <Mobile urlToPreview={urlToPreview} />}
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default PreviewModal;
