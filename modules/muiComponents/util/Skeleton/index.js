import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import Variants from './Variants';
// eslint-disable-next-line import/no-webpack-loader-syntax
import VariantsSource from '!raw-loader!./Variants';
import Animations from './Animations';
// eslint-disable-next-line import/no-webpack-loader-syntax
import AnimationsSource from '!raw-loader!./Animations';
import Media from './Media';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MediaSource from '!raw-loader!./Media';
import YouTubeExample from './YouTubeExample';
// eslint-disable-next-line import/no-webpack-loader-syntax
import YouTubeExampleSource from '!raw-loader!./YouTubeExample';
import Wave from './Wave';
// eslint-disable-next-line import/no-webpack-loader-syntax
import WaveSource from '!raw-loader!./Wave';
import FacebookExample from './FacebookExample';
// eslint-disable-next-line import/no-webpack-loader-syntax
import FacebookExampleSource from '!raw-loader!./FacebookExample';

const Skeleton = () => {
  return (
    <>
      <ComponentHeader
        title='Skeleton'
        description='Display a placeholder preview of your content before the data gets loaded to reduce load-time frustration.'
        refUrl='https://material-ui.com/components/skeleton/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Variants'
            component={Variants}
            source={VariantsSource}
            description='The component supports 3 shape variants'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Animations'
            component={Animations}
            source={AnimationsSource}
            description=' default, the skeleton pulsate, but you can change the animation for a wave or disable it entirely.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Pulsate example'
            component={Media}
            source={MediaSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Wave example'
            component={Wave}
            source={WaveSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='YouTube example'
            component={YouTubeExample}
            source={YouTubeExampleSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Facebook example'
            component={FacebookExample}
            source={FacebookExampleSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Skeleton;
