import React from 'react';
import Grid from '@material-ui/core/Grid';
import 'react-table/react-table.css';

import ComponentCard from '../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../@crema/core/ComponentHeader';
import GridContainer from '../../../@crema/core/GridContainer';
import ControlledTable from './ControlledTable';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ControlledTableSource from '!raw-loader!./ControlledTable';
import CustomColumnWidths from './CustomColumnWidths';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomColumnWidthsSource from '!raw-loader!./CustomColumnWidths';
import CustomExpanderPosition from './CustomExpanderPosition';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomExpanderPositionSource from '!raw-loader!./CustomExpanderPosition';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomFiltering from './CustomFiltering';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomFilteringSource from '!raw-loader!./CustomFiltering';
import FixedHeaderVerticalScroll from './FixedHeaderVerticalScroll';
// eslint-disable-next-line import/no-webpack-loader-syntax
import FixedHeaderVerticalScrollSource from '!raw-loader!./FixedHeaderVerticalScroll';
import TableFooter from './TableFooters';
// eslint-disable-next-line import/no-webpack-loader-syntax
import TableFooterSource from '!raw-loader!./TableFooters';
import SimpleTable from './SimpleTable';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleTableSource from '!raw-loader!./SimpleTable';

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
          <ComponentCard
            title='Simple Table'
            component={SimpleTable}
            source={SimpleTableSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Table Footer'
            component={TableFooter}
            source={TableFooterSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Controlled Table'
            component={ControlledTable}
            source={ControlledTableSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Custom Column Widths'
            component={CustomColumnWidths}
            source={CustomColumnWidthsSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Custom Expander Position'
            component={CustomExpanderPosition}
            source={CustomExpanderPositionSource}
          />
        </Grid>
        {/*<Grid item xs={12}>*/}
        {/*  <HipsterComponentCard title="Editable Content"*/}
        {/*                      component={EditableContent}*/}
        {/*                      source={EditableContentSource}*/}
        {/*  />*/}
        {/*</Grid>*/}
        <Grid item xs={12}>
          <ComponentCard
            title='Custom Filtering'
            component={CustomFiltering}
            source={CustomFilteringSource}
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Fixed Header Vertical Scroll'
            component={FixedHeaderVerticalScroll}
            source={FixedHeaderVerticalScrollSource}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default ReactTable;
