import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import clsx from 'clsx';
import LanguageSwitcher from '../../LanguageSwitcher';
import {toggleNavCollapsed} from '../../../../redux/actions';
import {useDispatch} from 'react-redux';
import Hidden from '@material-ui/core/Hidden';
import HorizontalNav from '../../Navigation/HorizontalNav';
import Box from '@material-ui/core/Box';
import useStyles from './AppHeader.style';
import SearchBar from '../../SearchBar';
import NotificationBar from './NotificationBar';
import HeaderMessages from '../../HeaderMessages';
import Notifications from '../../Notifications';
import HorUserInfo from '../HorUserInfo';
import AppLogoWhite from '../../../../shared/components/AppLogoWhite';

const AppHeader = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem className={classes.menuItemRoot}>
        <HeaderMessages />
      </MenuItem>
      <MenuItem className={classes.menuItemRoot}>
        <Notifications />
      </MenuItem>
      <LanguageSwitcher />
    </Menu>
  );

  return (
    <>
      <AppBar position='relative'>
        <NotificationBar />
        <Toolbar className={classes.headerMain}>
          <Box className={classes.headerContainer}>
            <Box className={classes.headerMainFlex}>
              <Hidden lgUp>
                <IconButton
                  edge='start'
                  className={classes.menuButton}
                  color='inherit'
                  aria-label='open drawer'
                  onClick={() => dispatch(toggleNavCollapsed())}>
                  <MenuIcon className={classes.menuIconRoot} />
                </IconButton>
              </Hidden>

              <AppLogoWhite />
              <Box className={classes.grow} />
              <SearchBar />
              <Box className={clsx(classes.sectionDesktop)}>
                <LanguageSwitcher />
                <HeaderMessages />
                <Notifications />
              </Box>

              <HorUserInfo />
              <Box ml={1} className={classes.sectionMobile}>
                <IconButton
                  aria-label='show more'
                  aria-controls={mobileMenuId}
                  aria-haspopup='true'
                  onClick={handleMobileMenuOpen}
                  color='inherit'>
                  <MoreIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Toolbar>
        <Hidden mdDown>
          <Box className={classes.headerNav}>
            <Box className={classes.headerContainer}>
              <HorizontalNav />
            </Box>
          </Box>
        </Hidden>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};
export default AppHeader;
