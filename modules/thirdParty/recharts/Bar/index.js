import React from 'react';
import TinyBarChart from './Components/TinyBarChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import TinyBarChartSource from '!raw-loader!./Components/TinyBarChart';
import StackedBarChart from './Components/StackedBarChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import StackedBarChartSource from '!raw-loader!./Components/StackedBarChart';
import MixBarChart from './Components/MixBarChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MixBarChartSource from '!raw-loader!./Components/MixBarChart';
import CustomShapeBarChart from './Components/CustomShapeBarChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomShapeBarChartSource from '!raw-loader!./Components/CustomShapeBarChart';
import PositiveAndNegativeBarChart from './Components/PositiveAndNegativeBarChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import PositiveAndNegativeBarChartSource from '!raw-loader!./Components/PositiveAndNegativeBarChart';
import BarChartStackedBySign from './Components/BarChartStackedBySign';
// eslint-disable-next-line import/no-webpack-loader-syntax
import BarChartStackedBySignSource from '!raw-loader!./Components/BarChartStackedBySign';
import BiaxialBarChart from './Components/BiaxialBarChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import BiaxialBarChartSource from '!raw-loader!./Components/BiaxialBarChart';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

const BarChart = ({match}) => {
  return (
    <>
      <ComponentHeader
        title='Bar Chart'
        description='All svg elements can be added into the BarChart component, such as defs, linearGradient, etc.'
        refUrl='http://recharts.org/en-US/api/BarChart/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Tiny Bar Chart'
            component={TinyBarChart}
            source={TinyBarChartSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Stacked Bar Chart'
            component={StackedBarChart}
            source={StackedBarChartSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Mix Bar Chart'
            component={MixBarChart}
            source={MixBarChartSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Custom Shape Bar Chart'
            component={CustomShapeBarChart}
            source={CustomShapeBarChartSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Positive And Negative Bar Chart'
            component={PositiveAndNegativeBarChart}
            source={PositiveAndNegativeBarChartSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Bar Chart Stacked By Sign'
            component={BarChartStackedBySign}
            source={BarChartStackedBySignSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Biaxial Bar Chart'
            component={BiaxialBarChart}
            source={BiaxialBarChartSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default BarChart;
