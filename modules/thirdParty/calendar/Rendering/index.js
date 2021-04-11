import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import Rendering from './Components/Rendering';
// eslint-disable-next-line import/no-webpack-loader-syntax
import RenderingSource from '!raw-loader!./Components/Rendering';

const RenderingCalendar = () => {
  return (
    <>
      <ComponentHeader
        title='React Big Calendar'
        refUrl='http://intljusticemission.github.io/react-big-calendar/examples/index.html#basic'
      />
      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Rendering Calendar'
            component={Rendering}
            source={RenderingSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default RenderingCalendar;
