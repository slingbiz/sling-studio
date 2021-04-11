import React from 'react';

import Simple from './Simple';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleSource from '!raw-loader!./Simple';
import Horizontal from './Horizontal';
// eslint-disable-next-line import/no-webpack-loader-syntax
import HorizontalSource from '!raw-loader!./Horizontal';
import MultipleDrop from './MultipleDrop';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MultipleDropSource from '!raw-loader!./MultipleDrop';
import WithHooks from './WithHooks';
// eslint-disable-next-line import/no-webpack-loader-syntax
import WithHooksSource from '!raw-loader!./WithHooks';
import ComponentCard from '../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../@crema/core/ComponentHeader';
import GridContainer from '../../../@crema/core/GridContainer';
import Grid from '@material-ui/core/Grid';

const ReactBeautifulDnd = () => {
  return (
    <>
      <ComponentHeader
        title='React Beautiful Dnd'
        description='Beautiful and accessible drag and drop for lists with React'
        refUrl='https://react-beautiful-dnd.netlify.com/?path=/story/single-vertical-list--basic'
      />

      <GridContainer>
        <Grid item xs={12} xl={6}>
          <ComponentCard
            title='Simple'
            component={Simple}
            source={SimpleSource}
          />
        </Grid>
        <Grid item xs={12} xl={6}>
          <ComponentCard
            title='WithHooks'
            component={WithHooks}
            source={WithHooksSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='MultipleDrop'
            component={MultipleDrop}
            source={MultipleDropSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Horizontal'
            component={Horizontal}
            source={HorizontalSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default ReactBeautifulDnd;
