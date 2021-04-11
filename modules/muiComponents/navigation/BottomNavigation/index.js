import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import SimpleBottomNavigation from './SimpleBottomNavigation';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleBottomNavigationSource from '!raw-loader!./SimpleBottomNavigation';
import NoLabelBottomNavigation from './NoLabelBottomNavigation';
// eslint-disable-next-line import/no-webpack-loader-syntax
import NoLabelBottomNavigationSource from '!raw-loader!./NoLabelBottomNavigation';

const BottomNavigations = () => {
  return (
    <>
      <ComponentHeader
        title='Bottom Navigation'
        description='Bottom navigation bars allow movement between primary destinations in an app.'
        refUrl='https://material-ui.com/components/bottom-navigation/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Bottom Navigation'
            component={SimpleBottomNavigation}
            source={SimpleBottomNavigationSource}
            description='When there are only three actions, display both icons and text labels at all times.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Bottom Navigation with no label'
            component={NoLabelBottomNavigation}
            source={NoLabelBottomNavigationSource}
            description='If there are four or five actions, display inactive views as icons only.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default BottomNavigations;
