import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import Popup from './Components/Popup';
// eslint-disable-next-line import/no-webpack-loader-syntax
import PopupSource from '!raw-loader!./Components/Popup';

const PopupCalendar = () => {
  return (
    <>
      <ComponentHeader
        title='React Big Calendar'
        refUrl='http://intljusticemission.github.io/react-big-calendar/examples/index.html#basic'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Popup Calendar'
            component={Popup}
            source={PopupSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default PopupCalendar;
