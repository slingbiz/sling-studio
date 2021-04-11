import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import DiscreteSliders from './DiscreteSliders';
// eslint-disable-next-line import/no-webpack-loader-syntax
import DiscreteSlidersSource from '!raw-loader!./DiscreteSliders';
import CustomizedSliders from './CustomizedSliders';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedSlidersSource from '!raw-loader!./CustomizedSliders';
import ContinuousSliders from './ContinuousSliders';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ContinuousSlidersSource from '!raw-loader!./ContinuousSliders';
import RangeSliders from './RangeSliders';
// eslint-disable-next-line import/no-webpack-loader-syntax
import RangeSlidersSource from '!raw-loader!./RangeSliders';
import WithInputField from './WithInputField';
// eslint-disable-next-line import/no-webpack-loader-syntax
import WithInputFieldSource from '!raw-loader!./WithInputField';
import VerticalSliders from './VerticalSliders';
// eslint-disable-next-line import/no-webpack-loader-syntax
import VerticalSlidersSource from '!raw-loader!./VerticalSliders';

const Sliders = () => {
  return (
    <>
      <ComponentHeader
        title='Slider'
        description='Sliders allow users to make selections from a range of values.'
        refUrl='https://material-ui.com/components/slider/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Discrete sliders'
            component={DiscreteSliders}
            source={DiscreteSlidersSource}
            description='Discrete sliders can be adjusted to a specific value by referencing its value indicator. By order of demos.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Customized sliders'
            component={CustomizedSliders}
            source={CustomizedSlidersSource}
            description='Here are some examples of customizing the component. You can learn more about this in the overrides documentation page.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Continuous sliders'
            component={ContinuousSliders}
            source={ContinuousSlidersSource}
            description='Continuous sliders allow users to select a value along a subjective range.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Range sliders'
            component={RangeSliders}
            source={RangeSlidersSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Vertical sliders'
            component={VerticalSliders}
            source={VerticalSlidersSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='With input field'
            component={WithInputField}
            source={WithInputFieldSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Sliders;
