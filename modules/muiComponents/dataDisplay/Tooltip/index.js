import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import SimpleTooltips from './SimpleTooltips';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleTooltipsSource from '!raw-loader!./SimpleTooltips';
import PositionedTooltips from './PositionedTooltips';
// eslint-disable-next-line import/no-webpack-loader-syntax
import PositionedTooltipsSource from '!raw-loader!./PositionedTooltips';
import CustomizedTooltips from './CustomizedTooltips';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedTooltipsSource from '!raw-loader!./CustomizedTooltips';
import TriggersTooltip from './TriggersTooltip';
// eslint-disable-next-line import/no-webpack-loader-syntax
import TriggersTooltipSource from '!raw-loader!./TriggersTooltip';
import VariableWidth from './VariableWidth';
// eslint-disable-next-line import/no-webpack-loader-syntax
import VariableWidthSource from '!raw-loader!./VariableWidth';
import InteractiveTooltip from './InteractiveTooltip';
// eslint-disable-next-line import/no-webpack-loader-syntax
import InteractiveTooltipSource from '!raw-loader!./InteractiveTooltip';
import DisabledElements from './DisabledElements';
// eslint-disable-next-line import/no-webpack-loader-syntax
import DisabledElementsSource from '!raw-loader!./DisabledElements';
import TransitionsTooltip from './TransitionsTooltip';
// eslint-disable-next-line import/no-webpack-loader-syntax
import TransitionsTooltipSource from '!raw-loader!./TransitionsTooltip';
import ShowingHiding from './ShowingHiding';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ShowingHidingSource from '!raw-loader!./ShowingHiding';

const Tooltips = () => {
  return (
    <>
      <ComponentHeader
        title='Tooltips'
        description='Tooltips display informative text when users hover over, focus on, or tap an element'
        refUrl='https://material-ui.com/components/tooltips/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Simple Tooltips'
            component={SimpleTooltips}
            source={SimpleTooltipsSource}
            description='The Link component is built on top of the Typography component. You can leverage its properties.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Customized tooltips'
            component={CustomizedTooltips}
            source={CustomizedTooltipsSource}
            description='Here are some examples of customizing the component. You can learn more about this in the overrides documentation page.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Triggers tooltips'
            component={TriggersTooltip}
            source={TriggersTooltipSource}
            description='You can define the types of events that cause a tooltip to show.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Variable Width'
            component={VariableWidth}
            source={VariableWidthSource}
            description='The Tooltip wraps long text by default to make it readable.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Interactive tooltips'
            component={InteractiveTooltip}
            source={InteractiveTooltipSource}
            description="A tooltip can be interactive. It won't close when the user hovers over the tooltip before the leaveDelay is expired."
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Disabled Elements'
            component={DisabledElements}
            source={DisabledElementsSource}
            description='By default disabled elements like <button> do not trigger user interactions so a Tooltip will not activate on normal events like hover. To accommodate disabled elements, add a simple wrapper element like a span.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Showing and hiding tooltips'
            component={ShowingHiding}
            source={ShowingHidingSource}
            description="The tooltip is normally shown immediately when the user's mouse hovers over the element, and hides immediately when the user's mouse leaves. A delay in showing or hiding the tooltip can be added through the properties enterDelay and leaveDelay, as shown in the Controlled Tooltips demo above."
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Transitions tooltips'
            component={TransitionsTooltip}
            source={TransitionsTooltipSource}
            description='Use a different transition..'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Positioned Tooltips'
            component={PositionedTooltips}
            source={PositionedTooltipsSource}
            description='The Tooltip has 12 placements choice. They don’t have directional arrows; instead, they rely on motion emanating from the source to convey direction.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Tooltips;
