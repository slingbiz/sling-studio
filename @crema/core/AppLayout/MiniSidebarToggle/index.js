import React, {useContext} from 'react';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import {ContentView, ThemeSetting} from '../../../index';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import useStyles from './index.style';
import AppFixedFooter from './AppFixedFooter';
import AppContext from '../../../utility/AppContext';
import clsx from 'clsx';
import {LayoutType} from '../../../../shared/constants/AppEnums';

const MiniSidebarToggle = (props) => {
  const {footer, themeStyle, layoutType, footerType} = useContext(AppContext);
  const classes = useStyles({footer, themeStyle});

  return (
    <Box
      className={clsx(
        classes.appMain,
        layoutType === LayoutType.BOXED ? classes.boxedLayout : '',
        {
          appMainFooter: footer && footerType === 'fluid',
          appMainFixedFooter: footer && footerType === 'fixed',
        },
      )}>
      <AppSidebar />

      <Box className={clsx(classes.mainContent, 'main-content')}>
        <Hidden mdDown>
          <Box className={classes.mainContainer}>
            <AppHeader />
            <ContentView>{props.children}</ContentView>
            <AppFixedFooter />
          </Box>
        </Hidden>

        <Hidden lgUp>
          <Box className={classes.mainContainerFull}>
            <AppHeader />
            <ContentView>{props.children}</ContentView>
            <AppFixedFooter />
          </Box>
        </Hidden>
      </Box>
      <ThemeSetting />
    </Box>
  );
};

export default MiniSidebarToggle;
