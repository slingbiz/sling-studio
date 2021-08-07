import React, {useContext} from 'react';
import {Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import AppContext from '../../../@sling/utility/AppContext';
import {ThemeMode} from '../../constants/AppEnums';
import Hidden from '@material-ui/core/Hidden';
import Link from 'next/link';

const AppLogo = () => {
  const {themeMode} = useContext(AppContext);
  const useStyles = makeStyles(() => ({
    logoRoot: {
      display: 'flex',
      flexDirection: 'row',
      cursor: 'pointer',
      alignItems: 'center',
    },
    logo: {
      height: 36,
      // marginRight: 10,
    },
  }));
  const classes = useStyles();
  return (
    <Box className={classes.logoRoot}>
      <Hidden smUp>
        <img
          className={classes.logo}
          src={
            themeMode === ThemeMode.DARK
              ? `${process.env.basePath}/images/logo.png`
              : `${process.env.basePath}/images/logo.png`
          }
          alt='sling-logo'
        />
      </Hidden>
      <Hidden xsDown>
        <Link href='/'>
          <img
            className={classes.logo}
            src={
              themeMode === ThemeMode.DARK
                ? `${process.env.basePath}/images/sling-fe.png`
                : `${process.env.basePath}/images/sling-fe.png`
            }
            alt='Sling Frontend Demo'
          />
        </Link>
      </Hidden>
      <Box
        color='text.secondary'
        fontSize={16}
        fontWeight={500}
        ml={2}
        mt={4}
        mb={3}>
        Demo
      </Box>
    </Box>
  );
};

export default AppLogo;
