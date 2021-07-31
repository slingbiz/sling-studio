import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import SmsIcon from '@material-ui/icons/Sms';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import LanguageSwitcher from '../../LanguageSwitcher';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  bucketMinibar: {
    width: '3.3rem',
    backgroundColor: theme.palette.sidebar.bgColor,
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.up('xl')]: {
      width: '4.3rem',
    },
  },
  bucketMiniBtn: {
    padding: 16,
    flexDirection: 'column',
    color: 'white',
  },
  iconBtn: {
    flexDirection: 'column',
    color: 'white',
  },
  icon: {
    fontSize: 20,
    [theme.breakpoints.up('xl')]: {
      fontSize: 30,
    },
  },
  logoRoot: {
    cursor: 'pointer',
    width: 30,
    marginLeft: 5,
  },
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles(props);

  return (
    <Box
      borderRight={1}
      borderColor='grey.100'
      className={clsx(classes.bucketMinibar, '')}>
      <Box>
        <IconButton
          className={classes.iconBtn}
          aria-label='show 17 new notifications'>
          <img
            className={classes.logoRoot}
            src={'/images/logo-icon-large.png'}
            alt='crema-logo'
          />
        </IconButton>

        <IconButton
          className={clsx(classes.bucketMiniBtn, '')}
          aria-label='show 17 new notifications'>
          <SearchIcon className={classes.icon} />
        </IconButton>
        <LanguageSwitcher iconOnly={true} />
        <IconButton
          className={classes.bucketMiniBtn}
          aria-label='show 4 new mails'>
          <SmsIcon className={classes.icon} />
        </IconButton>
        <IconButton
          className={classes.bucketMiniBtn}
          aria-label='show 17 new notifications'>
          <NotificationsActiveIcon className={classes.icon} />
        </IconButton>
      </Box>
      <Box mt='auto'>
        <IconButton className={classes.bucketMiniBtn}>
          <SettingsIcon className={classes.icon} />
        </IconButton>
      </Box>
    </Box>
  );
}
