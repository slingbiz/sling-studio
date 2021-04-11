import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import SimplePopover from './SimplePopover';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimplePopoverSource from '!raw-loader!./SimplePopover';
import AnchorPlayground from './AnchorPlayground';
// eslint-disable-next-line import/no-webpack-loader-syntax
import AnchorPlaygroundSource from '!raw-loader!./AnchorPlayground';
import MouseOverInteraction from './MouseOverInteraction';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MouseOverInteractionSource from '!raw-loader!./MouseOverInteraction';
import PopupStateHelper from './PopupStateHelper';
// eslint-disable-next-line import/no-webpack-loader-syntax
import PopupStateHelperSource from '!raw-loader!./PopupStateHelper';

const Popovers = () => {
  return (
    <>
      <ComponentHeader
        title='Popover'
        description='A Popover can be used to display some content on top of another.'
        refUrl='https://material-ui.com/components/popover/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Simple Popover'
            component={SimplePopover}
            source={SimplePopoverSource}
            description='The scroll and click away are blocked unlike with the Popper component.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Mouse over interaction'
            component={MouseOverInteraction}
            source={MouseOverInteractionSource}
            description='This demonstrates how to use the Popover component to implement a popover behavior based on the mouse over event.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Anchor playground'
            component={AnchorPlayground}
            source={AnchorPlaygroundSource}
            description='Use the radio buttons to adjust the anchorOrigin and transformOrigin positions. You can also set the anchorReference to anchorPosition or anchorEl. When it is anchorPosition, the component will, instead of anchorEl, refer to the anchorPosition prop which you can adjust to set the position of the popover.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='PopupState helper'
            component={PopupStateHelper}
            source={PopupStateHelperSource}
            description='There is a 3rd party package material-ui-popup-state that takes care of popover state for you in most cases.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Popovers;
