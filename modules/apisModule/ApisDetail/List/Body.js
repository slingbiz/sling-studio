import React, {useState} from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import dynamic from 'next/dynamic';
const CodeMirror = dynamic(import('../../../../@sling/core/ReactMirror/'), {
  ssr: false,
});

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
  padding: {
    marginBottom: '20px',
  },
}));
const Body = ({data, setData}) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} direction='column'>
      <Grid item xs={12} justify='space-between' className={classes.padding}>
        <CodeMirror data={data} readOnly={false} setData={setData} />
      </Grid>
    </Grid>
  );
};

export default Body;
