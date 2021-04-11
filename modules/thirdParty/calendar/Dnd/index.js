import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import Dnd from './Components/Dnd';
// // eslint-disable-next-line import/no-webpack-loader-syntax
// import DndSource from "!raw-loader!./Components/Dnd";

const DndCalendar = () => {
  return (
    <>
      <ComponentHeader
        title='React Big Calendar'
        refUrl='http://intljusticemission.github.io/react-big-calendar/examples/index.html#basic'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Dnd Calendar'
            component={Dnd}
            // source={DndSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default DndCalendar;
