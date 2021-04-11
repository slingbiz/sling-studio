import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import CustomEditor from './Custom';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomEditorSource from '!raw-loader!./Custom';

const ReactTable = () => {
  return (
    <>
      <ComponentHeader
        title='Custom CK Editor'
        refUrl='https://ckeditor.com/docs/ckeditor5/latest/examples/builds/custom-build.html'
      />

      <GridContainer>
        <Grid item xs={8}>
          <ComponentCard
            title='Custom build Editor'
            description='The editor in this example was customized to offer a limited subset of editing features, provided mainly by the ckeditor5-basic-styles and ckeditor5-highlight packages. This kind of customization is possible with a custom editor build, perfectly tailored to the needs of the application.'
            component={CustomEditor}
            source={CustomEditorSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default ReactTable;
