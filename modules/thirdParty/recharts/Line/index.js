import React from 'react';
import SimpleLineChart from './Components/SimpleLineChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleLineChartSource from '!raw-loader!./Components/SimpleLineChart';
import VerticalLineChart from './Components/VerticalLineChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import VerticalLineChartSource from '!raw-loader!./Components/VerticalLineChart';
import CustomizedDotLineChart from './Components/CustomizedDotLineChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedDotLineChartSource from '!raw-loader!./Components/CustomizedDotLineChart';
import LineChartWithReferenceLines from './Components/LineChartWithReferenceLines';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LineChartWithReferenceLinesSource from '!raw-loader!./Components/LineChartWithReferenceLines';
import DashedLineChart from './Components/DashedLineChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import DashedLineChartSource from '!raw-loader!./Components/DashedLineChart';
import LineChartWithXAxisPading from './Components/LineChartWithXAxisPading';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LineChartWithXAxisPadingSource from '!raw-loader!./Components/LineChartWithXAxisPading';
import LineChartConnectNulls from './Components/LineChartConnectNulls';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LineChartConnectNullsSource from '!raw-loader!./Components/LineChartConnectNulls';
import SynchronizedLineChart from './Components/SynchronizedLineChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SynchronizedLineChartSource from '!raw-loader!./Components/SynchronizedLineChart';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

const LineChart = ({match}) => {
  return (
    <>
      <ComponentHeader
        title='Line Chart'
        description='All svg elements can be added into the LineChart component, such as defs.'
        refUrl='http://recharts.org/en-US/api/LineChart'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Simple Line Chart'
            component={SimpleLineChart}
            source={SimpleLineChartSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Vertical Line Chart'
            component={VerticalLineChart}
            source={VerticalLineChartSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Customized Dot Line Chart'
            component={CustomizedDotLineChart}
            source={CustomizedDotLineChartSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Line Chart With Reference Lines'
            component={LineChartWithReferenceLines}
            source={LineChartWithReferenceLinesSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Dashed Line Chart'
            component={DashedLineChart}
            source={DashedLineChartSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Line Chart With X-Axis Padding'
            component={LineChartWithXAxisPading}
            source={LineChartWithXAxisPadingSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Synchronized Line Chart'
            component={SynchronizedLineChart}
            source={SynchronizedLineChartSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Line Chart Connect Nulls'
            component={LineChartConnectNulls}
            source={LineChartConnectNullsSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default LineChart;
