import React, {useContext} from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import clsx from 'clsx';
import UserInfo from '../../../../shared/components/UserInfo';
import Navigation from '../../Navigation/VerticleNav';
import {toggleNavCollapsed} from '../../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import AppContext from '../../../utility/AppContext';
import useStyles from './AppSidebar.style';
import {ThemeStyle} from '../../../../shared/constants/AppEnums';
import Scrollbar from '../../Scrollbar';

const AppSidebar = (props) => {
  const {themeStyle, themeMode} = useContext(AppContext);

  const dispatch = useDispatch();
  const navCollapsed = useSelector(({settings}) => settings.navCollapsed);

  const handleToggleDrawer = () => {
    dispatch(toggleNavCollapsed());
  };

  const classes = useStyles({themeStyle, themeMode});
  let sidebarClasses = classes.sidebarModern;
  if (themeStyle === ThemeStyle.STANDARD) {
    sidebarClasses = classes.sidebarStandard;
  }

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor={props.position}
          open={navCollapsed}
          onClose={() => handleToggleDrawer()}
          classes={{
            root: clsx(props.variant),
            paper: clsx(props.variant),
          }}
          style={{position: 'absolute'}}>
          <Box height='100%' className={classes.drawerContainer}>
            <Box
              height='100%'
              width='100%'
              color='primary.contrastText'
              className={classes.sidebarBg}>
              <UserInfo />
              <Scrollbar
                scrollToTop={false}
                className={classes.drawerScrollAppSidebar}>
                <Navigation />
              </Scrollbar>
            </Box>
          </Box>
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Box height='100%' className={classes.container}>
          <Box className={clsx(classes.sidebarBg, sidebarClasses)}>
            <UserInfo />
            <Scrollbar
              scrollToTop={false}
              className={clsx(classes.scrollAppSidebar, 'scrollAppSidebar')}>
              <Navigation />
            </Scrollbar>
          </Box>
        </Box>
      </Hidden>
    </>
  );
};

export default AppSidebar;

AppSidebar.defaultProps = {
  variant: '',
  position: 'left',
};

AppSidebar.propTypes = {
  position: PropTypes.string,
  variant: PropTypes.string,
  isCollapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
};
