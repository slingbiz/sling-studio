import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import SimpleModal from './SimpleModal';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleModalSource from '!raw-loader!./SimpleModal';
import TransitionsModal from './TransitionsModal';
// eslint-disable-next-line import/no-webpack-loader-syntax
import TransitionsModalSource from '!raw-loader!./TransitionsModal';

const Modals = () => {
  return (
    <>
      <ComponentHeader
        title='Modal'
        description='The modal component provides a solid foundation for creating dialogs, popovers, lightboxes, or whatever else.'
        refUrl='https://material-ui.com/components/modal/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Simple modal'
            component={SimpleModal}
            source={SimpleModalSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Transitions modal'
            component={TransitionsModal}
            source={TransitionsModalSource}
            description='The open/close state of the modal can be animated with a transition component. This component should respect the following conditions.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Modals;
