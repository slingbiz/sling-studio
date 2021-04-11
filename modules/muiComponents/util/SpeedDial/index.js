import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import SimpleSpeedDial from './SimpleSpeedDial';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleSpeedDialSource from '!raw-loader!./SimpleSpeedDial';
import CustomCloseIcon from './CustomCloseIcon';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomCloseIconSource from '!raw-loader!./CustomCloseIcon';
import PersistentActionTooltips from './PersistentActionTooltips';
// eslint-disable-next-line import/no-webpack-loader-syntax
import PersistentActionTooltipsSource from '!raw-loader!./PersistentActionTooltips';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  relative: {
    position: 'relative',
  },
}));
const SpeedDial = (props) => {
  const classes = useStyles(props);

  return (
    <>
      <ComponentHeader
        title='Speed Dial'
        description='When pressed, a floating action button can display three to six related actions in the form of a speed dial.'
        refUrl='https://material-ui.com/components/speed-dial/'
      />

      <GridContainer>
        <Grid item xs={12} className={classes.relative}>
          <ComponentCard
            title='Simple Speed Dial'
            component={SimpleSpeedDial}
            source={SimpleSpeedDialSource}
            description='The floating action button can display related actions.'
          />
        </Grid>
        <Grid item xs={12} className={classes.relative}>
          <ComponentCard
            title='Custom close icon'
            component={CustomCloseIcon}
            source={CustomCloseIconSource}
            description='You can provide an alternate icon for the closed and open states using the icon and openIcon props of the SpeedDialIcon component.'
          />
        </Grid>
        <Grid item xs={12} className={classes.relative}>
          <ComponentCard
            title='Persistent action tooltips'
            component={PersistentActionTooltips}
            source={PersistentActionTooltipsSource}
            description="The SpeedDialActions tooltips can be be displayed persistently so that users don't have to long-press in order to see the tooltip on touch devices."
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default SpeedDial;
