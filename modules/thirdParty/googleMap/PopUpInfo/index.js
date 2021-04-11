import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import PopUpInfo from './Components/MapPopupInfo';
// eslint-disable-next-line import/no-webpack-loader-syntax
import PopUpInfoSource from '!raw-loader!./Components/MapPopupInfo';

const PopUpInfoEx = () => {
  return (
    <>
      <ComponentHeader
        title='InfoWindow Google Map'
        description='A wrapper around google.maps.InfoWindow'
        refUrl='https://developers.google.com/maps/documentation/javascript/3.exp/reference#InfoWindow'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Google Map InfoWindow'
            component={PopUpInfo}
            source={PopUpInfoSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default PopUpInfoEx;
