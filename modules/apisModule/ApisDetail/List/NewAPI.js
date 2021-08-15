import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import {FormControl, MenuItem, Select, TextField} from '@material-ui/core';
import Params from './Params';
import tabs from '../../../../pages/mui/navigation/tabs';
import Headers from './Headers';
import Authorization from './Authorization';
import axios from 'axios';

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
    paddingTop: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
    display: 'flex',
  },
  rootContainer: {
    padding: '0px',
    margin: '0px',
  },
  selectField: {
    width: '100px !important',
    marginRight: '2px',
  },
  textField: {
    maxWidth: '450px',
    width: '100%',
    marginRight: '10px',
    [theme.breakpoints.down('lg')]: {
      maxWidth: '300px',
    },
  },
  button: {
    width: '80px',
    height: '50px',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const NewAPI = ({open, setOpen, titleKey, pageKey}) => {
  const classes = useStyles();
  const [tab, setTab] = useState('PARAMS');
  const [requestType, setRequestType] = useState('post');
  const [url, setUrl] = useState('');
  const [params, setParams] = useState([{key: '', value: ''}]);
  const [headers, setHeaders] = useState([{key: '', value: ''}]);
  const [auth, setAuth] = useState({key: 'Bearer Token', value: ''});
  const childRef = useRef();

  const handleClose = () => {
    setOpen(false);
  };
  const handleRootSave = () => {
    childRef.current.saveLayoutConfig();
    handleClose();
  };

  function makeUrl() {
    if (params.length === 1 && params[0].key) {
      setUrl(
        (prevUrl) =>
          prevUrl + '?' + params.map((param) => param.key + '=' + param.value),
      );
    } else if (params.length > 1 && params[0].key) {
      setUrl(
        (prevUrl) =>
          prevUrl + '?' + params.map((param) => param.key + '=' + param.value),
      );
    }

    setUrl((prevUrl) => prevUrl.replace(',', '&'));
  }
  function makeRequestHeader() {
    let object = headers.reduce(
      (obj, item) => Object.assign(obj, {[item.key]: item.value}),
      {},
    );
  }

  async function sendRequest() {
    await makeUrl();
    await makeRequestHeader();
    axios({method: requestType, url});
  }
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
            {titleKey}
          </Typography>
          <Button autoFocus color='inherit' onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus color='inherit' onClick={handleRootSave}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12} md={6}>
          <Grid container direction='column'>
            <Grid item alignItems='center'>
              <FormControl variant='outlined' className={classes.selectField}>
                <Select
                  labelId='request-type'
                  id='request-type'
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}>
                  <MenuItem value='get'>Get</MenuItem>
                  <MenuItem value='post'>POST</MenuItem>
                  <MenuItem value='put'>PUT</MenuItem>
                  <MenuItem value='delete'>DELETE</MenuItem>
                </Select>
              </FormControl>
              <TextField
                placeholder='Enter Request URL'
                variant='outlined'
                className={classes.textField}
                value={url}
                onChange={(e) => {
                  console.log(e.target.value);
                  setUrl(e.target.value);
                }}
              />
              <Button
                variant='contained'
                color='primary'
                className={classes.button}
                onClick={sendRequest}>
                Send
              </Button>
            </Grid>
            <Grid
              item
              alignItems='center'
              justify='space-between'
              direction='row'>
              <Button
                variant='text'
                color='default'
                onClick={(e) => setTab('PARAMS')}>
                Params
              </Button>
              <Button
                variant='text'
                color='default'
                onClick={(e) => setTab('AUTHORIZATION')}>
                Authorization
              </Button>
              <Button
                variant='text'
                color='default'
                onClick={(e) => setTab('HEADERS')}>
                Headers
              </Button>
              {/* <Button
                variant='text'
                color='default'
                onClick={(e) => setTab('BODY')}>
                Body
              </Button> */}
            </Grid>
            <Grid item>
              {tab === 'PARAMS' && (
                <Params params={params} setParams={setParams} />
              )}
              {tab === 'AUTHORIZATION' && (
                <Authorization auth={auth} setAuth={setAuth} />
              )}
              {tab === 'HEADERS' && (
                <Headers headers={headers} setHeaders={setHeaders} />
              )}
              {/* {tab === 'BODY' && <Params />} */}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant='h6'
            component='h6'
            className={classes.rootContainer}>
            Response
          </Typography>
        </Grid>
      </Grid>
    </Dialog>
  );
};
export default NewAPI;
