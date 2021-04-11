import React from 'react';
import SimpleTreemap from './Components/SimpleTreemap';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleTreemapSource from '!raw-loader!./Components/SimpleTreemap';
import CustomContentTreemap from './Components/CustomContentTreemap';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomContentTreemapSource from '!raw-loader!./Components/CustomContentTreemap';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

const Treemap = ({match}) => {
  return (
    <>
      <ComponentHeader
        title='Treemap'
        refUrl='http://recharts.org/en-US/api/Treemap/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Simple Tree map'
            component={SimpleTreemap}
            source={SimpleTreemapSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Custom Content Treemap'
            component={CustomContentTreemap}
            source={CustomContentTreemapSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Treemap;
