import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import SimpleSelect from './SimpleSelect';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleSelectSource from '!raw-loader!./SimpleSelect';
import NativeSelect from './NativeSelect';
// eslint-disable-next-line import/no-webpack-loader-syntax
import NativeSelectSource from '!raw-loader!./NativeSelect';
import CustomizedSelects from './CustomizedSelects';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedSelectsSource from '!raw-loader!./CustomizedSelects';
import MultipleSelect from './MultipleSelect';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MultipleSelectSource from '!raw-loader!./MultipleSelect';
import ControlledOpenSelect from './ControlledOpenSelect';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ControlledOpenSelectSource from '!raw-loader!./ControlledOpenSelect';
import WithaDialog from './WithaDialog';
// eslint-disable-next-line import/no-webpack-loader-syntax
import WithaDialogSource from '!raw-loader!./WithaDialog';

const Selects = () => {
  return (
    <>
      <ComponentHeader
        title='Selects'
        description='Select components are used for collecting user provided information from a list of options'
        refUrl='https://material-ui.com/components/selects/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Simple Select'
            component={SimpleSelect}
            source={SimpleSelectSource}
            description='Menus are positioned over their emitting elements such that the currently selected menu item appears on top of the emitting element'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Native Select'
            component={NativeSelect}
            source={NativeSelectSource}
            description='As the user experience can be improved on mobile using the native select of the platform, we allow such pattern.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Customized selects'
            component={CustomizedSelects}
            source={CustomizedSelectsSource}
            description="The first step is to style the InputBase component. Once it's styled, you can either use it directly as a text field or provide it to the select input property to have a select field.."
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Multiple Select'
            component={MultipleSelect}
            source={MultipleSelectSource}
            description="The Select component can handle multiple selections. It's enabled with the multiple property."
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Controlled Open Select'
            component={ControlledOpenSelect}
            source={ControlledOpenSelectSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='With a Dialog'
            component={WithaDialog}
            source={WithaDialogSource}
            description="While it's discouraged by the Material Design specification, you can use a select inside a dialog."
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Selects;
