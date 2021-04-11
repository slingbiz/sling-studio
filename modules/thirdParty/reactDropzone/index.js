import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../@crema/core/ComponentHeader';
import GridContainer from '../../../@crema/core/GridContainer';
import Basic from './Basic';
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicSource from '!raw-loader!./Basic';
import EventPropagation from './EventPropagation';
// eslint-disable-next-line import/no-webpack-loader-syntax
import EventPropagationSource from '!raw-loader!./EventPropagation';
import StylingDropzone from './StylingDropzone';
// eslint-disable-next-line import/no-webpack-loader-syntax
import StylingDropzoneSource from '!raw-loader!./StylingDropzone';
import SpecificFileTypes from './SpecificFileTypes';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SpecificFileTypesSource from '!raw-loader!./SpecificFileTypes';
import DialogProgrammatically from './DialogProgrammatically';
// eslint-disable-next-line import/no-webpack-loader-syntax
import DialogProgrammaticallySource from '!raw-loader!./DialogProgrammatically';
import Previews from './Previews';
// eslint-disable-next-line import/no-webpack-loader-syntax
import PreviewsSource from '!raw-loader!./Previews';
import ClassComponents from './ClassComponents';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ClassComponentsSource from '!raw-loader!./ClassComponents';

const ReactDropzone = () => {
  return (
    <>
      <ComponentHeader
        title='React Dropzone'
        description="Simple React hook to create a HTML5-compliant drag'n'drop zone for files."
        refUrl='https://react-dropzone.netlify.com/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard title='Basic' component={Basic} source={BasicSource} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Event Propagation'
            component={EventPropagation}
            source={EventPropagationSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Specific`File Types'
            component={SpecificFileTypes}
            source={SpecificFileTypesSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Dialog Programmatically'
            component={DialogProgrammatically}
            source={DialogProgrammaticallySource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Styling Dropzone'
            component={StylingDropzone}
            source={StylingDropzoneSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Previews'
            component={Previews}
            source={PreviewsSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Class Components'
            component={ClassComponents}
            source={ClassComponentsSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default ReactDropzone;
