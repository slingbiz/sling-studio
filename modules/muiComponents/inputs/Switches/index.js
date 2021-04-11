import React from 'react';
import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import Grid from '@material-ui/core/Grid';
import SimpleSwitches from './SimpleSwitches';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleSwitchesSource from '!raw-loader!./SimpleSwitches';
import SwitchesWithFormControlLabel from './SwitchesWithFormControlLabel';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SwitchesWithFormControlLabelSource from '!raw-loader!./SwitchesWithFormControlLabel';
import SwitchesWithFormGroup from './SwitchesWithFormGroup';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SwitchesWithFormGroupSource from '!raw-loader!./SwitchesWithFormGroup';
import CustomizedSwitches from './CustomizedSwitches';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedSwitchesSource from '!raw-loader!./CustomizedSwitches';
import SwitchSizes from './SwitchSizes';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SwitchSizesSource from '!raw-loader!./SwitchSizes';
import LabelPlacement from './LabelPlacement';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LabelPlacementSource from '!raw-loader!./LabelPlacement';

const Switches = () => {
  return (
    <>
      <ComponentHeader
        title='Switches'
        description='Switches toggle the state of a single setting on or off.'
        refUrl='https://material-ui.com/components/switches//'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Simple Switches'
            component={SimpleSwitches}
            source={SimpleSwitchesSource}
            description='Switches are the preferred way to adjust settings on mobile. The option that the switch controls, as well as the state it’s in, should be made clear from the corresponding inline label.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Switches with FormControlLabel'
            component={SwitchesWithFormControlLabel}
            source={SwitchesWithFormControlLabelSource}
            description='Switch can also be used with a label description thanks to the FormControlLabel component.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Switches with FormGroup'
            component={SwitchesWithFormGroup}
            source={SwitchesWithFormGroupSource}
            description='FormGroup is a helpful wrapper used to group selection controls components that provides an easier API. However, we encourage you to use a Checkbox instead.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Customized switches'
            component={CustomizedSwitches}
            source={CustomizedSwitchesSource}
            description='Here are some examples of customizing the component. You can learn more about this in the overrides documentation page.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Switch Sizes'
            component={SwitchSizes}
            source={SwitchSizesSource}
            description='Fancy smaller switches? Use the size property.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Label placement'
            component={LabelPlacement}
            source={LabelPlacementSource}
            description='You can change the placement of the label.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Switches;
