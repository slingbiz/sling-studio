import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import SimpleToggle from './SimpleToggle';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleToggleSource from '!raw-loader!./SimpleToggle';
import ToggleSizes from './ToggleSizes';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ToggleSizesSource from '!raw-loader!./ToggleSizes';
import StandaloneToggle from './StandaloneToggle';
// eslint-disable-next-line import/no-webpack-loader-syntax
import StandaloneToggleSource from '!raw-loader!./StandaloneToggle';

const ToggleButtons = () => {
  return (
    <>
      <ComponentHeader
        title='Toggle Buttons'
        description='Toggle buttons can be used to group related options.'
        refUrl='https://material-ui.com/components/toggle-button/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Simple Toggle'
            component={SimpleToggle}
            source={SimpleToggleSource}
            description='To emphasize groups of related Toggle buttons, a group should share a common container.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Toggle Size'
            component={ToggleSizes}
            source={ToggleSizesSource}
            description='Fancy larger or smaller buttons? Use the size property.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Standalone toggle button'
            component={StandaloneToggle}
            source={StandaloneToggleSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default ToggleButtons;
