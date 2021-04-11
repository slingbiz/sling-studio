import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import SimpleBadges from './SimpleBadges';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleBadgesSource from '!raw-loader!./SimpleBadges';
import CustomizedBadges from './CustomizedBadges';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedBadgesSource from '!raw-loader!./CustomizedBadges';
import BadgeVisibility from './BadgeVisibility';
// eslint-disable-next-line import/no-webpack-loader-syntax
import BadgeVisibilitySource from '!raw-loader!./BadgeVisibility';
import MaximumValue from './MaximumValue';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MaximumValueSource from '!raw-loader!./MaximumValue';
import DotBadge from './DotBadge';
// eslint-disable-next-line import/no-webpack-loader-syntax
import DotBadgeSource from '!raw-loader!./DotBadge';
import BadgeOverlap from './BadgeOverlap';
// eslint-disable-next-line import/no-webpack-loader-syntax
import BadgeOverlapSource from '!raw-loader!./BadgeOverlap';
import BadgeAlignment from './BadgeAlignment';
// eslint-disable-next-line import/no-webpack-loader-syntax
import BadgeAlignmentSource from '!raw-loader!./BadgeAlignment';

const Badges = () => {
  return (
    <>
      <ComponentHeader
        title='Badges'
        description='Badge generates a small badge to the top-right of its child(ren).'
        refUrl='https://material-ui.com/components/badges/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Simple Badges'
            component={SimpleBadges}
            source={SimpleBadgesSource}
            description='Examples of badges containing text, using primary and secondary colors. The badge is applied to its children.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Badge visibility'
            component={BadgeVisibility}
            source={BadgeVisibilitySource}
            description='The visibility of badges can be controlled using the invisible property.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Customized badges'
            component={CustomizedBadges}
            source={CustomizedBadgesSource}
            description='Here are some examples of customizing the component. You can learn more about this in the overrides documentation page..'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Maximum Value'
            component={MaximumValue}
            source={MaximumValueSource}
            description='You can use the max property to cap the value of the badge content.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Badge overlap'
            component={BadgeOverlap}
            source={BadgeOverlapSource}
            description='You can use the overlap property to place the badge relative to the corner of the wrapped element.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Badge alignment'
            component={BadgeAlignment}
            source={BadgeAlignmentSource}
            description='You can use the horizontalAlignment and verticalAlignment properties to move the badge to any corner of the wrapped element.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Dot Badge'
            component={DotBadge}
            source={DotBadgeSource}
            description='The dot property changes a badge into a small dot. This can be used as a notification that something has changed without giving a count.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Badges;
