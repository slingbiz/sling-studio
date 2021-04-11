import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import BalloonBlockEditor from './BalloonBlock';
// eslint-disable-next-line import/no-webpack-loader-syntax
import BalloonBlockEditorSource from '!raw-loader!./BalloonBlock';

const ReactTable = () => {
  return (
    <>
      <ComponentHeader
        title='Balloon Block CK Editor'
        refUrl='https://ckeditor.com/docs/ckeditor5/latest/examples/builds/balloon-block-editor.html'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Balloon Block Editor'
            description='Balloon block editor lets you create your content directly in its target location with the help of two toolbars:'
            component={BalloonBlockEditor}
            source={BalloonBlockEditorSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default ReactTable;
