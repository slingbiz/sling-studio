import React from 'react';
import LineBarAreaComposedChart from './Components/LineBarAreaComposedChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LineBarAreaComposedChartSource from '!raw-loader!./Components/LineBarAreaComposedChart';
import VerticalComposedChart from './Components/VerticalComposedChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import VerticalComposedChartSource from '!raw-loader!./Components/VerticalComposedChart';
import SameDataComposedChart from './Components/SameDataComposedChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SameDataComposedChartSource from '!raw-loader!./Components/SameDataComposedChart';
import ComposedChartWithAxisLabels from './Components/ComposedChartWithAxisLabels';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ComposedChartWithAxisLabelsSource from '!raw-loader!./Components/ComposedChartWithAxisLabels';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

const ComposedChart = ({match}) => {
  return (
    <>
      <ComponentHeader
        title='Composed Chart'
        description='A chart composed of line, area, and bar charts. When you just want to draw a chart of a single type like line, then LineChart is recommended.'
        refUrl='http://recharts.org/en-US/api/ComposedChart/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Line Bar Area Composed Chart'
            component={LineBarAreaComposedChart}
            source={LineBarAreaComposedChartSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Line Bar Area Composed Chart'
            component={VerticalComposedChart}
            source={VerticalComposedChartSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Same Data Composed Chart'
            component={SameDataComposedChart}
            source={SameDataComposedChartSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Composed Chart With Axis Labels'
            component={ComposedChartWithAxisLabels}
            source={ComposedChartWithAxisLabelsSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default ComposedChart;
