import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import DocumentEditor from './Document';
// eslint-disable-next-line import/no-webpack-loader-syntax
import DocumentEditorSource from '!raw-loader!./Document';

const ReactTable = () => {
  return (
    <>
      <ComponentHeader
        title='Document CK Editor'
        refUrl='https://ckeditor.com/docs/ckeditor5/latest/examples/builds/document-editor.html'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Document Editor'
            description='The editor in this example is a feature–rich build focused on rich text editing experience similar to the native word processors. It works best for creating documents which are usually later printed or exported to PDF files.'
            component={DocumentEditor}
            source={DocumentEditorSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default ReactTable;
