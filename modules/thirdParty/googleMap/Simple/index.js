import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import SimpleMap from './Components/SimpleMap';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleMapSource from '!raw-loader!./Components/SimpleMap';

const TransferLists = () => {
  return (
    <>
      <ComponentHeader
        title='Google Map'
        description='A wrapper around google.maps.Map'
        refUrl='https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Simple Map'
            component={SimpleMap}
            source={SimpleMapSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default TransferLists;
