import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import SimpleBreadcrumbs from './SimpleBreadcrumbs';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleBreadcrumbsSource from '!raw-loader!./SimpleBreadcrumbs';
import CustomSeparator from './CustomSeparator';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomSeparatorSource from '!raw-loader!./CustomSeparator';
import BreadcrumbsWithIcons from './BreadcrumbsWithIcons';
// eslint-disable-next-line import/no-webpack-loader-syntax
import BreadcrumbsWithIconsSource from '!raw-loader!./BreadcrumbsWithIcons';
import CollapsedBreadcrumbs from './CollapsedBreadcrumbs';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CollapsedBreadcrumbsSource from '!raw-loader!./CollapsedBreadcrumbs';
import CustomizedBreadcrumbs from './CustomizedBreadcrumbs';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedBreadcrumbsSource from '!raw-loader!./CustomizedBreadcrumbs';
import IntegrationWithRreactRouter from './IntegrationWithRreactRouter';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IntegrationWithRreactRouterSource from '!raw-loader!./IntegrationWithRreactRouter';

const BreadCrumbs = () => {
  return (
    <>
      <ComponentHeader
        title='Breadcrumbs'
        description='Breadcrumbs allow users to make selections from a range of values'
        refUrl='https://material-ui.com/components/breadcrumbs/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Simple breadcrumbs'
            component={SimpleBreadcrumbs}
            source={SimpleBreadcrumbsSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Custom separator'
            component={CustomSeparator}
            source={CustomSeparatorSource}
            description='In the following examples, we are using two string separators, and an SVG icon.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Breadcrumbs with icons'
            component={BreadcrumbsWithIcons}
            source={BreadcrumbsWithIconsSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Collapsed breadcrumbs'
            component={CollapsedBreadcrumbs}
            source={CollapsedBreadcrumbsSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Customized breadcrumbs'
            component={CustomizedBreadcrumbs}
            source={CustomizedBreadcrumbsSource}
            description='Here is an example of customizing the component. You can learn more about this in the overrides documentation page.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Integration with react-router'
            component={IntegrationWithRreactRouter}
            source={IntegrationWithRreactRouterSource}
            description='Here is an example of customizing the component. You can learn more about this in the overrides documentation page.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default BreadCrumbs;
