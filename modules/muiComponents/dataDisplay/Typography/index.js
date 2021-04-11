import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import ComponentTypo from './ComponentTypo';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ComponentTypoSource from '!raw-loader!./ComponentTypo';

const Typography = () => {
  return (
    <>
      <ComponentHeader
        title='Typography'
        description='Use typography to present your design and content as clearly and efficiently as possible'
        refUrl='https://material-ui.com/components/typography/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Typography Component'
            component={ComponentTypo}
            source={ComponentTypoSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Typography;
