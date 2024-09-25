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
import Grid from '@material-ui/core/Grid';
import {FormControl, MenuItem, Select, TextField} from '@material-ui/core';
import Params from './Params';
import Headers from './Headers';
import Authorization from './Authorization';
import axios from 'axios';
import Body from './Body';
import dynamic from 'next/dynamic';
import orange from '@material-ui/core/colors/orange';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {addApi} from '../../../../redux/actions';
import {useDispatch} from 'react-redux';

const CodeMirror = dynamic(import('../../../../@sling/core/ReactMirror/'), {
  ssr: false,
});

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
      height: '80vh',
      width: '100%',
      overflow: 'hidden',
    },
  },
  rootContainer: {
    padding: '0px',
    marginBottom: 12,
  },
  selectField: {
    width: '100px',
    // marginRight: '2px',
  },
  textField: {
    width: '100%',
    // marginRight: '10px',
    // [theme.breakpoints.down('lg')]: {
    //   maxWidth: '300px',
    // },
  },
  button: {
    width: '100%',
    height: '50px',
    backgroundColor: orange[500],
    color: theme.palette.primary.contrastText,
    fontWeight: Fonts.BOLD,
    paddingRight: 20,
    paddingLeft: 20,
    '&:hover, &:focus': {
      backgroundColor: orange[700],
      color: theme.palette.primary.contrastText,
    },
  },
  reqBtnGrid: {
    marginTop: 25,
  },
  btnTab: {
    marginLeft: 10,
    marginRight: 5,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const NewAPI = ({open, setOpen, titleKey, pageKey}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [tab, setTab] = useState('PARAMS');
  const [requestType, setRequestType] = useState('get');
  const [url, setUrl] = useState('');
  const [urlWithParams, setUrlWithParams] = useState('');
  const [params, setParams] = useState([{key: '', value: ''}]);
  const [headers, setHeaders] = useState([{key: '', value: ''}]);
  const [code, setCode] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  let object = {};
  const [auth, setAuth] = useState({key: 'Bearer Token', value: ''});
  const [data, setData] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRootSave = () => {
    // childRef.current.saveLayoutConfig();
    // alert(2);
    console.log(data, 'data');
    console.log(code, 'code');
    console.log(params, 'params');
    console.log(headers, 'headers');
    console.log(requestType, 'requestType');
    console.log(url, 'url');
    dispatch(addApi({code, params, headers, requestType, url}));
    handleClose();
  };

  const makeUrl = () => {
    if (params.length >= 1 && params[0].key) {
      setUrlWithParams(
        url +
          '?' +
          params.map((param) => param.key && param.key + '=' + param.value),
      );
    } else {
      setUrlWithParams(url);
    }

    setUrlWithParams((prevUrl) => prevUrl.replace(/,([^,]*)$/, ''));
    setUrlWithParams((prevUrl) => prevUrl.replace(',', '&'));
  };

  const makeRequestHeader = () => {
    if (headers[0]?.key) {
      object = headers.reduce(
        (obj, item) => Object.assign(obj, {[item.key]: item.value}),
        {},
      );
    }

    if (auth.key === 'Bearer Token' && auth.value) {
      object[`Authorization`] = `Bearer ${auth.value}`;
    } else if (auth.key === 'API KEY' && auth.value) {
      object[`X-API-KEY`] = `${auth.value}`;
    }
  };

  const sendRequest = async () => {
    setSubmitted(true);
    makeUrl();
    makeRequestHeader();
    let axiosData = JSON.parse(data);
    try {
      const response = await axios({
        method: requestType,
        url,
        headers: object,
        data: axiosData,
      });
      setCode(JSON.stringify(response.data, null, 2));
    } catch (e) {
      setCode(JSON.stringify(e.response.data, null, 2));
    }
  };

  useEffect(() => {
    if (submitted) {
      setSubmitted(false);
    }
  }, [params]);

  //Sets active tab's color
  const getBtnVariant = (curr) => {
    return curr === tab ? 'contained' : 'text';
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
            {titleKey}
          </Typography>
          <Button autoFocus={true} color='inherit' onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus={true} color='inherit' onClick={handleRootSave}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography
            variant='h6'
            component='h6'
            className={classes.rootContainer}>
            Request
          </Typography>
          <Grid container direction='column' spacing={5}>
            <Grid item alignItems='center'>
              <Grid container alignItems='center' spacing={3}>
                <Grid item alignItems='center' xs={2}>
                  <FormControl
                    variant='outlined'
                    className={classes.selectField}>
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
                </Grid>
                <Grid item alignItems='center' xs={8}>
                  <TextField
                    placeholder='Enter Request URL'
                    variant='outlined'
                    className={classes.textField}
                    value={submitted ? urlWithParams : url}
                    onChange={(e) => {
                      if (submitted) {
                        setSubmitted(false);
                      } else {
                        setUrl(e.target.value);
                      }
                    }}
                  />
                </Grid>
                <Grid item alignItems='center' xs={2}>
                  <Button
                    variant='contained'
                    color='primary'
                    className={classes.button}
                    onClick={sendRequest}>
                    Send
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              itemø
              className={classes.reqBtnGrid}
              alignItems='center'
              justify='space-between'
              direction='row'>
              <Button
                className={classes.btnTab}
                variant={getBtnVariant('PARAMS')}
                color='default'
                onClick={(e) => setTab('PARAMS')}>
                Params
              </Button>
              <Button
                className={classes.btnTab}
                variant={getBtnVariant('AUTHORIZATION')}
                color='default'
                onClick={(e) => setTab('AUTHORIZATION')}>
                Authorization
              </Button>
              <Button
                className={classes.btnTab}
                variant={getBtnVariant('HEADERS')}
                color='default'
                onClick={(e) => setTab('HEADERS')}>
                Headers
              </Button>
              {(requestType === 'post' || requestType === 'put') && (
                <Button
                  className={classes.btnTab}
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
              {tab === 'BODY' && <Body data={data} setData={setData} />}
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
          <CodeMirror data={code} readOnly={true} setData={setCode} />
        </Grid>
      </Grid>
    </Dialog>
  );
};
export default NewAPI;
