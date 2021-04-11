import React, {useContext} from 'react';
import AppHeader from './AppHeader';
import {ContentView, ThemeSetting} from '../../../index';
import Box from '@material-ui/core/Box';
import useStyles from './index.style';
import clsx from 'clsx';
import AppFooter from './AppFooter';
import AppFixedFooter from './AppFixedFooter';
import AppContext from '../../../utility/AppContext';
import AppSidebar from './AppSidebar';
import {LayoutType} from '../../../../shared/constants/AppEnums';

const HorDefault = (props) => {
  const {footer, layoutType, footerType} = useContext(AppContext);
  const classes = useStyles(props);

  return (
    <Box
      className={clsx(
        classes.appMain,
        'appMainHor',
        layoutType === LayoutType.BOXED ? classes.boxedLayout : '',
        {
          appMainFooter: footer && footerType === 'fluid',
          appMainFixedFooter: footer && footerType === 'fixed',
        },
      )}>
      <AppHeader />
      <Box className={classes.mainContent}>
        <AppSidebar />
        <Box className={classes.mainContainer}>
          <ContentView>{props.children}</ContentView>
        </Box>
      </Box>
      <ThemeSetting />
      <AppFooter />
      <AppFixedFooter />
    </Box>
  );
};

export default HorDefault;
