import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import Basic from './Basic';
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicSource from '!raw-loader!./Basic';
import Outlined from './Outlined';
// eslint-disable-next-line import/no-webpack-loader-syntax
import OutlinedSource from '!raw-loader!./Outlined';
import Rounded from './Rounded';
// eslint-disable-next-line import/no-webpack-loader-syntax
import RoundedSource from '!raw-loader!./Rounded';

import Size from './Size';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SizeSource from '!raw-loader!./Size';

import Buttons from './Buttons';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ButtonsSource from '!raw-loader!./Buttons';
import Ranges from './Ranges';
// eslint-disable-next-line import/no-webpack-loader-syntax
import RangesSource from '!raw-loader!./Ranges';
import Controlled from './Controlled';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ControlledSource from '!raw-loader!./Controlled';
import Table from './Table';
// eslint-disable-next-line import/no-webpack-loader-syntax
import TableSource from '!raw-loader!./Table';

const Modals = () => {
  return (
    <>
      <ComponentHeader
        title='Pagination'
        description='The Pagination component enables the user to select a specific page from a range of pages.'
        refUrl='https://material-ui.com/components/pagination/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Basic '
            component={Basic}
            source={BasicSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Outlined'
            component={Outlined}
            source={OutlinedSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Pagination size'
            component={Size}
            source={SizeSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Rounded'
            component={Rounded}
            source={RoundedSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Buttons'
            component={Buttons}
            source={ButtonsSource}
            description='You can optionally enable first-page and last-page buttons, or disable the previous-page and next-page buttons.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Pagination ranges'
            component={Ranges}
            source={RangesSource}
            description='You can specify how many digits to display either side of current page with the siblingRange prop, and adjacent to the start and end page number with the boundaryRange prop.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Controlled pagination'
            component={Controlled}
            source={ControlledSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Table pagination'
            component={Table}
            source={TableSource}
            description="The Pagination component was designed to paginate a list of arbitrary items when infinite loading isn't used. It's preferred in contexts where SEO is important, for instance, a blog."
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Modals;
