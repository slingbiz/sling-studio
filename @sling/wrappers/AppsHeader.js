import React from 'react';
import {Box} from '@material-ui/core';
import {grey} from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import NotificationBar from '../core/AppLayout/HorDefault/NotificationBar';

const useStyles = makeStyles((theme) => ({
  appHeader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${grey[300]}`,
    // [theme.breakpoints.up('xl')]: {
    //   height: 77,
    // },
  },
  checkboxRoot: {
    marginRight: 8,
  },
  pointer: {
    cursor: 'pointer',
  },
}));

const AppsHeader = ({children}) => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent={'center'}
        width={'auto'}
        asdf={'asdf'}
        alignItems='baseline'
        flexDirection='row'
        px={6}
        className={classes.appHeader}>
        {children}
      </Grid>
    </>
  );
};

export default AppsHeader;
AppsHeader.defaultProps = {};
