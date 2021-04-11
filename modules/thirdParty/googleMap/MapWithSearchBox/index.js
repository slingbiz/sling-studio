import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import MapWithASearchBox from './Components/MapWithASearchBox';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapWithASearchBoxSource from '!raw-loader!./Components/MapWithASearchBox';

const MapWithSearchBox = () => {
  return (
    <>
      <ComponentHeader
        title='Google Map with SearchBox'
        description='A wrapper around google.maps.places.SearchBox on the map'
        refUrl='https://developers.google.com/maps/documentation/javascript/3.exp/reference#SearchBox/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Map With Search Box'
            component={MapWithASearchBox}
            source={MapWithASearchBoxSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default MapWithSearchBox;
