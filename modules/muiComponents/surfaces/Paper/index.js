import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import SimplePaper from './SimplePaper';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimplePaperSource from '!raw-loader!./SimplePaper';

const Papers = () => {
  return (
    <>
      <ComponentHeader
        title='Paper'
        description='In Material Design, the physical properties of paper are translated to the screen.'
        refUrl='https://material-ui.com/components/paper/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Simple Paper'
            component={SimplePaper}
            source={SimplePaperSource}
            description='The background of an application resembles the flat, opaque texture of a sheet of paper, and an application’s behavior mimics paper’s ability to be re-sized, shuffled, and bound together in multiple sheets.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Papers;
