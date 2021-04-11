import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../@crema/core/ComponentHeader';
import GridContainer from '../../../@crema/core/GridContainer';
import DailyMotion from './DailyMotion';
// eslint-disable-next-line import/no-webpack-loader-syntax
import DailyMotionSource from '!raw-loader!./DailyMotion';
import Facebook from './Facebook';
// eslint-disable-next-line import/no-webpack-loader-syntax
import FacebookSource from '!raw-loader!./Facebook';
import Mixcloud from './Mixcloud';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MixcloudSource from '!raw-loader!./Mixcloud';
import SoundCloud from './SoundCloud';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SoundCloudSource from '!raw-loader!./SoundCloud';
import Streamable from './Streamable';
// eslint-disable-next-line import/no-webpack-loader-syntax
import StreamableSource from '!raw-loader!./Streamable';
import Twitch from './Twitch';
// eslint-disable-next-line import/no-webpack-loader-syntax
import TwitchSource from '!raw-loader!./Twitch';
import Vimeo from './Vimeo';
// eslint-disable-next-line import/no-webpack-loader-syntax
import VimeoSource from '!raw-loader!./Vimeo';
import Wistia from './Wistia';
// eslint-disable-next-line import/no-webpack-loader-syntax
import WistiaSource from '!raw-loader!./Wistia';
import YouTube from './YouTube';
// eslint-disable-next-line import/no-webpack-loader-syntax
import YouTubeSource from '!raw-loader!./YouTube';
// eslint-disable-next-line import/no-webpack-loader-syntax

const ReactPlayer = () => {
  return (
    <>
      <ComponentHeader
        title='ReactPlayer'
        description='A React component for playing a variety of URLs, including file paths, YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, and DailyMotion.'
        refUrl='https://cookpete.com/react-player/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='YouTube'
            component={YouTube}
            source={YouTubeSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Facebook'
            component={Facebook}
            source={FacebookSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard title='Vimeo' component={Vimeo} source={VimeoSource} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Daily Motion'
            component={DailyMotion}
            source={DailyMotionSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Sound Cloud'
            component={SoundCloud}
            source={SoundCloudSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Streamable'
            component={Streamable}
            source={StreamableSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Twitch'
            component={Twitch}
            source={TwitchSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Wistia'
            component={Wistia}
            source={WistiaSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Mixcloud'
            component={Mixcloud}
            source={MixcloudSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default ReactPlayer;
