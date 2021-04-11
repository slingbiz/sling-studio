import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import ClassicEditor from './Classic';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ClassicEditorSource from '!raw-loader!./Classic';

const ReactTable = () => {
  return (
    <>
      <ComponentHeader
        title='Classic CK Editor'
        refUrl='https://ckeditor.com/docs/ckeditor5/latest/examples/builds/classic-editor.html'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Classic Editor'
            description='Classic editor shows a boxed editing area with a toolbar, placed in a specific position on the page.'
            component={ClassicEditor}
            source={ClassicEditorSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default ReactTable;
