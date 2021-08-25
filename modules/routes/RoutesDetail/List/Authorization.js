import React from 'react';
import {
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
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
  mainContainer: {
    padding: '20px 10px',
  },
  padding: {
    padding: '5px 10px',
  },
  border2: {
    border: '1px solid #cccccc',
    // padding: '5px 10px',
    backgroundColor: '#fefefe',
  },
  input: {
    height: 20,
    width: '100%',
    outline: 'none',
    border: 'none',
    padding: '5px',
  },
  selectRoot: {
    width: 70,
    height: 20,
    border: 'none',
    display: 'table',
  },
  select: {
    width: 70,
    height: 20,
    border: 'none',
    paddingTop: 0,
    paddingBottom: 0,
    display: 'table-cell',
    verticalAlign: 'middle',
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
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtAuth: {},
}));
const Authorization = ({auth, setAuth}) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} direction='column'>
      {/* <Grid item xs={12} justify='space-between'>
        <Grid container className={classes.mainContainer}>
          <Grid item xs={4} className={classes.padding}>
            <Typography variant='span' component='span'>
              Auth Type
            </Typography>
          </Grid>
          <Grid item xs={8} className={classes.padding}>
            <Typography variant='span' component='span'>
              Value
            </Typography>
          </Grid>
        </Grid>
      </Grid> */}
      <Grid item xs={12} justify='space-between'>
        <Grid
          container
          className={classes.mainContainer}
          direction='column'
          spacing={5}>
          <Grid item xs={12}>
            <FormControl variant='outlined'>
              <RadioGroup
                aria-label='auth'
                name='Authorization'
                value={auth.key}
                onChange={(e) => setAuth({...auth, key: e.target.value})}
                row
                style={{minWidth: '250px'}}>
                <FormControlLabel
                  value='Bearer Token'
                  control={<Radio color='primary' />}
                  label='Bearer Token'
                />
                <FormControlLabel
                  value='API Key'
                  control={<Radio color='primary' />}
                  label='API Key'
                />
              </RadioGroup>
              {/* <TextField
                variant='outlined'
                select
                InputLabelProps={{
                  shrink: true,
                }}
                SelectProps={{
                  classes: {
                    root: classes.selectRoot,
                    select: classes.select,
                  },
                }}
                value={auth.key}
                onChange={(e) => setAuth({...auth, key: e.target.value})}>
                <MenuItem value='Bearer Token'>Bearer Tokem</MenuItem>
                <MenuItem value='API KEY'>API Key</MenuItem>
              </TextField> */}
            </FormControl>
          </Grid>
          <Grid item xs={12} className={classes.border2}>
            <TextField
              ml={10}
              className={classes.txtAuth}
              variant='standard'
              placeholder={auth.key}
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              value={auth.value}
              onChange={(e) => setAuth({...auth, value: e.target.value})}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Authorization;
