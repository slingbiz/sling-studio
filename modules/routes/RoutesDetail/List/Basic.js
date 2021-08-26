import React, {useState} from 'react';
import {Button, Grid, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  typography: {
    textAlign: 'center',
  },
  input: {
    width: 350,
    border: 'none',
    padding: '5px',
    marginLeft: '5px',
    marginRight: '5px',
  },
  button: {
    textAlign: 'center',
    width: 150,
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
const Basic = ({setOpen}) => {
  const classes = useStyles();
  const [routeName, setRouteName] = useState('');
  const [pattern, setPattern] = useState('');
  const [dynamicParams, setDynamicParams] = useState({});
  const [isDynamic, setIsDynamic] = useState(true);
  var re = /\<.*\>/;

  function parseUrl() {
    let matches = pattern.match(/<.+?>/g);
    const newArray = matches.map((match) => match.replace(/[<>]/g, ''));
    let object = {};
    newArray.map((item, index) => {
      object[item] = '';
    });
    setDynamicParams(object);
  }
  function continueWithParse() {
    setDynamicParams({});
    setIsDynamic(false);
  }

  function handleSave() {
    let userInput = pattern;
    for (var key in dynamicParams) {
      userInput = userInput.replace('<' + key + '>', dynamicParams[key]);
    }
    setPattern(userInput);
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
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            variant='standard'
            placeholder='Route Name'
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            variant='standard'
            placeholder='Add Pattern'
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} className={classes.typography}>
          {re.test(pattern) ? (
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              onClick={parseUrl}>
              Parse
            </Button>
          ) : (
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              onClick={continueWithParse}>
              Continue
            </Button>
          )}
        </Grid>
      </Grid>
      {!!Object.entries(dynamicParams).length && (
        <Grid
          container
          justify='center'
          spacing={3}
          direction='column'
          alignItems='center'>
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
                fullWidth
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4} className={classes.typography}>
            <Button
              variant='contained'
              color='primary'
              className={classes.saveButton}
              onClick={handleSave}>
              Save
            </Button>
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
              onClick={handleSave}>
              Save
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Basic;
