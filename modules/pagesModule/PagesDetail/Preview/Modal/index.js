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

  const getIconColor = (curr) => {
    return curr === screenMode ? 'inherit' : 'default';
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
          <Box my={3} mx={3}>
            <IconButton
              color={getIconColor('DESKTOP')}
              onClick={() => setScreenMode('DESKTOP')}>
              <LaptopIcon />
              <Typography variant='caption' component='span'>
                Laptop
              </Typography>
            </IconButton>
            <IconButton
              color={getIconColor('TABLET')}
              onClick={() => setScreenMode('TABLET')}>
              <TabletAndroidIcon />
              <Typography variant='caption' component='span'>
                Tablet
              </Typography>
            </IconButton>
            <IconButton
              color={getIconColor('MOBILE')}
              onClick={() => setScreenMode('MOBILE')}>
              <PhoneAndroidIcon />
              <Typography variant='caption' component='span'>
                Mobile
              </Typography>
            </IconButton>
          </Box>
          <Button autoFocus color='inherit' onClick={handleClose}>
            Cancel
          </Button>
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
