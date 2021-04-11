import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {orange} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';
import PropTypes from 'prop-types';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

const useStyles = makeStyles((theme) => {
  return {
    profilePic: {
      height: 45,
      width: 45,
      fontSize: 24,
      backgroundColor: orange[500],
      [theme.breakpoints.up('xl')]: {
        height: 55,
        width: 55,
      },
    },
    userInfo: {
      width: 'calc(100% - 75px)',
    },
    userName: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: 16,
      fontWeight: Fonts.MEDIUM,
      marginBottom: 2,
    },
    pointer: {
      cursor: 'pointer',
    },
    adminRoot: {
      color: theme.palette.text.secondary,
      fontSize: 14,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    avatarRoot: {
      position: 'relative',
    },
    userStatus: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      zIndex: 1,
      width: 14,
      height: 14,
      borderRadius: '50%',
      border: `1px solid white`,
      [theme.breakpoints.up('xl')]: {
        width: 16,
        height: 16,
      },
    },
  };
});

const UserInfo = ({user, showStatus}) => {
  const getUserAvatar = () => {
    const name = user.displayName || user.name;
    if (name) {
      return name.charAt(0).toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
  };

  const classes = useStyles();

  if (!user) {
    return null;
  }
  return (
    <Box display='flex' alignItems='center'>
      <Box className={classes.avatarRoot}>
        {user.photoURL || user.image ? (
          <Avatar
            className={classes.profilePic}
            src={user.photoURL || user.image}
          />
        ) : (
          <Avatar className={classes.profilePic}>{getUserAvatar()}</Avatar>
        )}
        {showStatus && (
          <Box
            className={classes.userStatus}
            bgcolor={user.status === 'online' ? green[600] : red[600]}
          />
        )}
      </Box>
      <Box ml={4} className={clsx(classes.userInfo, 'user-info')}>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Box className={clsx(classes.userName)}>
            {user.displayName || user.name
              ? user.displayName || user.name
              : user.email}
          </Box>
        </Box>
        <Box className={classes.adminRoot}>
          {user.status ? user.status : 'Online'}
        </Box>
      </Box>
    </Box>
  );
};

export default UserInfo;

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};
