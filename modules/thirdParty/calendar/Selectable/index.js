import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import Selectable from './Components/Selectable';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SelectableSource from '!raw-loader!./Components/Selectable';

const SelectableCalendar = () => {
  return (
    <>
      <ComponentHeader
        title='React Big Calendar'
        refUrl='http://intljusticemission.github.io/react-big-calendar/examples/index.html#basic'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Selectable Calendar'
            component={Selectable}
            source={SelectableSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default SelectableCalendar;
