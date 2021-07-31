import React, {useContext} from 'react';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import UserInfo from '../../../../shared/components/UserInfo';
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
  const {themeMode} = useContext(AppContext);
  const navCollapsed = useSelector(({settings}) => settings.navCollapsed);

  const handleToggleDrawer = () => {
    dispatch(toggleNavCollapsed());
  };

  const classes = useStyles({themeMode});
  return (
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
