import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import SimpleChip from './SimpleChip';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleChipSource from '!raw-loader!./SimpleChip';
import OutlinedChips from './OutlinedChips';
// eslint-disable-next-line import/no-webpack-loader-syntax
import OutlinedChipsSource from '!raw-loader!./OutlinedChips';
import ChipArray from './ChipArray';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ChipArraySource from '!raw-loader!./ChipArray';
import SmallChip from './SmallChip';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SmallChipSource from '!raw-loader!./SmallChip';
import OutlinedVariant from './OutlinedVariant';
// eslint-disable-next-line import/no-webpack-loader-syntax
import OutlinedVariantSource from '!raw-loader!./OutlinedVariant';

const Chips = () => {
  return (
    <>
      <ComponentHeader
        title='Chips'
        description='Chips are compact elements that represent an input, attribute, or action.'
        refUrl='https://material-ui.com/components/chips/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Simple Chip'
            component={SimpleChip}
            source={SimpleChipSource}
            description='Examples of Chips, using an image Avatar, SVG Icon Avatar, Letter and (string) Avatar..'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Outlined Chips'
            component={OutlinedChips}
            source={OutlinedChipsSource}
            description='Outlined chips offer an alternative style.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Small Chip'
            component={SmallChip}
            source={SmallChipSource}
            description='You can use the size prop to define a small Chip.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Outlined variant'
            component={OutlinedVariant}
            source={OutlinedVariantSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Chip array'
            component={ChipArray}
            source={ChipArraySource}
            description='An example of rendering multiple Chips from an array of values. Deleting a chip removes it from the array. Note that since no onClick property is defined, the Chip can be focused, but does not gain depth while clicked or touched.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Chips;
