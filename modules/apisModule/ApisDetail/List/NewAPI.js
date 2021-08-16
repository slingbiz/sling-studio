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
require('codemirror/lib/codemirror.css');
require('codemirror/theme/dracula.css'); // Introduce themes on demand
require('codemirror/mode/javascript/javascript.js'); // On demand mode
import {Controlled as CodeMirror} from 'react-codemirror2';
import Body from './Body';

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
    '& .CodeMirror': {
      minHeight: '400px',
    },
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
  const [requestType, setRequestType] = useState('get');
  const [url, setUrl] = useState('');
  const [params, setParams] = useState([{key: '', value: ''}]);
  const [headers, setHeaders] = useState([{key: '', value: ''}]);
  const [code, setCode] = useState(null);
  let object = {};
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
    if (headers[0]?.key) {
      object = headers.reduce(
        (obj, item) => Object.assign(obj, {[item.key]: item.value}),
        {},
      );
      console.log('Object ==> ', object);
    }

    if (auth.value) {
      object[`Authorization`] = `Basic ${auth.value}`;
      console.log('Object  ==> ', object);
    }
  }

  async function sendRequest() {
    await makeUrl();
    await makeRequestHeader();

    axios({method: requestType, url}).then((response) => {
      setCode(JSON.stringify(response.data, null, 2));
    });
  }
  console.log(requestType);

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
              {(requestType === 'post' || requestType === 'put') && (
                <Button
                  variant='text'
                  color='default'
                  onClick={(e) => setTab('BODY')}>
                  Body
                </Button>
              )}
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
              {tab === 'BODY' && <h1>Working on it</h1>}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          {/* <Grid container direction='column'>
            <Grid item xs={12} alignItems='center'> */}
          <Typography
            variant='h6'
            component='h6'
            className={classes.rootContainer}>
            Response
          </Typography>
          <CodeMirror
            className={classes.editor}
            value={code}
            options={{
              mode: {name: 'javascript', json: true}, // string|object
              lineNumbers: true,
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>
    </Dialog>
  );
};
export default NewAPI;
