import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import Basic from './Components/Basic';
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicSource from '!raw-loader!./Components/Basic';

const BasicCalendar = () => {
  return (
    <>
      <ComponentHeader
        title='React Big Calendar'
        refUrl='http://intljusticemission.github.io/react-big-calendar/examples/index.html#basic'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Basic Calendar'
            component={Basic}
            source={BasicSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default BasicCalendar;
