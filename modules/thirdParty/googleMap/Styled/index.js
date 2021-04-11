import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import Styled from './Components/StyledMap';
// eslint-disable-next-line import/no-webpack-loader-syntax
import StyledSource from '!raw-loader!./Components/StyledMap';

const StyledMap = () => {
  return (
    <>
      <ComponentHeader
        title='Styled Google Map'
        description='A wrapper around Custom style'
        refUrl='http://google-map-react.github.io/google-map-react/map/balderdash/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Styled Map'
            component={Styled}
            source={StyledSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default StyledMap;
