import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import SimpleSnackbars from './SimpleSnackbars';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleSnackbarsSource from '!raw-loader!./SimpleSnackbars';
import CustomizedSnackbars from './CustomizedSnackbars';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedSnackbarsSource from '!raw-loader!./CustomizedSnackbars';
import PositionedSnackbars from './PositionedSnackbars';
// eslint-disable-next-line import/no-webpack-loader-syntax
import PositionedSnackbarsSource from '!raw-loader!./PositionedSnackbars';
import MessageLength from './MessageLength';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MessageLengthSource from '!raw-loader!./MessageLength';
import TransitionsSnckbar from './TransitionsSnckbar';
// eslint-disable-next-line import/no-webpack-loader-syntax
import TransitionsSnckbarSource from '!raw-loader!./TransitionsSnckbar';
import SnackbarsFAB from './SnackbarsFAB';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SnackbarsFABSource from '!raw-loader!./SnackbarsFAB';
import ControlSlideDirection from './ControlSlideDirection';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ControlSlideDirectionSource from '!raw-loader!./ControlSlideDirection';
import SnackbarNotistack from './SnackbarNotistack';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SnackbarNotistackSource from '!raw-loader!./SnackbarNotistack';
import ChangeTransition from './ChangeTransition';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ChangeTransitionSource from '!raw-loader!./ChangeTransition';

const Snacksbars = () => {
  return (
    <>
      <ComponentHeader
        title='Snackbars'
        description='Snackbars provide brief messages about app processes. The component is also known as a toast.'
        refUrl='https://material-ui.com/components/snackbars/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Message Length'
            component={MessageLength}
            source={MessageLengthSource}
            description='Some snackbars with varying message length...'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Customized snackbars'
            component={CustomizedSnackbars}
            source={CustomizedSnackbarsSource}
            description='Here are some examples of customizing the component. You can learn more about this in the overrides documentation page.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Positioned snackbars'
            component={PositionedSnackbars}
            source={PositionedSnackbarsSource}
            description='There may be circumstances when the placement of the snackbar needs to be more flexible.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Simple snackbars'
            component={SimpleSnackbars}
            source={SimpleSnackbarsSource}
            description="A basic snackbar that aims to reproduce Google Keep's snackbar behavior."
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Transitions'
            component={TransitionsSnckbar}
            source={TransitionsSnckbarSource}
            description='Some snackbars with varying message length...'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Snackbars and floating action buttons'
            component={SnackbarsFAB}
            source={SnackbarsFABSource}
            description='Some snackbars with varying message length...'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Change Transition'
            component={ChangeTransition}
            source={ChangeTransitionSource}
            description='Grow is the default transition but you can use a different one.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Control Slide direction'
            component={ControlSlideDirection}
            source={ControlSlideDirectionSource}
            description='You can change the direction of the Slide transition..'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Snackbar notistack'
            component={SnackbarNotistack}
            source={SnackbarNotistackSource}
            description="In the following example, we demonstrate how to use notistack. notistack makes it easy to display snackbars (so you don't have to deal with open/close state of them). It also enables you to stack them on top of one another (although this is discouraged by the specification)."
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Snacksbars;
