import React from 'react';
import {Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

const AppLogoWhite = () => {
  const useStyles = makeStyles(() => ({
    logoRoot: {
      display: 'flex',
      flexDirection: 'row',
      cursor: 'pointer',
      alignItems: 'center',
    },
    logo: {
      height: 36,
      marginRight: 10,
    },
  }));
  const classes = useStyles();
  return (
    <Box className={classes.logoRoot}>
      <Hidden smUp>
        <img
          className={classes.logo}
          src={'/images/logo-white.png'}
          alt='crema-logo'
        />
      </Hidden>
      <Hidden xsDown>
        <img
          className={classes.logo}
          src={'/images/logo-white-with-name.png'}
          alt='crema-logo'
        />
      </Hidden>
    </Box>
  );
};

export default AppLogoWhite;
