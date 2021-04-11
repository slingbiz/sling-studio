import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import Basic from './Basic';
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicSource from '!raw-loader!./Basic';
import SizesColors from './SizesColors';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SizesColorsSource from '!raw-loader!./SizesColors';
import VerticalGroup from './VerticalGroup';
// eslint-disable-next-line import/no-webpack-loader-syntax
import VerticalGroupSource from '!raw-loader!./VerticalGroup';

import SplitButton from './SplitButton';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SplitButtonSource from '!raw-loader!./SplitButton';

const Buttons = () => {
  return (
    <>
      <ComponentHeader
        title='Button group'
        description='The ButtonGroup component can be used to group related buttons.'
        refUrl='https://material-ui.com/components/button-group/'
      />
      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Basic button group'
            component={Basic}
            source={BasicSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Sizes and colors'
            component={SizesColors}
            source={SizesColorsSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Vertical group'
            component={VerticalGroup}
            source={VerticalGroupSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Split button'
            component={SplitButton}
            source={SplitButtonSource}
            description='ButtonGroup can also be used to create a split button. The dropdown can change the button action (as in this example), or be used to immediately trigger a related action.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Buttons;
