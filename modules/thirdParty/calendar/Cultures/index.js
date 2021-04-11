import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import Cultures from './Components/Cultures';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CulturesSource from '!raw-loader!./Components/Cultures';

const CulturesCalendar = () => {
  return (
    <>
      <ComponentHeader
        title='React Big Calendar'
        refUrl='http://intljusticemission.github.io/react-big-calendar/examples/index.html#basic'
      />
      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Cultures Calendar'
            component={Cultures}
            source={CulturesSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default CulturesCalendar;
