import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import Balloon from './Balloon';
// eslint-disable-next-line import/no-webpack-loader-syntax
import BalloonSource from '!raw-loader!./Balloon';

const ReactTable = () => {
  return (
    <>
      <ComponentHeader
        title='Balloon CK editor'
        refUrl='https://ckeditor.com/docs/ckeditor5/latest/examples/builds/balloon-editor.html'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Balloon Editor'
            description='Balloon editor lets you create your content directly in its target location with the help of a balloon toolbar that appears next to the selected editable document element.'
            component={Balloon}
            source={BalloonSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default ReactTable;
