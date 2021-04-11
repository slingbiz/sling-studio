import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import HorizontalStepper from './HorizontalStepper';
// eslint-disable-next-line import/no-webpack-loader-syntax
import HorizontalStepperSource from '!raw-loader!./HorizontalStepper';
import LinearAlternativeLabel from './LinearAlternativeLabel';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LinearAlternativeLabelSource from '!raw-loader!./LinearAlternativeLabel';
import CustomizedStepper from './CustomizedStepper';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedStepperSource from '!raw-loader!./CustomizedStepper';
import NonLinear from './NonLinear';
// eslint-disable-next-line import/no-webpack-loader-syntax
import NonLinearSource from '!raw-loader!./NonLinear';
import NonLinearAlternativeLabel from './NonLinearAlternativeLabel';
// eslint-disable-next-line import/no-webpack-loader-syntax
import NonLinearAlternativeLabelSource from '!raw-loader!./NonLinearAlternativeLabel';
import NonLinearErrorStepSelect from './NonLinearErrorStepSelect';
// eslint-disable-next-line import/no-webpack-loader-syntax
import NonLinearErrorStepSelectSource from '!raw-loader!./NonLinearErrorStepSelect';
import VerticalStepper from './VerticalStepper';
// eslint-disable-next-line import/no-webpack-loader-syntax
import VerticalStepperSource from '!raw-loader!./VerticalStepper';
import MobileStepper from './MobileStepper';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MobileStepperSource from '!raw-loader!./MobileStepper';
import TextWithCarouselEffect from './TextWithCarouselEffect';
// eslint-disable-next-line import/no-webpack-loader-syntax
import TextWithCarouselEffectSource from '!raw-loader!./TextWithCarouselEffect';
import MobileStepperDots from './MobileStepperDots';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MobileStepperDotsSource from '!raw-loader!./MobileStepperDots';
import MobileStepperProgress from './MobileStepperProgress';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MobileStepperProgressSource from '!raw-loader!./MobileStepperProgress';

const Steppers = () => {
  return (
    <>
      <ComponentHeader
        title='Steppers'
        description='Steppers convey progress through numbered steps. It provides a wizard-like workflow.'
        refUrl='https://material-ui.com/components/steppers/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Horizontal Stepper Linear'
            component={HorizontalStepper}
            source={HorizontalStepperSource}
            description='The Stepper can be controlled by passing the current step index (zero-based) as the activeStep property. Stepper orientation is set using the orientation property.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Linear - Alternative Label'
            component={LinearAlternativeLabel}
            source={LinearAlternativeLabelSource}
            description='Labels can be placed below the step icon by setting the alternativeLabel prop on the Stepper component.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Customized Stepper'
            component={CustomizedStepper}
            source={CustomizedStepperSource}
            description='Here is an example of customizing the component. You can learn more about this in the overrides documentation page.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Non-linear'
            component={NonLinear}
            source={NonLinearSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Non Linear - Alternative Label'
            component={NonLinearAlternativeLabel}
            source={NonLinearAlternativeLabelSource}
            description='Labels can be placed below the step icon by setting the alternativeLabel prop on the Stepper component.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Non Linear - Error Step Select'
            component={NonLinearErrorStepSelect}
            source={NonLinearErrorStepSelectSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Vertical Stepper'
            component={VerticalStepper}
            source={VerticalStepperSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Mobile Stepper'
            component={MobileStepper}
            source={MobileStepperSource}
            description='This component implements a compact stepper suitable for a mobile device. See mobile steps for its inspiration.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Text with Carousel effect'
            component={TextWithCarouselEffect}
            source={TextWithCarouselEffectSource}
            description='This demo is very similar to the previous, the difference is the usage of react-swipeable-views to make the transition of steps.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Mobile Stepper Dots'
            component={MobileStepperDots}
            source={MobileStepperDotsSource}
            description='Use dots when the number of steps isn’t large'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Mobile Stepper Progress'
            component={MobileStepperProgress}
            source={MobileStepperProgressSource}
            description='Use a progress bar when there are many steps, or if there are steps that need to be inserted during the process (based on responses to earlier steps).'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Steppers;
