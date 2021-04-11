import React from 'react';
import Grid from '@material-ui/core/Grid';
import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import TemporaryDrawer from './TemporaryDrawer';
// eslint-disable-next-line import/no-webpack-loader-syntax
import TemporaryDrawerSource from '!raw-loader!./TemporaryDrawer';
import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SwipeableTemporaryDrawerSource from '!raw-loader!./SwipeableTemporaryDrawer';
import ResponsiveDrawer from './ResponsiveDrawer';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ResponsiveDrawerSource from '!raw-loader!./ResponsiveDrawer';
import PersistentDrawer from './PersistentDrawer';
// eslint-disable-next-line import/no-webpack-loader-syntax
import PersistentDrawerSource from '!raw-loader!./PersistentDrawer';
import PersistentDrawerRight from './PersistentDrawerRight';
// eslint-disable-next-line import/no-webpack-loader-syntax
import PersistentDrawerRightSource from '!raw-loader!./PersistentDrawerRight';
import MiniDrawer from './MiniDrawer';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MiniDrawerSource from '!raw-loader!./MiniDrawer';
import PermanentDrawer from './PermanentDrawer';
// eslint-disable-next-line import/no-webpack-loader-syntax
import PermanentDrawerSource from '!raw-loader!./PermanentDrawer';
import FullHeightNavigationRight from './FullHeightNavigationRight';
// eslint-disable-next-line import/no-webpack-loader-syntax
import FullHeightNavigationRightSource from '!raw-loader!./FullHeightNavigationRight';
import ClippedUnderAappbar from './ClippedUnderAappbar';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ClippedUnderAappbarSource from '!raw-loader!./ClippedUnderAappbar';

const Drawers = () => {
  return (
    <>
      <ComponentHeader
        title='Drawer'
        description='Navigation drawers provide access to destinations in your app. Side sheets are surfaces containing supplementary content that are anchored to the left or right edge of the screen'
        refUrl='https://material-ui.com/components/drawers/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Temporary drawer'
            component={TemporaryDrawer}
            source={TemporaryDrawerSource}
            description='Temporary navigation drawers can toggle open or closed. Closed by default, the drawer opens temporarily above all other content until a section is selected.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Swipeable Temporary drawer'
            component={SwipeableTemporaryDrawer}
            source={SwipeableTemporaryDrawerSource}
            description='You can make the drawer swipeable with the SwipeableDrawer component.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Responsive drawer'
            component={ResponsiveDrawer}
            source={ResponsiveDrawerSource}
            description='The Hidden responsive helper component allows showing different types of drawer depending on the screen width. A temporary drawer is shown for small screens while a permanent drawer is shown for wider screens.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Persistent drawer'
            component={PersistentDrawer}
            source={PersistentDrawerSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Persistent drawer Right'
            component={PersistentDrawerRight}
            source={PersistentDrawerRightSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Mini variant drawer'
            component={MiniDrawer}
            source={MiniDrawerSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Permanent drawer'
            component={PermanentDrawer}
            source={PermanentDrawerSource}
            description='Permanent navigation drawers are always visible and pinned to the left edge, at the same elevation as the content or background. They cannot be closed.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Full Height Navigation Right'
            component={FullHeightNavigationRight}
            source={FullHeightNavigationRightSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Clipped under the app bar'
            component={ClippedUnderAappbar}
            source={ClippedUnderAappbarSource}
            description='Apps focused on productivity that require balance across the screen'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Drawers;
