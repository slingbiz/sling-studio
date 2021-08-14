import React from 'react';
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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
  mainContainer: {
    padding: '5px 10px',
  },
  border: {
    border: '1px solid #cccccc',
    padding: '5px 10px',
  },
  border2: {
    border: '1px solid #cccccc',
    padding: '5px 10px',
    backgroundColor: '#fefefe',
  },
  input: {
    height: 20,
    width: '100%',
    outline: 'none',
    border: 'none',
    padding: '5px',
  },
  btn: {
    background: 'none',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px 10px',
    borderRadius: '3px',
    '&:hover': {
      backgroundColor: '#eeeeee',
    },
  },
}));
const Params = ({params, setParams}) => {
  const classes = useStyles();
  const updateFieldChanged = (index) => (e) => {
    console.log('index: ' + index);
    console.log('property name: ' + e.target.name);
    let newArr = [...datas];
    newArr[index] = e.target.value;
    setParams(newArr);
  };

  const handleClick = () => {
    setParams((prevParam) => setParams([...prevParam, {key: '', value: ''}]));
  };
  return (
    <Grid container className={classes.root} direction='column'>
      <Grid item xs={12} justify='space-between'>
        <Grid container className={classes.mainContainer}>
          <Grid item xs={4} className={classes.border}>
            <Typography variant='span' component='span'>
              Key
            </Typography>
          </Grid>
          <Grid item xs={4} className={classes.border}>
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
              <input
                placeholder='Key'
                className={classes.input}
                value={item.key}
                onChange={updateFieldChanged(index)}
              />
            </Grid>
            <Grid item xs={4} className={classes.border2}>
              <input placeholder='Value' className={classes.input} />
            </Grid>
            <Grid item xs={4} className={classes.border2}>
              <button className={classes.btn}>Remove</button>
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={6} md={3}>
        <Button variant='text' color='inherit' fullWidth onClick={handleClick}>
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

export default Params;
