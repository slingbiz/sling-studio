import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import MUIPicker from './MUIPicker';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MUIPickerSource from '!raw-loader!./MUIPicker';
import NativeDatePickers from './NativeDatePickers';
// eslint-disable-next-line import/no-webpack-loader-syntax
import NativeDatePickersSource from '!raw-loader!./NativeDatePickers';
import NativeDateTimePickers from './NativeDateTimePickers';
// eslint-disable-next-line import/no-webpack-loader-syntax
import NativeDateTimePickersSource from '!raw-loader!./NativeDateTimePickers';
import NativeTimePickers from './NativeTimePickers';
// eslint-disable-next-line import/no-webpack-loader-syntax
import NativeTimePickersSource from '!raw-loader!./NativeTimePickers';

const DateTime = () => {
  return (
    <>
      <ComponentHeader
        title='Date / Time pickers'
        description='Date pickers and Time pickers provide a simple way to select a single value from a pre-determined set.'
        refUrl='https://material-ui.com/components/pickers/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='@material-ui/pickers'
            component={MUIPicker}
            source={MUIPickerSource}
            description='@material-ui/pickers provides date picker and time picker controls.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Native Datepickers'
            component={NativeDatePickers}
            source={NativeDatePickersSource}
            description='A native datepicker example with type=date.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Date & Time pickers'
            component={NativeDateTimePickers}
            source={NativeDateTimePickersSource}
            description='A native date & time picker example with type=datetime-local.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Time pickers'
            component={NativeTimePickers}
            source={NativeTimePickersSource}
            description='A native time picker example with type=time.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default DateTime;
