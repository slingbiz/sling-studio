import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import Basic from './Basic';
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicSource from '!raw-loader!./Basic';
import Size from './Size';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SizeSource from '!raw-loader!./Size';
import Animation from './Animation';
// eslint-disable-next-line import/no-webpack-loader-syntax
import AnimationSource from '!raw-loader!./Animation';

const Checkboxes = () => {
  return (
    <>
      <ComponentHeader
        title='Floating action button'
        description='A floating action button (FAB) performs the primary, or most common, action on a screen.'
        refUrl='https://material-ui.com/components/floating-action-button/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Floating Action Button'
            component={Basic}
            source={BasicSource}
            description='A floating action button appears in front of all screen content, typically as a circular shape with an icon in its center. FABs come in two types: regular, and extended.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Size'
            component={Size}
            source={SizeSource}
            description='Use the size prop for larger or smaller floating action buttons.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Animation'
            component={Animation}
            source={AnimationSource}
            description='The floating action button animates onto the screen as an expanding piece of material, by default.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Checkboxes;
