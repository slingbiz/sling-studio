import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import TrafficLayer from './Components/TrafficLayerEx';
// eslint-disable-next-line import/no-webpack-loader-syntax
import TrafficLayerSource from '!raw-loader!./Components/TrafficLayerEx';

const TrafficLayerEx = () => {
  return (
    <>
      <ComponentHeader
        title='Traffic Google Map'
        description='A wrapper around google.maps.TrafficLayer'
        refUrl='https://developers.google.com/maps/documentation/javascript/3.exp/reference#TrafficLayer'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Traffic Map'
            component={TrafficLayer}
            source={TrafficLayerSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default TrafficLayerEx;
