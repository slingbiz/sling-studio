import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import RadioButtonDefault from './RadioButtonDefault';
// eslint-disable-next-line import/no-webpack-loader-syntax
import RadioButtonDefaultSource from '!raw-loader!./RadioButtonDefault';
import StandaloneRadioButtons from './StandaloneRadioButtons';
// eslint-disable-next-line import/no-webpack-loader-syntax
import StandaloneRadioButtonsSource from '!raw-loader!./StandaloneRadioButtons';
import LabelPlacement from './LabelPlacement';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LabelPlacementSource from '!raw-loader!./LabelPlacement';
import CustomizedRadios from './CustomizedRadios';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedRadiosSource from '!raw-loader!./CustomizedRadios';

const RadioButtons = () => {
  return (
    <>
      <ComponentHeader
        title='Radio buttons'
        description='Radio buttons allow the user to select one option from a set.'
        refUrl='https://material-ui.com/components/radio-buttons/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Radio Buttons'
            component={RadioButtonDefault}
            source={RadioButtonDefaultSource}
            description='Radio buttons should have the most commonly used option selected by default..'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Customized radios'
            component={CustomizedRadios}
            source={CustomizedRadiosSource}
            description='Radio buttons should have the most commonly used option selected by default..'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Label placement'
            component={LabelPlacement}
            source={LabelPlacementSource}
            description='You can change the placement of the label'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Standalone Radio Buttons'
            component={StandaloneRadioButtons}
            source={StandaloneRadioButtonsSource}
            description='Radio can also be used standalone, without the wrapper.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default RadioButtons;
