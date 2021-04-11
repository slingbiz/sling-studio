import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import ImageAvatars from './ImageAvatars';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ImageAvatarsSource from '!raw-loader!./ImageAvatars';
import LetterAvatars from './LetterAvatars';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LetterAvatarsSource from '!raw-loader!./LetterAvatars';
import IconAvatars from './IconAvatars';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconAvatarsSource from '!raw-loader!./IconAvatars';

const Avatars = () => {
  return (
    <>
      <ComponentHeader
        title='Avatars'
        description='Avatars are found throughout material design with uses in everything from tables to dialog menus.'
        refUrl='https://material-ui.com/components/links/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Image avatars'
            component={ImageAvatars}
            source={ImageAvatarsSource}
            description='Image avatars can be created by passing standard img props src or srcSet into the component.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Letter avatars'
            component={LetterAvatars}
            source={LetterAvatarsSource}
            description='Avatars containing simple characters can be created by passing your string as children.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Icon avatars'
            component={IconAvatars}
            source={IconAvatarsSource}
            description='Icon avatars are created by passing an icon as children.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Avatars;
