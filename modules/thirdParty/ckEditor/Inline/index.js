import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import InlineEditor from './Inline';
// eslint-disable-next-line import/no-webpack-loader-syntax
import InlineEditorSource from '!raw-loader!./Inline';

const ReactTable = () => {
  return (
    <>
      <ComponentHeader
        title='Inline CK Editor'
        refUrl='https://ckeditor.com/docs/ckeditor5/latest/examples/builds/inline-editor.html'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Inline Editor'
            description='Inline editor lets you create your content directly in its target location with the help of a floating toolbar that apprears when the editable text is focused.'
            component={InlineEditor}
            source={InlineEditorSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default ReactTable;
