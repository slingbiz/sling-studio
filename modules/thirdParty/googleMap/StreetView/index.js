import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import StreetViewMap from './Components/StreetViewPanoramaEx';
// eslint-disable-next-line import/no-webpack-loader-syntax
import StreetViewMapSource from '!raw-loader!./Components/StreetViewPanoramaEx';

const StreetView = () => {
  return (
    <>
      <ComponentHeader
        title='StreetView Map'
        description='A wrapper around google.maps.StreetViewPanorama'
        refUrl='https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanorama/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='StreetView Map'
            component={StreetViewMap}
            source={StreetViewMapSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default StreetView;
