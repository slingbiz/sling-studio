import React, {useState} from 'react';
import {Button, Grid, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {addRoute} from '../../../../redux/actions';
import AssignPageTemplate from './AssignPageTemplate';
import {useEffect} from 'react';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import {capital} from '../../../../@sling/utility/Utils';

const useStyles = makeStyles((theme) => ({
  typography: {
    margin: '20px 0 10px',
    textAlign: 'left',
    fontSize: '18px',
  },
  typographySub: {
    margin: '0px 0 10px',
    textAlign: 'left',
    fontSize: '18px',
  },
  inputLabel: {
    fontSize: 16,
    paddingLeft: 8,
  },
  input: {
    width: 400,
    border: 'none',
    fontSize: 16,
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 30,
    [theme.breakpoints.down('xs')]: {
      width: 280,
    },
  },
  button: {
    textAlign: 'center',
    width: 100,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  saveButton: {
    textAlign: 'center',
    width: 100,
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
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const re = /\<.*\>/;

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
    if (!pageTemplate.value) {
      setError('Please select a Page Template');
      return;
    }
    let userInput = pattern;
    for (const key in dynamicParams) {
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
        direction='column'
        alignItems='center'
        style={{marginBottom: '2em'}}>
        <Grid item xs={12}>
          <Typography
            component='h5'
            variant='h5'
            className={classes.typography}>
            Add route details
          </Typography>
          <form
            style={{
              background: '#fafafa',
              padding: '20px',
              borderRadius: '5px',
            }}
            onSubmit={re.test(pattern) ? parseUrl : continueWithParse}>
            <Grid item xs={12}>
              <TextField
                variant='standard'
                label='Route Name'
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  // shrink: true,
                  className: classes.inputLabel,
                }}
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
                required
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <TextField
                variant='standard'
                label='Add Pattern'
                style={{marginBottom: '1px'}}
                InputProps={{
                  className: clsx(classes.input),
                }}
                InputLabelProps={{
                  // shrink: true,
                  className: classes.inputLabel,
                }}
                placeholder={'<city>/<category>/<id>-for-sale'}
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                required
                fullWidth
              />
              <Box pl={2} mt={-5}>
                <Typography style={{fontSize: 12}} component='p'>
                  Sample URL Pattern{' '}
                </Typography>
                <Typography style={{fontSize: 10, paddingTop: 1}} component='p'>
                  {
                    '/<category>/my-super-blog-post/   ---->     {props: {category} } '
                  }
                </Typography>
                <Typography style={{fontSize: 10, paddingTop: 1}} component='p'>
                  {
                    '/<category>/<city>/shoes-for-sale     ----->     {props: {category, city} '
                  }
                </Typography>
                <Typography style={{fontSize: 10, paddingTop: 4}} component='p'>
                  {`The values passed inside <> bracket becomes dynamic prop`}
                  <br></br>
                  {`which takes value in the URL and returns in the parent component.`}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} style={{textAlign: 'right'}}>
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
      </Grid>
      {!!Object.entries(dynamicParams).length && (
        <Grid
          container
          justify='center'
          spacing={3}
          direction='column'
          alignItems='center'
          style={{marginBottom: '2em'}}>
          {/*<img src={'/images/down-next-form.png'} alt='Down next arrow' />*/}

          <Grid item xs={12}>
            <Typography
              component='h5'
              variant='h5'
              style={{marginBottom: 0}}
              className={classes.typography}>
              Parsed Dynamic Props
            </Typography>
            <Typography
              component='h6'
              variant='h6'
              className={classes.typographySub}
              style={{fontSize: '12px', fontWeight: 400}}>
              Please add sample default values for the processed props.
            </Typography>

            <form
              onSubmit={openNewModal}
              style={{
                background: '#fafafa',
                padding: '20px',
                borderRadius: '5px',
              }}>
              {Object.entries(dynamicParams).map((item, index) => (
                <Grid
                  item
                  xs={12}
                  className={classes.typographySub}
                  key={index}>
                  <TextField
                    variant='standard'
                    label={capital(item[0])}
                    style={{marginBottom: '1px'}}
                    InputProps={{
                      className: classes.input,
                    }}
                    InputLabelProps={{
                      // shrink: true,
                      className: classes.inputLabel,
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
              <Grid item xs={12} className={classes.typography}>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.saveButton}
                  type='submit'>
                  Next
                </Button>
              </Grid>
            </form>
          </Grid>
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
              Next
            </Button>
          </Grid>
        </Grid>
      )}
      <AssignPageTemplate
        setOpenModal={setOpenModal}
        openModal={openModal}
        value={pageTemplate}
        error={error}
        setValue={setPageTemplate}
        handleSave={handleSave}
      />
    </>
  );
};

export default Basic;
