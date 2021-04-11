import React, {useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import {useDispatch} from 'react-redux';
import {
  onCognitoUserSignOut,
  onJWTAuthSignout,
  onSignOutAuth0User,
  onSignOutFirebaseUser,
} from '../../../redux/actions';
import {useAuthUser} from '../../utility/AppHooks';
import AppContext from '../../utility/AppContext';
import {makeStyles} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import {orange} from '@material-ui/core/colors';
import {AuthType, Fonts} from '../../../shared/constants/AppEnums';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => {
  return {
    userRoot: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      justifyContent: 'center',
    },
    avatar: {
      fontSize: 24,
      backgroundColor: orange[500],
    },
    userInfo: {
      width: 'calc(100% - 75px)',
    },
    pointer: {
      cursor: 'pointer',
    },
    userName: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      fontSize: 15,
      fontWeight: Fonts.MEDIUM,
      color: (props) =>
        props.bgType === 'colored' ? 'white' : theme.palette.text.primary,
    },
  };
});

const HorUserInfo = ({bgType = 'colored'}) => {
  const {themeMode} = useContext(AppContext);
  const dispatch = useDispatch();
  const user = useAuthUser();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  console.log('bgType', bgType);

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
  const classes = useStyles({themeMode, bgType});

  return (
    <Box py={2} pl={{xs: 2, sm: 3, md: 5}}>
      <Box className={classes.userRoot} display='flex' onClick={handleClick}>
        {user.photoURL ? (
          <Avatar className={classes.avatar} src={user.photoURL} />
        ) : (
          <Avatar className={classes.avatar}>{getUserAvatar()}</Avatar>
        )}
        <Hidden mdDown>
          <Box ml={3} className={classes.userName}>
            {user.displayName ? user.displayName : user.email}
            <Box fontSize={13} fontWeight={Fonts.LIGHT}>
              System Manager
            </Box>
          </Box>
        </Hidden>
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

export default HorUserInfo;
