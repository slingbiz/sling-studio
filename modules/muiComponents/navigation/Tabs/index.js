import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import SimpleTabs from './SimpleTabs';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleTabsSource from '!raw-loader!./SimpleTabs';
import WrappedLabels from './WrappedLabels';
// eslint-disable-next-line import/no-webpack-loader-syntax
import WrappedLabelsSource from '!raw-loader!./WrappedLabels';
import DisabledTab from './DisabledTab';
// eslint-disable-next-line import/no-webpack-loader-syntax
import DisabledTabSource from '!raw-loader!./DisabledTab';
import FixedTabs from './FixedTabs';
// eslint-disable-next-line import/no-webpack-loader-syntax
import FixedTabsSource from '!raw-loader!./FixedTabs';
import CenteredTabs from './CenteredTabs';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CenteredTabsSource from '!raw-loader!./CenteredTabs';
import AutomaticScrollButtons from './AutomaticScrollButtons';
// eslint-disable-next-line import/no-webpack-loader-syntax
import AutomaticScrollButtonsSource from '!raw-loader!./AutomaticScrollButtons';
import ForcedScrollButtons from './ForcedScrollButtons';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ForcedScrollButtonsSource from '!raw-loader!./ForcedScrollButtons';
import PreventScrollButtons from './PreventScrollButtons';
// eslint-disable-next-line import/no-webpack-loader-syntax
import PreventScrollButtonsSource from '!raw-loader!./PreventScrollButtons';
import CustomizedTabs from './CustomizedTabs';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedTabsSource from '!raw-loader!./CustomizedTabs';
import VerticalTabs from './VerticalTabs';
// eslint-disable-next-line import/no-webpack-loader-syntax
import VerticalTabsSource from '!raw-loader!./VerticalTabs';
import NavTabs from './NavTabs';
// eslint-disable-next-line import/no-webpack-loader-syntax
import NavTabsSource from '!raw-loader!./NavTabs';
import IconTabs from './IconTabs';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconTabsSource from '!raw-loader!./IconTabs';
import IconTabsWithName from './IconTabsWithName';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconTabsWithNameSource from '!raw-loader!./IconTabsWithName';

const Tabs = () => {
  return (
    <>
      <ComponentHeader
        title='Tabs'
        description='Tabs make it easy to explore and switch between different views.'
        refUrl='https://material-ui.com/components/transfer-list/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Simple Tabs'
            component={SimpleTabs}
            source={SimpleTabsSource}
            description='A simple example with no frills.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Wrapped Labels'
            component={WrappedLabels}
            source={WrappedLabelsSource}
            description='Long labels will automatically wrap on tabs. If the label is too long for the tab, it will overflow and the text will not be visible.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Disabled Tab'
            component={DisabledTab}
            source={DisabledTabSource}
            description='A Tab can be disabled by setting disabled property.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Fixed Tabs'
            component={FixedTabs}
            source={FixedTabsSource}
            description='Fixed tabs should be used with a limited number of tabs and when consistent placement will aid muscle memory.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Centered'
            component={CenteredTabs}
            source={CenteredTabsSource}
            description='The centered property should be used for larger views.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Automatic Scroll Buttons'
            component={AutomaticScrollButtons}
            source={AutomaticScrollButtonsSource}
            description='Left and right scroll buttons will automatically be presented on desktop and hidden on mobile. (based on viewport width)'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Forced Scroll Buttons'
            component={ForcedScrollButtons}
            source={ForcedScrollButtonsSource}
            description='Left and right scroll buttons will be presented regardless of the viewport width.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Prevent Scroll Buttons'
            component={PreventScrollButtons}
            source={PreventScrollButtonsSource}
            description='Left and right scroll buttons will never be presented. All scrolling must be initiated through user agent scrolling mechanisms (e.g. left/right swipe, shift-mousewheel, etc.)'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Customized tabs'
            component={CustomizedTabs}
            source={CustomizedTabsSource}
            description='Here is an example of customizing the component. You can learn more about this in the overrides documentation page.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Vertical tabs'
            component={VerticalTabs}
            source={VerticalTabsSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Nav Tabs'
            component={NavTabs}
            source={NavTabsSource}
            description="By default tabs use a button element, but you can provide your own custom tag or component. Here's an example of implementing tabbed navigation:"
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Icon Tabs'
            component={IconTabs}
            source={IconTabsSource}
            description='Tab labels may be either all icons or all text.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='IconTabsWithName'
            component={IconTabsWithName}
            source={IconTabsWithNameSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Tabs;
