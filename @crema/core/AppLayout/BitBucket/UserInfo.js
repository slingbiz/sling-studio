import React, {useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import {
  onCognitoUserSignOut,
  onJWTAuthSignout,
  onSignOutAuth0User,
  onSignOutFirebaseUser,
} from '../../../../redux/actions';
import {useAuthUser} from '../../../utility/AppHooks';
import AppContext from '../../../utility/AppContext';
import {makeStyles} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import {orange} from '@material-ui/core/colors';
import {AuthType} from '../../../../shared/constants/AppEnums';
import {useDispatch} from 'react-redux';

const useStyles = makeStyles((theme) => {
  return {
    avatar: {
      height: 40,
      width: 40,
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
      color: (props) => (props.themeMode === 'light' ? '#313541' : 'white'),
    },
    pointer: {
      cursor: 'pointer',
    },
  };
});

const UserInfo = (props) => {
  const {themeMode} = useContext(AppContext);
  const dispatch = useDispatch();
  const user = useAuthUser();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUserAvatar = () => {
    if (user.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
  };
  const classes = useStyles({themeMode});

  return (
    <Box py={3} pl={{xs: 2, sm: 6}}>
      <Box className={classes.pointer} onClick={handleClick}>
        {user.photoURL ? (
          <Avatar className={classes.avatar} src={user.photoURL} />
        ) : (
          <Avatar className={classes.avatar}>{getUserAvatar()}</Avatar>
        )}
      </Box>
      <Box className={classes.userInfo}>
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <MenuItem>My account</MenuItem>
          <MenuItem
            onClick={() => {
              if (user && user.authType === AuthType.AWS_COGNITO) {
                dispatch(onCognitoUserSignOut());
              } else if (user && user.authType === AuthType.FIREBASE) {
                dispatch(onSignOutFirebaseUser());
              } else if (user && user.authType === AuthType.AUTH0) {
                dispatch(onSignOutAuth0User());
              } else if (user && user.authType === AuthType.JWT_AUTH) {
                dispatch(onJWTAuthSignout());
              }
            }}>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default UserInfo;
