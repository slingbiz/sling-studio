import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import MapOverlay from './Components/MapOverlay';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapOverlaySource from '!raw-loader!./Components/MapOverlay';

const MapOverlayEx = () => {
  return (
    <>
      <ComponentHeader
        title='OverlayView Map'
        description='A wrapper around google.maps.OverlayView'
        refUrl='https://developers.google.com/maps/documentation/javascript/3.exp/reference#OverlayView'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Map Overlay'
            component={MapOverlay}
            source={MapOverlaySource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default MapOverlayEx;
