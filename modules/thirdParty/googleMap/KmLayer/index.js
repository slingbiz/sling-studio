import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import MapKmLayer from './Components/MapKmLayer';
// eslint-disable-next-line import/no-webpack-loader-syntax
import KmLayerSource from '!raw-loader!./Components/MapKmLayer';

const KmLayerEx = () => {
  return (
    <>
      <ComponentHeader
        title='KmlLayer Google Map'
        description='A wrapper around google.maps.KmlLayer'
        refUrl='https://developers.google.com/maps/documentation/javascript/3.exp/reference#KmlLayer'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='KmlLayer Map'
            component={MapKmLayer}
            source={KmLayerSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default KmLayerEx;
