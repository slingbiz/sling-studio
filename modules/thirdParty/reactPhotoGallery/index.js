import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../@crema/core/ComponentHeader';
import GridContainer from '../../../@crema/core/GridContainer';
import WithImageViewer from './WithImageViewer';
// eslint-disable-next-line import/no-webpack-loader-syntax
import WithImageViewerSource from '!raw-loader!./WithImageViewer';

import BasicRow from './BasicRow';
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicRowSource from '!raw-loader!./BasicRow';
import BasicColumn from './BasicColumn';
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicColumnSource from '!raw-loader!./BasicColumn';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ReactSortableHoc from './ReactSortableHoc';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ReactSortableHocSource from '!raw-loader!./ReactSortableHoc';
import CustomImage from './CustomImage';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomImageSource from '!raw-loader!./CustomImage';

const ReactPhotoGallery = () => {
  return (
    <>
      <ComponentHeader
        title='React Photo Gallery'
        description='esponsive, accessible, composable, and customizable image gallery component'
        refUrl='http://neptunian.github.io/react-photo-gallery/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Basic Row'
            component={BasicRow}
            source={BasicRowSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Basic Column'
            component={BasicColumn}
            source={BasicColumnSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='React Sortable Hoc'
            component={ReactSortableHoc}
            source={ReactSortableHocSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Selection with custom ImageComponent'
            description="You can pass in your own component to the gallery via the ImageComponent prop. This would give you full control of what each individual image looks like in the Gallery. Here is an example of giving your gallery 'Selection' capability."
            component={CustomImage}
            source={CustomImageSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='With Image Viewer'
            component={WithImageViewer}
            source={WithImageViewerSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default ReactPhotoGallery;
