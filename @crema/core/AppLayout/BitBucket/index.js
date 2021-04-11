import React, {useContext, useState} from 'react';
import AppSidebar from './AppSidebar';
import {AppContext, ContentView, ThemeSetting} from '../../../index';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import AppHeader from './AppHeader';
import clsx from 'clsx';
import useStyles from './index.style';
import {LayoutType} from '../../../../shared/constants/AppEnums';

const BitBucket = (props) => {
  const [isCollapsed, setCollapsed] = useState(false);
  const {layoutType, footer} = useContext(AppContext);
  const classes = useStyles({footer});

  return (
    <Box
      className={clsx(
        classes.appMain,
        layoutType === LayoutType.BOXED ? classes.boxedLayout : '',
        {
          bitBucketCollapsed: isCollapsed,
        },
      )}>
      <Hidden lgUp>
        <AppHeader />
      </Hidden>
      <AppSidebar isCollapsed={isCollapsed} setCollapsed={setCollapsed} />
      <Box className={classes.mainContent}>
        <Hidden mdDown>
          <Box className={classes.mainContainer}>
            <ContentView>{props.children}</ContentView>
          </Box>
        </Hidden>

        <Hidden lgUp>
          <Box className={classes.mainContainerFull}>
            <ContentView>{props.children}</ContentView>
          </Box>
        </Hidden>
      </Box>
      <ThemeSetting />
    </Box>
  );
};

export default BitBucket;
