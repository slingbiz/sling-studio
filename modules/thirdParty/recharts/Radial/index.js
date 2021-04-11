import React from 'react';
import SimpleRadialBarChart from './Components/SimpleRadialBarChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleRadialBarChartSource from '!raw-loader!./Components/SimpleRadialBarChart';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

const Radial = () => {
  return (
    <>
      <ComponentHeader
        title='Radial Bar Chart'
        refUrl='http://recharts.org/en-US/api/RadialBarChart/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Simple Radial Bar Chart'
            component={SimpleRadialBarChart}
            source={SimpleRadialBarChartSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Radial;
