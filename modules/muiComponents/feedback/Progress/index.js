import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import CircularIndeterminate from './CircularIndeterminate';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CircularIndeterminateSource from '!raw-loader!./CircularIndeterminate';
import InteractiveIntegration from './InteractiveIntegration';
// eslint-disable-next-line import/no-webpack-loader-syntax
import InteractiveIntegrationSource from '!raw-loader!./InteractiveIntegration';
import CircularDeterminate from './CircularDeterminate';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CircularDeterminateSource from '!raw-loader!./CircularDeterminate';
import CircularStatic from './CircularStatic';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CircularStaticSource from '!raw-loader!./CircularStatic';
import LinearIndeterminate from './LinearIndeterminate';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LinearIndeterminateSource from '!raw-loader!./LinearIndeterminate';
import LinearDeterminate from './LinearDeterminate';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LinearDeterminateSource from '!raw-loader!./LinearDeterminate';
import LinearBuffer from './LinearBuffer';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LinearBufferSource from '!raw-loader!./LinearBuffer';
import LinearQuery from './LinearQuery';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LinearQuerySource from '!raw-loader!./LinearQuery';
import CustomizedProgressBars from './CustomizedProgressBars';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedProgressBarsSource from '!raw-loader!./CustomizedProgressBars';
import DelayingAppearance from './DelayingAppearance';
// eslint-disable-next-line import/no-webpack-loader-syntax
import DelayingAppearanceSource from '!raw-loader!./DelayingAppearance';

const Progress = () => {
  return (
    <>
      <ComponentHeader
        title='Progress'
        description='Progress indicators commonly known as spinners, express an unspecified wait time or display the length of a process. The animation works with CSS, not JavaScript.'
        refUrl='https://material-ui.com/components/progress/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Circular Progress'
            component={CircularIndeterminate}
            source={CircularIndeterminateSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Interactive Integration'
            component={InteractiveIntegration}
            source={InteractiveIntegrationSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Circular Determinate'
            component={CircularDeterminate}
            source={CircularDeterminateSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Circular Static'
            component={CircularStatic}
            source={CircularStaticSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Linear Indeterminate'
            component={LinearIndeterminate}
            source={LinearIndeterminateSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Linear Determinate'
            component={LinearDeterminate}
            source={LinearDeterminateSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Linear Buffer'
            component={LinearBuffer}
            source={LinearBufferSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Linear Query'
            component={LinearQuery}
            source={LinearQuerySource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Customized progress bars'
            component={CustomizedProgressBars}
            source={CustomizedProgressBarsSource}
            description='Here are some examples of customizing the component. You can learn more about this in the overrides documentation page.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Delaying appearance'
            component={DelayingAppearance}
            source={DelayingAppearanceSource}
            description="There are 3 important limits to know around response time. The ripple effect of the ButtonBase component ensures that the user feels that the system is reacting instantaneously. Normally, no special feedback is necessary during delays of more than 0.1 but less than 1.0 second. After 1.0 second, you can display a loader to keep user's flow of thought uninterrupted."
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Progress;
