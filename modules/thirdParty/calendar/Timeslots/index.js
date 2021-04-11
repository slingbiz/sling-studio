import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import Timeslots from './Components/Timeslots';
// eslint-disable-next-line import/no-webpack-loader-syntax
import TimeslotsSource from '!raw-loader!./Components/Timeslots';

const DirectionsCalendar = () => {
  return (
    <>
      <ComponentHeader
        title='React Big Calendar'
        refUrl='http://intljusticemission.github.io/react-big-calendar/examples/index.html#basic'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Timeslots Calendar'
            component={Timeslots}
            source={TimeslotsSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default DirectionsCalendar;
