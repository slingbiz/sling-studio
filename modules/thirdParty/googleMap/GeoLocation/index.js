import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import GeoLocation from './Components/GeoLocation';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleMapSource from '!raw-loader!./Components/GeoLocation';

const GeoLocationEx = () => {
  return (
    <>
      <ComponentHeader
        title='Google Map'
        refUrl='http://google-map-react.github.io/google-map-react/map/balderdash/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Simple Map'
            component={GeoLocation}
            source={SimpleMapSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default GeoLocationEx;
