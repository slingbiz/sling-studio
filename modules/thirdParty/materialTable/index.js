import React from 'react';
import Grid from '@material-ui/core/Grid';
import ComponentHeader from '../../../@crema/core/ComponentHeader';
import GridContainer from '../../../@crema/core/GridContainer';
import Simple from './Simple';

import Actions from './Actions';

import CustomColumn from './CustomColumn';

import DetailPanel from './DetailPanel';

import Editable from './Editable';

import Export from './Export';

import Filtering from './Filtering';

import Grouping from './Grouping';

import RemoteData from './RemoteData';

import Selection from './Selection';

const ReactTable = () => {
  return (
    <>
      <ComponentHeader
        title='React Table'
        description='Hooks for building fast and extendable tables and datagrids for React.'
        refUrl='https://github.com/tannerlinsley/react-table/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <Simple />
        </Grid>
        <Grid item xs={12}>
          <Actions />
        </Grid>
        <Grid item xs={12}>
          <CustomColumn />
        </Grid>
        <Grid item xs={12}>
          <DetailPanel />
        </Grid>
        <Grid item xs={12}>
          <Editable />
        </Grid>
        <Grid item xs={12}>
          <Export />
        </Grid>
        <Grid item xs={12}>
          <Filtering />
        </Grid>
        <Grid item xs={12}>
          <Grouping />
        </Grid>
        <Grid item xs={12}>
          <RemoteData />
        </Grid>
        <Grid item xs={12}>
          <Selection />
        </Grid>
      </GridContainer>
    </>
  );
};

export default ReactTable;
