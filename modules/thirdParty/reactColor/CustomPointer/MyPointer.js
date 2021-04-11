import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core/styles';

export const MyPointer = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: 40,
      height: 40,
    },
  }));
  const classes = useStyles(props);
  return (
    <IconButton className={classes.root}>
      <i className='zmdi zmdi-colorize' />
    </IconButton>
  );
};

export default MyPointer;
