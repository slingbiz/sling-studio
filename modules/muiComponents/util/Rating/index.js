import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import SimpleRatings from './SimpleRatings';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleRatingsSource from '!raw-loader!./SimpleRatings';
import CustomizedRatings from './CustomizedRatings';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedRatingsSource from '!raw-loader!./CustomizedRatings';
import HoverFeedback from './HoverFeedback';
// eslint-disable-next-line import/no-webpack-loader-syntax
import HoverFeedbacksSource from '!raw-loader!./HoverFeedback';
import HalfRating from './HalfRating';
// eslint-disable-next-line import/no-webpack-loader-syntax
import HalfRatingSource from '!raw-loader!./HalfRating';

const Ratings = () => {
  return (
    <>
      <ComponentHeader
        title='Rating'
        description='Ratings provide insight regarding others’ opinions and experiences with a product. Users can also rate products they’ve purchased.'
        refUrl='https://material-ui.com/components/rating/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Simple ratings'
            component={SimpleRatings}
            source={SimpleRatingsSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Customized ratings'
            component={CustomizedRatings}
            source={CustomizedRatingsSource}
            description='Here are some examples of customizing the component. You can learn more about this in the overrides documentation page.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Hover feedback'
            component={HoverFeedback}
            source={HoverFeedbacksSource}
            description='You can display a label on hover to help users pick the correct rating value. The first demo uses the onChangeActive prop while the last one uses the IconContainerComponent prop.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Sizes ratings'
            component={HoverFeedback}
            source={HoverFeedbacksSource}
            description='Fancy larger or smaller ratings? Use the size prop.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Half ratings'
            component={HalfRating}
            source={HalfRatingSource}
            description='The rating can display any float number with the value prop. Use the precision prop to define the minimum increment value change allowed.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Ratings;
