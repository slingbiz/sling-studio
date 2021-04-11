import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import Simple from './Simple';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleSource from '!raw-loader!./Simple';
import Description from './Description';
// eslint-disable-next-line import/no-webpack-loader-syntax
import DescriptionSource from '!raw-loader!./Description';
import Actions from './Actions';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ActionsSource from '!raw-loader!./Actions';

import Transition from './Transition';
// eslint-disable-next-line import/no-webpack-loader-syntax
import TransitionSource from '!raw-loader!./Transition';

import Icons from './Icons';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconsSource from '!raw-loader!./Icons';
import Variants from './Variants';
// eslint-disable-next-line import/no-webpack-loader-syntax
import VariantsSource from '!raw-loader!./Variants';
import Filled from './Filled';
// eslint-disable-next-line import/no-webpack-loader-syntax
import FilledSource from '!raw-loader!./Filled';

const Modals = () => {
  return (
    <>
      <ComponentHeader
        title='Alert'
        description="An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task."
        refUrl='https://material-ui.com/components/alert/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Simple alerts'
            component={Simple}
            source={SimpleSource}
            description='The alert offers four severity levels that set a distinctive icon and color.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Description'
            component={Description}
            source={DescriptionSource}
            description='You can use the AlertTitle component to display a formatted title above the content.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Actions'
            component={Actions}
            source={ActionsSource}
            description='An alert can have an action, such as a close or undo button. It is rendered after the message, at the end of the alert.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Transition'
            component={Transition}
            source={TransitionSource}
            description='You can use a transition component such as Collapse to transition the appearance of the alert.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Icons'
            component={Icons}
            source={IconsSource}
            description='The icon prop allows you to add an icon to the beginning of the alert component. This will override the default icon for the specified severity.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Variants'
            component={Variants}
            source={VariantsSource}
            description='Two additional variants are available – outlined, and filled:'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Filled'
            component={Filled}
            source={FilledSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Modals;
