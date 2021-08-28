import React, {useState} from 'react';
import {Button, Grid, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {addRoute} from '../../../../redux/actions';
import Modal from './Modal';
import {useEffect} from 'react';

const useStyles = makeStyles((theme) => ({
  typography: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
  input: {
    width: 400,
    border: 'none',
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    [theme.breakpoints.down('xs')]: {
      width: 280,
    },
  },
  button: {
    textAlign: 'center',
    width: 150,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  saveButton: {
    textAlign: 'center',
    width: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));
const Basic = ({setOpen, apiObj}) => {
  const classes = useStyles();
  const [routeName, setRouteName] = useState('');
  const [pattern, setPattern] = useState('');
  const [dynamicParams, setDynamicParams] = useState({});
  const [isDynamic, setIsDynamic] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [pageTemplate, setPageTemplate] = useState('');
  const dispatch = useDispatch();
  var re = /\<.*\>/;

  useEffect(() => {
    if (apiObj) {
      setRouteName(apiObj.type);
      setPattern(apiObj.url_string);
      setIsDynamic(apiObj.type === 'dynamic' ? true : false);
      setPageTemplate(apiObj.page_template);
    }
  }, []);

  function parseUrl(event) {
    event.preventDefault();
    setIsDynamic(true);
    let matches = pattern.match(/<.+?>/g);
    const newArray = matches.map((match) => match.replace(/[<>]/g, ''));
    let object = {};
    newArray.map((item, index) => {
      object[item] = '';
    });
    setDynamicParams(object);
  }
  function continueWithParse(event) {
    event.preventDefault();
    setDynamicParams({});
    setIsDynamic(false);
  }

  function openNewModal(event) {
    event.preventDefault();
    setOpenModal(true);
  }
  function handleSave() {
    let userInput = pattern;
    for (var key in dynamicParams) {
      userInput = userInput.replace('<' + key + '>', dynamicParams[key]);
    }

    setPattern(userInput);
    dispatch(
      addRoute({
        name: routeName,
        keys: Object.keys(dynamicParams),
        page_template: pageTemplate.value,
        sample_string: userInput,
        url: pattern,
      }),
    );
    setOpenModal(false);
    setOpen(false);
  }
  return (
    <>
      <Grid
        container
        justify='center'
        spacing={3}
        direction='column'
        alignItems='center'>
        <Grid item xs={12}>
          <Typography
            component='h5'
            variant='h5'
            className={classes.typography}>
            Add New Route
          </Typography>
        </Grid>
        <form onSubmit={re.test(pattern) ? parseUrl : continueWithParse}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              variant='standard'
              label='Route Name'
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              variant='standard'
              label='Add Pattern'
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              type='submit'>
              {re.test(pattern) ? 'Parse' : 'Continue'}
            </Button>
          </Grid>
        </form>
      </Grid>
      {!!Object.entries(dynamicParams).length && (
        <Grid
          container
          justify='center'
          spacing={3}
          direction='column'
          alignItems='center'>
          <form onSubmit={openNewModal}>
            {Object.entries(dynamicParams).map((item, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                className={classes.typography}
                key={index}>
                <TextField
                  variant='standard'
                  label={item[0]}
                  InputProps={{
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={dynamicParams[item[1]]}
                  onChange={(e) =>
                    setDynamicParams({
                      ...dynamicParams,
                      [item[0]]: e.target.value,
                    })
                  }
                  required
                  fullWidth
                />
              </Grid>
            ))}
            <Grid item xs={12} sm={6} md={4} className={classes.typography}>
              <Button
                variant='contained'
                color='primary'
                className={classes.saveButton}
                type='submit'>
                Save
              </Button>
            </Grid>
          </form>
        </Grid>
      )}
      {!isDynamic && (
        <Grid
          container
          justify='center'
          spacing={3}
          direction='column'
          alignItems='center'>
          <Typography
            component='h5'
            variant='h5'
            className={classes.typography}>
            No Dynamic Params Found
          </Typography>
          <Grid item xs={12} sm={6} md={4} className={classes.typography}>
            <Button
              variant='contained'
              color='primary'
              className={classes.saveButton}
              onClick={openNewModal}>
              Save
            </Button>
          </Grid>
        </Grid>
      )}
      <Modal
        setOpenModal={setOpenModal}
        openModal={openModal}
        value={pageTemplate}
        setValue={setPageTemplate}
        handleSave={handleSave}
      />
    </>
  );
};

export default Basic;