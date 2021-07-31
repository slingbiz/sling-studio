import React, {useContext} from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import clsx from 'clsx';
import Navigation from '../../Navigation/VerticleNav';
import {toggleNavCollapsed} from '../../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import useStyles from './AppSidebar.style';
import Scrollbar from '../../Scrollbar';
import AppContext from '../../../utility/AppContext';

const AppSidebar = (props) => {
  const dispatch = useDispatch();
  const navCollapsed = useSelector(({settings}) => settings.navCollapsed);
  const {themeMode} = useContext(AppContext);

  const handleToggleDrawer = () => {
    dispatch(toggleNavCollapsed());
  };

  const classes = useStyles({themeMode});
  let sidebarClasses = classes.sidebarStandard;

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor={props.position}
          open={navCollapsed}
          onClose={(ev) => handleToggleDrawer()}
          classes={{
            root: clsx(props.variant),
            paper: clsx(props.variant),
          }}
          style={{position: 'absolute'}}>
          <Box height='100%' className={classes.miniSidebar}>
            <Box className={clsx(classes.sidebarBg, sidebarClasses)}>
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
        <Box height='100%' className={clsx(classes.miniSidebar, 'app-sidebar')}>
          <Box className={clsx(classes.sidebarBg, sidebarClasses)}>
            <Scrollbar scrollToTop={false} className={classes.scrollAppSidebar}>
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
