import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import DefaultCheckboxes from './DefaultCheckboxes';
// eslint-disable-next-line import/no-webpack-loader-syntax
import DefaultCheckboxesSource from '!raw-loader!./DefaultCheckboxes';
import FormControlLabelCB from './FormControlLabelCB';
// eslint-disable-next-line import/no-webpack-loader-syntax
import FormControlLabelCBSource from '!raw-loader!./FormControlLabelCB';
import CheckboxesFormGroup from './CheckboxesFormGroup';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CheckboxesFormGroupSource from '!raw-loader!./CheckboxesFormGroup';
import LabelPlacement from './LabelPlacement';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LabelPlacementSource from '!raw-loader!./LabelPlacement';

const Checkboxes = () => {
  return (
    <>
      <ComponentHeader
        title='Checkboxes'
        description='Checkboxes allow the user to select one or more items from a set.'
        refUrl='https://material-ui.com/components/checkboxes/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Checkboxes'
            component={DefaultCheckboxes}
            source={DefaultCheckboxesSource}
            description='Checkboxes can be used to turn an option on or off.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='FormControl Label Checkboxes'
            component={FormControlLabelCB}
            source={FormControlLabelCBSource}
            description='Checkbox can also be used with a label description thanks to the FormControlLabel component.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Checkboxes with FormGroup'
            component={CheckboxesFormGroup}
            source={CheckboxesFormGroupSource}
            description='FormGroup is a helpful wrapper used to group selection controls components that provides an easier API.'
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
      </GridContainer>
    </>
  );
};

export default Checkboxes;
