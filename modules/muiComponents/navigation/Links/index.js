import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import SimpleLinks from './SimpleLinks';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleLinksSource from '!raw-loader!./SimpleLinks';
import AccessibilityLinks from './AccessibilityLinks';
// eslint-disable-next-line import/no-webpack-loader-syntax
import AccessibilityLinksSource from '!raw-loader!./AccessibilityLinks';
import SecurityLink from './SecurityLink';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SecurityLinkSource from '!raw-loader!./SecurityLink';

const Links = () => {
  return (
    <>
      <ComponentHeader
        title='Links'
        description='The Link component allows you to easily customize anchor elements with your theme colors and typography styles'
        refUrl='https://material-ui.com/components/links/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Simple links'
            component={SimpleLinks}
            source={SimpleLinksSource}
            description='The Link component is built on top of the Typography component. You can leverage its properties.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Accessibility links'
            component={AccessibilityLinks}
            source={AccessibilityLinksSource}
            description='The Link component is built on top of the Typography component. You can leverage its properties.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Security links'
            component={SecurityLink}
            source={SecurityLinkSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Links;
