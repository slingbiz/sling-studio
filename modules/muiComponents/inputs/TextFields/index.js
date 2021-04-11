import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import SimpleTextField from './SimpleTextField';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleTextFieldSource from '!raw-loader!./SimpleTextField';

import OutlinedTextFields from './OutlinedTextFields';
// eslint-disable-next-line import/no-webpack-loader-syntax
import OutlinedTextFieldsSource from '!raw-loader!./OutlinedTextFields';

import FilledTextField from './FilledTextField';
// eslint-disable-next-line import/no-webpack-loader-syntax
import FilledTextFieldSource from '!raw-loader!./FilledTextField';

import ComponentsTextField from './ComponentsTextField';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ComponentsTextFieldSource from '!raw-loader!./ComponentsTextField';

import InputsTextField from './InputsTextField';
// eslint-disable-next-line import/no-webpack-loader-syntax
import InputsTextFieldSource from '!raw-loader!./InputsTextField';

import CustomizedInputs from './CustomizedInputs';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedInputsSource from '!raw-loader!./CustomizedInputs';

import Customization from './Customization';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizationSource from '!raw-loader!./Customization';

import InputAdornments from './InputAdornments';
// eslint-disable-next-line import/no-webpack-loader-syntax
import InputAdornmentsSource from '!raw-loader!./InputAdornments';

import WithIcon from './WithIcon';
// eslint-disable-next-line import/no-webpack-loader-syntax
import WithIconSource from '!raw-loader!./WithIcon';

import FilledInputAdornments from './FilledInputAdornments';
// eslint-disable-next-line import/no-webpack-loader-syntax
import FilledInputAdornmentsSource from '!raw-loader!./FilledInputAdornments';

import OutlinedInputAdornments from './OutlinedInputAdornments';
// eslint-disable-next-line import/no-webpack-loader-syntax
import OutlinedInputAdornmentsSource from '!raw-loader!./OutlinedInputAdornments';

import ThirdpartyLib from './ThirdpartyLib';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ThirdpartyLibSource from '!raw-loader!./ThirdpartyLib';

const TextFields = () => {
  return (
    <>
      <ComponentHeader
        title='Text Fields'
        description='Text fields let users enter and edit text.'
        refUrl='https://material-ui.com/components/text-fields/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='TextField'
            component={SimpleTextField}
            source={SimpleTextFieldSource}
            description='The TextField wrapper component is a complete form control including a label, input and help text.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Outlined'
            component={OutlinedTextFields}
            source={OutlinedTextFieldsSource}
            description='TextField supports outlined styling.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Filled'
            component={FilledTextField}
            source={FilledTextFieldSource}
            description='TextField supports filled styling.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Components'
            component={ComponentsTextField}
            source={ComponentsTextFieldSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Inputs'
            component={InputsTextField}
            source={InputsTextFieldSource}
            description='The TextField wrapper component is a complete form control including a label, input and help text.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Customized inputs'
            component={CustomizedInputs}
            source={CustomizedInputsSource}
            description='Here are some examples of customizing the component. You can learn more about this in the overrides documentation page.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Input Adornments'
            component={InputAdornments}
            source={InputAdornmentsSource}
            description='Input allows the provision of InputAdornment.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='With icon'
            component={WithIcon}
            source={WithIconSource}
            description='Icons can be specified as prepended or appended'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Filled Input Adornments'
            component={FilledInputAdornments}
            source={FilledInputAdornmentsSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Outlined Input Adornments'
            component={OutlinedInputAdornments}
            source={OutlinedInputAdornmentsSource}
            description='Icons can be specified as prepended or appended'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Layout'
            component={OutlinedInputAdornments}
            source={OutlinedInputAdornmentsSource}
            description='TextField, FormControl allow the specification of margin to alter the vertical spacing of inputs. Using none (default) will not apply margins to the FormControl, whereas dense and normal will as well as alter other styles to meet the specification.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Integration with 3rd party input libraries'
            component={ThirdpartyLib}
            source={ThirdpartyLibSource}
            description='Icons can be specified as prepended or appended'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Customization'
            component={Customization}
            source={CustomizationSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default TextFields;
