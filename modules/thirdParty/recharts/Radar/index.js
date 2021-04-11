import React from 'react';
import SimpleRadarChart from './Components/SimpleRadarChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleRadarChartSource from '!raw-loader!./Components/SimpleRadarChart';
import SpecifiedDomainRadarChart from './Components/SpecifiedDomainRadarChart';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SpecifiedDomainRadarChartSource from '!raw-loader!./Components/SpecifiedDomainRadarChart';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

const Radar = () => {
  return (
    <>
      <ComponentHeader
        title='Radar Chart'
        refUrl='http://recharts.org/en-US/api/RadarChart'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Simple Radar Chart'
            component={SimpleRadarChart}
            source={SimpleRadarChartSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Specified Domain Radar Chart'
            component={SpecifiedDomainRadarChart}
            source={SpecifiedDomainRadarChartSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Radar;
