import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import MapClustering from './Components/MarkerClustererEx.js';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapClusteringSource from '!raw-loader!./Components/MarkerClustererEx.js';

const MapClusteringEx = () => {
  return (
    <>
      <ComponentHeader
        title='Marker Clusterer'
        description='A wrapper around MarkerClusterer'
        refUrl='https://github.com/mahnunchik/markerclustererplus/blob/master/docs/reference.html'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Marker Clusterer Map'
            component={MapClustering}
            source={MapClusteringSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default MapClusteringEx;
