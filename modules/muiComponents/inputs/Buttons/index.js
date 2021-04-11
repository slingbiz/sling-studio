import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import ContainedButtons from './ContainedButtons';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ContainedButtonsSource from '!raw-loader!./ContainedButtons';
import TextButtons from './TextButtons';
// eslint-disable-next-line import/no-webpack-loader-syntax
import TextButtonsSource from '!raw-loader!./TextButtons';
import OutlinedButtons from './OutlinedButtons';
// eslint-disable-next-line import/no-webpack-loader-syntax
import OutlinedButtonsSource from '!raw-loader!./OutlinedButtons';
import GroupedButtons from './GroupedButtons';
// eslint-disable-next-line import/no-webpack-loader-syntax
import GroupedButtonsSource from '!raw-loader!./GroupedButtons';
import SplitButton from './SplitButton';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SplitButtonSource from '!raw-loader!./SplitButton';
import FloatingActionButtons from './FloatingActionButtons';
// eslint-disable-next-line import/no-webpack-loader-syntax
import FloatingActionButtonsSource from '!raw-loader!./FloatingActionButtons';
import FloatingActionButtonsTabs from './FloatingActionButtonsTabs';
// eslint-disable-next-line import/no-webpack-loader-syntax
import FloatingActionButtonsTabsSource from '!raw-loader!./FloatingActionButtonsTabs';
import ButtonSizes from './ButtonSizes';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ButtonSizesSource from '!raw-loader!./ButtonSizes';
import ButtonsWithIconsLabel from './ButtonsWithIconsLabel';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ButtonsWithIconsLabelSource from '!raw-loader!./ButtonsWithIconsLabel';
import IconButtons from './IconButtons';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconButtonsSource from '!raw-loader!./IconButtons';
import CustomizedButtons from './CustomizedButtons';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedButtonsSource from '!raw-loader!./CustomizedButtons';
import ComplexButtons from './ComplexButtons';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ComplexButtonsSource from '!raw-loader!./ComplexButtons';

const Buttons = () => {
  return (
    <React.Fragment>
      <ComponentHeader
        title='Button'
        description='Buttons allow users to take actions, and make choices, with a single tap.'
        refUrl='https://material-ui.com/components/buttons/'
      />
      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Contained Buttons'
            component={ContainedButtons}
            source={ContainedButtonsSource}
            description='Contained buttons are high-emphasis, distinguished by their use of elevation and fill. They contain actions that are primary to your app.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Text Buttons'
            component={TextButtons}
            source={TextButtonsSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Outlined Buttons'
            component={OutlinedButtons}
            source={OutlinedButtonsSource}
            description='Outlined buttons are medium-emphasis buttons. They contain actions that are important, but aren’t the primary action in an app.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Grouped Buttons'
            component={GroupedButtons}
            source={GroupedButtonsSource}
            description='The ButtonGroup component can be used to group outlined (the default) or contained buttons.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Split Button'
            component={SplitButton}
            source={SplitButtonSource}
            description='ButtonGroup can also be used to create a split button. The dropdown can change the button action (as in this example), or be used to immediately trigger a related action.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Buttons Sizes'
            component={ButtonSizes}
            source={ButtonSizesSource}
            description='Fancy larger or smaller buttons? Use the size property.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Tabbed Buttons'
            component={FloatingActionButtonsTabs}
            source={FloatingActionButtonsTabsSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Buttons with icons and label'
            component={ButtonsWithIconsLabel}
            source={ButtonsWithIconsLabelSource}
            description='Sometimes you might want to have icons for certain button to enhance the UX of the application as we recognize logos more easily than plain text. For example, if you have a delete button you can label it with a dustbin icon.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Floating Action Buttons'
            component={FloatingActionButtons}
            source={FloatingActionButtonsSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Icon Buttons'
            component={IconButtons}
            source={IconButtonsSource}
            description='Icon buttons are commonly found in app bars and toolbars.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Customized Buttons'
            component={CustomizedButtons}
            source={CustomizedButtonsSource}
            description='Here are some examples of customizing the component. You can learn more about this in the overrides documentation page.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Complex Buttons'
            component={ComplexButtons}
            source={ComplexButtonsSource}
            description='The Text Buttons, Contained Buttons, Floating Action Buttons and Icon Buttons are built on top of the same component: the ButtonBase. You can take advantage of this lower level component to build custom interactions.'
          />
        </Grid>
      </GridContainer>
    </React.Fragment>
  );
};

export default Buttons;
