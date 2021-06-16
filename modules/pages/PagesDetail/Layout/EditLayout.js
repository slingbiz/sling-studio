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
import LayoutView from './LayoutView';
import LayoutSettings from './LayoutSettings';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  boxLayoutView: {padding: '1.5em'},
  // [theme.breakpoints.down('md')]: {
  //   boxLayoutView: {
  //     width: '70%',
  //   },
  // },
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
    height: 28,
    margin: 4,
  },
  textTruncate: {
    padding: '10px 0',
  },
  componentBox: {
    height: '8em',
    width: '100%',
    backgroundColor: 'lightgrey',
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

const EditLayout = ({open, setOpen, titleKey, pageKey}) => {
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
            {titleKey} {' / Edit'}
          </Typography>
          <Button autoFocus color='inherit' onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus color='inherit' onClick={handleRootSave}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item lg={3}>
          <Hidden mdDown>
            <Card
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5em',
                marginTop: '1.5em',
              }}>
              <Box
                component='h4'
                className={classes.textTruncate}
                color='text.primary'
                alignSelf='flex-start'
                fontWeight={Fonts.BOLD}>
                {'Components'}
              </Box>
              <Paper className={classes.root}>
                <InputBase
                  className={classes.input}
                  placeholder='Search Components'
                  inputProps={{'aria-label': 'search components'}}
                />
                <IconButton className={classes.iconButton} aria-label='search'>
                  <SearchIcon />
                </IconButton>
                <Divider className={classes.divider} orientation='vertical' />
              </Paper>
              <Divider style={{marginTop: 15, marginBottom: 15}} />
              <Box>
                {/*<Box*/}
                {/*  component='h6'*/}
                {/*  className={classes.textTruncate}*/}
                {/*  color='text.primary'*/}
                {/*  alignSelf='flex-start'*/}
                {/*  fontWeight={Fonts.BOLD}>*/}
                {/*  {'All'}*/}
                {/*</Box>*/}
                <Box style={{display: 'flex', flexWrap: 'wrap'}}>
                  <Box className={classes.componentBox}>
                    <SearchIcon />
                    <Box
                      component='h6'
                      className={classes.textTruncate}
                      color='text.primary'
                      fontWeight={Fonts.BOLD}>
                      {'Search Bar'}
                    </Box>
                  </Box>
                  <Box className={classes.componentBox}>2</Box>
                  <Box className={classes.componentBox}>3</Box>
                  <Box className={classes.componentBox}>4</Box>
                  <Box className={classes.componentBox}>5</Box>
                </Box>
              </Box>
            </Card>
          </Hidden>
        </Grid>
        <Grid item sm={9} lg={6}>
          <Box className={classes.boxLayoutView}>
            <LayoutView
              ref={childRef}
              pageKey={pageKey}
              isEditable={true}
              key={'edit'}
            />
          </Box>
        </Grid>
        <Grid item sm={3}>
          <Card
            style={{
              padding: '1.5em',
              marginTop: '1.5em',
            }}>
            <LayoutSettings />
          </Card>
        </Grid>
      </Grid>
    </Dialog>
  );
};
export default EditLayout;
