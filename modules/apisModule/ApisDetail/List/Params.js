import React from 'react';
import {Button, Grid, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiInput-underline:before': {
      border: 'none',
    },
    '& .MuiInput-underline:after': {
      borderBottom: 'none',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: 'none',
    },
  },
  addBtn: {
    marginTop: 20,
    marginLeft: 10,
    width: '50%',
    border: '1px solid #d6cdc185',
  },
  mainContainer: {
    padding: '5px 10px',
  },
  padding: {
    padding: '5px 10px',
  },
  border2: {
    border: '1px solid #cccccc',
    padding: '5px 10px',
    backgroundColor: '#fefefe',
  },
  paramBtnGrid: {
    padding: '10px 10px',
    display: 'flex',
  },
  input: {
    // height: 20,
    // fontSize: 14,
    width: '100%',
    outline: 'none',
    border: 'none',
    padding: '5px',
  },
  btn: {
    // height: 20,
    // background: 'none',
    outline: 'none',
    marginLeft: 15,
    border: '1px solid #d6cdc185',
    cursor: 'pointer',
    padding: '5px 20px',
    borderRadius: '3px',
    '&:hover': {
      backgroundColor: '#eeeeee',
    },
  },
}));
const Params = ({params, setParams}) => {
  const classes = useStyles();
  const updateParamsKey = (index) => (e) => {
    let newArr = [...params];
    newArr[index].key = e.target.value;
    setParams(newArr);
  };
  const updateParamsValue = (index) => (e) => {
    let newArr = [...params];
    newArr[index].value = e.target.value;
    setParams(newArr);
  };

  const handleClick = () => {
    if (params[params.length - 1].key && params[params.length - 1].value) {
      setParams((prevParam) => setParams([...prevParam, {key: '', value: ''}]));
    }
  };

  function handleRemove(index) {
    setParams(params.filter((param, id) => id !== index));
  }
  return (
    <Grid container className={classes.root} direction='column'>
      <Grid item xs={12} justify='space-between'>
        <Grid container className={classes.mainContainer}>
          <Grid item xs={4} className={classes.padding}>
            <Typography variant='span' component='span'>
              Key
            </Typography>
          </Grid>
          <Grid item xs={4} className={classes.padding}>
            <Typography variant='span' component='span'>
              Value
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='span' component='span'></Typography>
          </Grid>
        </Grid>
      </Grid>
      {params?.map((item, index) => (
        <Grid item xs={12} justify='space-between' key={index}>
          <Grid container className={classes.mainContainer}>
            <Grid item xs={4} className={classes.border2}>
              <TextField
                variant='standard'
                placeholder='Key'
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={item.key}
                onChange={updateParamsKey(index)}
              />
            </Grid>
            <Grid item xs={4} className={classes.border2}>
              <TextField
                variant='standard'
                placeholder='Value'
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={item.value}
                onChange={updateParamsValue(index)}
              />
            </Grid>
            <Grid item xs={4} className={classes.paramBtnGrid}>
              <Button
                // variant={'contained'}
                color='default'
                className={classes.btn}
                onClick={() => handleRemove(index)}
                disabled={params.length <= 1}>
                Remove
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={6} md={3}>
        <Button
          variant='text'
          color='inherit'
          className={classes.addBtn}
          onClick={handleClick}>
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

export default Params;
