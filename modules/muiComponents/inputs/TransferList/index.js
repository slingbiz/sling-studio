import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import SimpleTransferList from './SimpleTransferList';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleTransferListSource from '!raw-loader!./SimpleTransferList';
import EnhancedTransferList from './EnhancedTransferList';
// eslint-disable-next-line import/no-webpack-loader-syntax
import EnhancedTransferListSource from '!raw-loader!./EnhancedTransferList';

const TransferLists = () => {
  return (
    <>
      <ComponentHeader
        title='Transfer List'
        description='transfer list (or shuttle) enables the user to move one or more list items between lists.'
        refUrl='https://material-ui.com/components/transfer-list/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Simple Transfer List'
            component={SimpleTransferList}
            source={SimpleTransferListSource}
            description='For completeness, this example includes buttons for move all, but not every transfer list needs these.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Enhanced Transfer List'
            component={EnhancedTransferList}
            source={EnhancedTransferListSource}
            description='This example exchanges the move all buttons for a select all / select none checkbox, and adds a counter.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default TransferLists;
