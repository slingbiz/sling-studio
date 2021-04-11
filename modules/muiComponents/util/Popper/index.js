import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import SimplePopper from './SimplePopper';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimplePopperSource from '!raw-loader!./SimplePopper';
import MinimalistPopper from './MinimalistPopper';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MinimalistPopperSource from '!raw-loader!./MinimalistPopper';
import PositionedPopper from './PositionedPopper';
// eslint-disable-next-line import/no-webpack-loader-syntax
import PositionedPopperSource from '!raw-loader!./PositionedPopper';
import WithoutTransitionPopper from './WithoutTransitionPopper';
// eslint-disable-next-line import/no-webpack-loader-syntax
import WithoutTransitionPopperSource from '!raw-loader!./WithoutTransitionPopper';

const Poppers = () => {
  return (
    <>
      <ComponentHeader
        title='Popper'
        description="A Popper can be used to display some content on top of another. It's an alternative to react-popper."
        refUrl='https://material-ui.com/components/popper/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Simple Paper'
            component={SimplePopper}
            source={SimplePopperSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Minimalist Popper'
            component={MinimalistPopper}
            source={MinimalistPopperSource}
            description='You can use the component with zero extra dependencies.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Positioned Popper'
            component={PositionedPopper}
            source={PositionedPopperSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Without transition Popper'
            component={WithoutTransitionPopper}
            source={WithoutTransitionPopperSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Poppers;
