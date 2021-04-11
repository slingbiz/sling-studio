import React from 'react';
import SimpleAreaChart from './Components/SimpleAreaChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleAreaChartSource from '!raw-loader!./Components/SimpleAreaChart';
import StackedAreaChart from './Components/StackedAreaChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import StackedAreaChartSource from '!raw-loader!./Components/StackedAreaChart';
import PercentAreaChart from './Components/PercentAreaChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import PercentAreaChartSource from '!raw-loader!./Components/PercentAreaChart';
import AreaChartConnectNulls from './Components/AreaChartConnectNulls';
// eslint-disable-next-line import/no-webpack-loader-syntax
import AreaChartConnectNullsSource from '!raw-loader!./Components/AreaChartConnectNulls';
import SynchronizedAreaChart from './Components/SynchronizedAreaChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SynchronizedAreaChartSource from '!raw-loader!./Components/SynchronizedAreaChart';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

const AreaChart = ({match}) => {
  return (
    <>
      <ComponentHeader
        title='Area Chart'
        description='All svg elements can be added into the AreaChart component, such as defs, linearGradient, etc.'
        refUrl='http://recharts.org/en-US/api/AreaChart/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Simple modal'
            component={SimpleAreaChart}
            source={SimpleAreaChartSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Stacked Area Chart'
            component={StackedAreaChart}
            source={StackedAreaChartSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='AreaChart Connect Nulls'
            component={AreaChartConnectNulls}
            source={AreaChartConnectNullsSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Synchronized Area Chart'
            component={SynchronizedAreaChart}
            source={SynchronizedAreaChartSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Percent Area Chart'
            component={PercentAreaChart}
            source={PercentAreaChartSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};
export default AreaChart;
