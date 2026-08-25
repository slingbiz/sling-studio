import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import { useState } from 'react';
import Desktop from './Desktop';
import Tablet from './Tablet';
import Mobile from './Mobile';

const useStyles = makeStyles((theme) => ({
  boxLayoutView: { padding: '1.5em' },
  activeIcon: {
    color: '#fff',
    backgroundColor: '#ff9800',
    textTransform: 'none',
    fontSize: 14,
    fontFamily: 'Open Sans, sans-serif',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#f57c00',
      boxShadow: 'none',
    },
  },
  titlePreview: {
    fontWeight: 600,
    fontSize: 14,
    fontFamily: 'Open Sans, sans-serif',
  },
  inactiveIcon: {
    color: 'rgba(255,255,255,0.75)',
    backgroundColor: 'transparent',
    textTransform: 'none',
    fontSize: 14,
    fontFamily: 'Open Sans, sans-serif',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.08)',
      boxShadow: 'none',
    },
  },
  appBar: {
    position: 'relative',
    backgroundColor: '#163a5f',
    color: '#fff',
    boxShadow: 'none',
  },
  closeBtn: {
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
  toolBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  responsiveGrid: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      textAlign: 'center',
      '& > div': {
        marginBottom: theme.spacing(1),
      },
    },
  },
  iconButton: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const PreviewModal = ({ open, setOpen, urlToPreview }) => {
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
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar} color='default'>
        <Toolbar className={classes.toolBar}>
          <Grid container alignItems='center' className={classes.responsiveGrid}>
            <Grid item xs={12} sm={4}>
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleClose} style={{color: '#fff'}}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography className={classes.titlePreview}>
                  {urlToPreview}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} style={{ textAlign: 'center' }}>
              <Box my={3} mx={3}>
                <Button
                  style={{ borderRadius: '1% !important' }}
                  className={`${getIconColorClass('DESKTOP')} ${classes.iconButton}`}
                  onClick={() => setScreenMode('DESKTOP')}
                >
                  <LaptopIcon className={getIconColorClass('DESKTOP')} />
                  <Typography variant='caption' component='span'>
                    &nbsp; Laptop
                  </Typography>
                </Button>
                <Button
                  className={`${getIconColorClass('TABLET')} ${classes.iconButton}`}
                  onClick={() => setScreenMode('TABLET')}
                >
                  <TabletAndroidIcon className={getIconColorClass('TABLET')} />
                  <Typography variant='caption' component='span'>
                    &nbsp;Tablet
                  </Typography>
                </Button>
                <Button
                  className={`${getIconColorClass('MOBILE')} ${classes.iconButton}`}
                  onClick={() => setScreenMode('MOBILE')}
                >
                  <PhoneAndroidIcon className={getIconColorClass('MOBILE')} />
                  <Typography variant='caption' component='span'>
                    &nbsp; Mobile
                  </Typography>
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} style={{ textAlign: 'end' }}>
              <Button autoFocus={true} className={classes.closeBtn} onClick={handleClose}>
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
        direction='column'
      >
        <Grid item xs={12}>
          <Box my={5}>
            {screenMode === 'DESKTOP' && <Desktop urlToPreview={urlToPreview} />}
            {screenMode === 'TABLET' && <Tablet urlToPreview={urlToPreview} />}
            {screenMode === 'MOBILE' && <Mobile urlToPreview={urlToPreview} />}
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default PreviewModal;
