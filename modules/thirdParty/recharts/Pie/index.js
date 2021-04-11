import React from 'react';
import TwoLevelPieChart from './Components/TwoLevelPieChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import TwoLevelPieChartSource from '!raw-loader!./Components/TwoLevelPieChart';
import StraightAnglePieChart from './Components/StraightAnglePieChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import StraightAnglePieChartSource from '!raw-loader!./Components/StraightAnglePieChart';
import TwoSimplePieChart from './Components/TwoSimplePieChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import TwoSimplePieChartSource from '!raw-loader!./Components/TwoSimplePieChart';
import CustomActiveShapePieChart from './Components/CustomActiveShapePieChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomActiveShapePieChartSource from '!raw-loader!./Components/CustomActiveShapePieChart';
import PieChartWithPaddingAngle from './Components/PieChartWithPaddingAngle';
// eslint-disable-next-line import/no-webpack-loader-syntax
import PieChartWithPaddingAngleSource from '!raw-loader!./Components/PieChartWithPaddingAngle';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

const PieChart = ({match}) => {
  return (
    <>
      <ComponentHeader
        title='Pie Chart'
        refUrl='http://recharts.org/en-US/api/PieChart/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Two Level Pie Chart'
            component={TwoLevelPieChart}
            source={TwoLevelPieChartSource}
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Straight Angle Pie Chart'
            component={StraightAnglePieChart}
            source={StraightAnglePieChartSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Custom Active Shape Pie Chart'
            component={CustomActiveShapePieChart}
            source={CustomActiveShapePieChartSource}
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Two Simple Pie Chart'
            component={TwoSimplePieChart}
            source={TwoSimplePieChartSource}
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Pie Chart With Padding Angle'
            component={PieChartWithPaddingAngle}
            source={PieChartWithPaddingAngleSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default PieChart;
