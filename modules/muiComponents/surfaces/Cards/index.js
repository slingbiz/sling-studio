import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import SimpleCard from './SimpleCard';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleCardSource from '!raw-loader!./SimpleCard';
import ComplexInteraction from './ComplexInteraction';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ComplexInteractionSource from '!raw-loader!./ComplexInteraction';
import MediaCard from './MediaCard';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MediaCardSource from '!raw-loader!./MediaCard';
import UIControls from './UIControls';
// eslint-disable-next-line import/no-webpack-loader-syntax
import UIControlsSource from '!raw-loader!./UIControls';

const Cards = () => {
  return (
    <>
      <ComponentHeader
        title='Cards'
        description='Cards contain content and actions about a single subject.'
        refUrl='https://material-ui.com/components/cards/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Simple Card'
            component={SimpleCard}
            source={SimpleCardSource}
            description='Although cards can support multiple actions, UI controls, and an overflow menu, use restraint and remember that cards are entry points to more complex and detailed information.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='UI Controls'
            component={UIControls}
            source={UIControlsSource}
            description='Supplemental actions within the card are explicitly called out using icons, text, and UI controls, typically placed at the bottom of the card..'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Complex Interaction'
            component={ComplexInteraction}
            source={ComplexInteractionSource}
            description='On desktop, card content can expand.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Media Card'
            component={MediaCard}
            source={MediaCardSource}
            description='Example of a card using an image to reinforce the content.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Cards;
