import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';
import SimpleAppBar from './SimpleAppBar';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleAppBarSource from '!raw-loader!./SimpleAppBar';
import AppBarPrimarySearchField from './AppBarPrimarySearchField';
// eslint-disable-next-line import/no-webpack-loader-syntax
import AppBarPrimarySearchFieldSource from '!raw-loader!./AppBarPrimarySearchField';
import AppBarWithMenu from './AppBarWithMenu';
// eslint-disable-next-line import/no-webpack-loader-syntax
import AppBarWithMenuSource from '!raw-loader!./AppBarWithMenu';
import AppBarWithSearchField from './AppBarWithSearchField';
// eslint-disable-next-line import/no-webpack-loader-syntax
import AppBarWithSearchFieldSource from '!raw-loader!./AppBarWithSearchField';
import DenseAppBar from './DenseAppBar';
// eslint-disable-next-line import/no-webpack-loader-syntax
import DenseAppBarSource from '!raw-loader!./DenseAppBar';
import BottomAppBar from './BottomAppBar';
// eslint-disable-next-line import/no-webpack-loader-syntax
import BottomAppBarSource from '!raw-loader!./BottomAppBar';
import ElevateAppBar from './ElevateAppBar';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ElevateAppBarSource from '!raw-loader!./ElevateAppBar';
import BackToTop from './BackToTop';
// eslint-disable-next-line import/no-webpack-loader-syntax
import BackToTopSource from '!raw-loader!./BackToTop';
import HideAppBar from './HideAppBar';
// eslint-disable-next-line import/no-webpack-loader-syntax
import HideAppBarSource from '!raw-loader!./HideAppBar';
import {makeStyles} from '@material-ui/core/styles';

const AppBars = (props) => {
  const useStyles = makeStyles((theme) => ({
    relative: {
      position: 'relative',
    },
  }));
  const classes = useStyles(props);
  return (
    <>
      <ComponentHeader
        title='App Bar'
        description='The App Bar displays information and actions relating to the current screen.'
        refUrl='https://material-ui.com/components/app-bar'
      />

      <GridContainer>
        <Grid item xs={12} className={classes.relative}>
          <ComponentCard
            title='Simple App Bar'
            component={SimpleAppBar}
            source={SimpleAppBarSource}
          />
        </Grid>
        <Grid item xs={12} className={classes.relative}>
          <ComponentCard
            title='App Bar with a primary search field'
            component={AppBarPrimarySearchField}
            source={AppBarPrimarySearchFieldSource}
            description='A primary searchbar..'
          />
        </Grid>
        <Grid item xs={12} className={classes.relative}>
          <ComponentCard
            title='App Bar with menu'
            component={AppBarWithMenu}
            source={AppBarWithMenuSource}
          />
        </Grid>
        <Grid item xs={12} className={classes.relative}>
          <ComponentCard
            title='App Bar with search field'
            component={AppBarWithSearchField}
            source={AppBarWithSearchFieldSource}
            description='A side searchbar...'
          />
        </Grid>
        <Grid item xs={12} className={classes.relative}>
          <ComponentCard
            title='Dense App Bar'
            component={DenseAppBar}
            source={DenseAppBarSource}
          />
        </Grid>
        <Grid item xs={12} className={classes.relative}>
          <ComponentCard
            title='Hide App Bar'
            component={HideAppBar}
            source={HideAppBarSource}
            description='The app bar hides on scroll down to leave more space for reading.'
          />
        </Grid>
        <Grid item xs={12} className={classes.relative}>
          <ComponentCard
            title='Bottom App Bar'
            component={BottomAppBar}
            source={BottomAppBarSource}
            description='The app bar hides on scroll down to leave more space for reading.'
          />
        </Grid>
        <Grid item xs={12} className={classes.relative}>
          <ComponentCard
            title='Elevate App Bar'
            component={ElevateAppBar}
            source={ElevateAppBarSource}
            description='The app bar elevates on scroll to communicate that the user is not at the top of the page.'
          />
        </Grid>
        <Grid item xs={12} className={classes.relative}>
          <ComponentCard
            title='Back to top'
            component={BackToTop}
            source={BackToTopSource}
            description='A floating action buttons appears on scroll to make it easy to get back to the top of the page.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default AppBars;
