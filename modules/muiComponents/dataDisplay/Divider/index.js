import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import ListDividers from './ListDividers';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ListDividersSource from '!raw-loader!./ListDividers';
import InsetDividers from './InsetDividers';
// eslint-disable-next-line import/no-webpack-loader-syntax
import InsetDividersSource from '!raw-loader!./InsetDividers';
import MiddleDividers from './MiddleDividers';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MiddleDividersSource from '!raw-loader!./MiddleDividers';
import SubheaderDividers from './SubheaderDividers';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SubheaderDividersSource from '!raw-loader!./SubheaderDividers';

const Dividers = () => {
  return (
    <>
      <ComponentHeader
        title='Dividers'
        description='A divider is a thin line that groups content in lists and layouts.'
        refUrl='https://material-ui.com/components/dividers/'
      />

      <GridContainer>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='List Dividers'
            component={ListDividers}
            source={ListDividersSource}
            description='The divider renders as an <hr> by default. You can save rendering this DOM element by using the divider property on the ListItem component.'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Inset Dividers'
            component={InsetDividers}
            source={InsetDividersSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Subheader Dividers'
            component={SubheaderDividers}
            source={SubheaderDividersSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ComponentCard
            title='Middle Dividers'
            component={MiddleDividers}
            source={MiddleDividersSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Dividers;
