import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import Downshift from './DownShift';
// eslint-disable-next-line import/no-webpack-loader-syntax
import DownshiftSource from '!raw-loader!./DownShift';

import ReactAutosuggest from './ReactAutosuggest';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ReactAutosuggestSource from '!raw-loader!./ReactAutosuggest';

import ReactSelect from './ReactSelect';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ReactSelectSource from '!raw-loader!./ReactSelect';

const AutoComplete = () => {
  return (
    <>
      <ComponentHeader
        title='Auto Complete'
        description='The autocomplete is a normal text input enhanced by a panel of suggested options'
        refUrl='https://material-ui.com/components/autocomplete/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Downshift'
            component={Downshift}
            source={DownshiftSource}
            description='The last demo allows the user to clear the input and show a number of options on focus.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='React Autosuggest'
            component={ReactAutosuggest}
            source={ReactAutosuggestSource}
            description='This example demonstrates how to use react-autosuggest. It also uses autosuggest-highlight for the highlighting logic.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='React Select'
            component={ReactSelect}
            source={ReactSelectSource}
            description='This example demonstrates how to use react-select.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default AutoComplete;
