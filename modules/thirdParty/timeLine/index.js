import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../@crema/core/ComponentHeader';
import GridContainer from '../../../@crema/core/GridContainer';

import Custom from './Custom';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomSource from '!raw-loader!./Custom';

import ReactImageTimeline from './ReactImageTimeline';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ReactImageTimelineSource from '!raw-loader!./ReactImageTimeline';

const Timeline = () => {
  return (
    <>
      <ComponentHeader
        title='Timeline'
        description='A React component for playing a variety of URLs, including file paths, YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, and DailyMotion.'
        refUrl='https://cookpete.com/react-player/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Custom'
            maxHeight={700}
            component={Custom}
            source={CustomSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='React Image Timeline'
            maxHeight={700}
            component={ReactImageTimeline}
            source={ReactImageTimelineSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Timeline;
