import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import EventHandler from './Components/EventHandler';
// eslint-disable-next-line import/no-webpack-loader-syntax
import EventHandlerSource from '!raw-loader!./Components/EventHandler';

const EventHandlerEx = () => {
  return (
    <>
      <ComponentHeader
        title='Event Handler Google Map'
        refUrl='http://google-map-react.github.io/google-map-react/map/balderdash/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Event Handler Map'
            component={EventHandler}
            source={EventHandlerSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default EventHandlerEx;
