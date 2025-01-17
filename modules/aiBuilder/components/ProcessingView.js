import React from 'react';
import {Box, Typography, CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  processingView: {
    textAlign: 'center',
    padding: theme.spacing(4),
  },
}));

const ProcessingView = () => {
  const classes = useStyles();
  
  return (
    <Box className={classes.processingView}>
      <CircularProgress size={60} />
      <Typography variant='h6' style={{marginTop: 16}}>
        Processing your request...
      </Typography>
    </Box>
  );
};

export default ProcessingView;
