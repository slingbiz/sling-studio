import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import MapDirections from './Components/MapDirections';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapDirectionsSource from '!raw-loader!./Components/MapDirections';

const Directions = () => {
  return (
    <>
      <ComponentHeader
        title='Directions Renderer Google Map'
        description='A wrapper around google.maps.DirectionsRenderer'
        refUrl='https://developers.google.com/maps/documentation/javascript/3.exp/reference#DirectionsRenderer'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Directions Map'
            component={MapDirections}
            source={MapDirectionsSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Directions;
