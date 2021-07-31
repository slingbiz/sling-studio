import React from 'react';
import {Box, makeStyles} from '@material-ui/core';
import {grey} from '@material-ui/core/colors/index';

const useStyles = makeStyles((theme) => ({
  tableResponsiveMaterial: {
    minHeight: '.01%',
    overflowX: 'auto',
    '& > thead > tr > th, > tbody > tr > th, > tfoot > tr > th, thead > tr > td, tbody > tr > td, tfoot > tr > td': {
      whiteSpace: 'nowrap',
    },
    '@media (max-width: 767px)': {
      width: '100%',
      marginBottom: 15,
      overflowY: 'hidden',
      border: `1px solid ${grey[300]}`,
      '& > table': {
        marginBottom: 0,
      },
    },
  },
}));

const AppTableContainer = ({children}) => {
  const classes = useStyles();

  return <Box className={classes.tableResponsiveMaterial}>{children}</Box>;
};

export default AppTableContainer;
