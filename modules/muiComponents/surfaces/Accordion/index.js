import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import DetailedAccordion from './DetailedAccordion';
// eslint-disable-next-line import/no-webpack-loader-syntax
import DetailedAccordionSource from '!raw-loader!./DetailedAccordion';
import ControlledAccordion from './ControlledAccordion';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ControlledAccordionSource from '!raw-loader!./ControlledAccordion';
import CustomizedAccordions from './CustomizedAccordions';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedAccordionsSource from '!raw-loader!./CustomizedAccordions';

const Cards = () => {
  return (
    <>
      <ComponentHeader
        title='Expansion Panels'
        description='Expansion panels contain creation flows and allow lightweight editing of an element.'
        refUrl='https://material-ui.com/components/expansion-panels/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Controlled Accordion'
            component={ControlledAccordion}
            source={ControlledAccordionSource}
            description='Extend the default panel behavior to create an accordion with the ExpansionPanel component.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Customized expansion panels'
            component={CustomizedAccordions}
            source={CustomizedAccordionsSource}
            description='Here is an example of customizing the component. You can learn more about this in the overrides documentation page.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Additional actions'
            component={DetailedAccordion}
            source={DetailedAccordionSource}
            description='Multiple columns can be used to structure the content, and a helper text may be added to the panel to assist the user.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Cards;
