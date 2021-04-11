import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import SimpleMenu from './SimpleMenu';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleMenuSource from '!raw-loader!./SimpleMenu';
import SelectedMenus from './SelectedMenus';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SelectedMenusSource from '!raw-loader!./SelectedMenus';
import MenuListComposition from './MenuListComposition';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MenuListCompositionSource from '!raw-loader!./MenuListComposition';
import MaxHeightMenus from './MaxHeightMenus';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MaxHeightMenusSource from '!raw-loader!./MaxHeightMenus';
import LimitationsMenus from './LimitationsMenus';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LimitationsMenusSource from '!raw-loader!./LimitationsMenus';
import ChangeTransition from './ChangeTransition';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ChangeTransitionSource from '!raw-loader!./ChangeTransition';
import ComplementaryProjects from './ComplementaryProjects';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ComplementaryProjectsSource from '!raw-loader!./ComplementaryProjects';

const Menus = () => {
  return (
    <>
      <ComponentHeader
        title='Menus'
        description='Menus display a list of choices on temporary surfaces.'
        refUrl='https://material-ui.com/components/transfer-list/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Simple Menu'
            component={SimpleMenu}
            source={SimpleMenuSource}
            description='Simple menus open over the anchor element by default (this option can be changed via props). When close to a screen edge, simple menus vertically realign to make sure that all menu items are completely visible.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Selected menus'
            component={SelectedMenus}
            source={SelectedMenusSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='MenuList composition'
            component={MenuListComposition}
            source={MenuListCompositionSource}
            description='The primary responsibility of the MenuList component is to handle the focus.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Limitations'
            component={LimitationsMenus}
            source={LimitationsMenusSource}
            description='There is a flexbox bug that prevents text-overflow: ellipsis from working in a flexbox layout. You can use the Typography component with noWrap to workaround this issue:.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Customized menus'
            component={SimpleMenu}
            source={SimpleMenuSource}
            description='Here is an example of customizing the component. You can learn more about this in the overrides documentation page.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Max height menus'
            component={MaxHeightMenus}
            source={MaxHeightMenusSource}
            description='If the height of a menu prevents all menu items from being displayed, the menu can scroll internally.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Change transition'
            component={ChangeTransition}
            source={ChangeTransitionSource}
            description='Use a different transition.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Complementary projects'
            component={ComplementaryProjects}
            source={ComplementaryProjectsSource}
            description='There is a 3rd party package material-ui-popup-state that takes care of menu state for you in most cases.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Menus;
