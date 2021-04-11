import React from 'react';
import Grid from '@material-ui/core/Grid';

import ComponentCard from '../../../../@crema/core/ComponentCard';
import ComponentHeader from '../../../../@crema/core/ComponentHeader';
import GridContainer from '../../../../@crema/core/GridContainer';

import SimpleTable from './SimpleTable';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleTableSource from '!raw-loader!./SimpleTable';
import DenseTable from './DenseTable';
// eslint-disable-next-line import/no-webpack-loader-syntax
import DenseTableSource from '!raw-loader!./DenseTable';
import SortingNSelecting from './SortingNSelecting';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SortingNSelectingSource from '!raw-loader!./SortingNSelecting';
import CustomizedTables from './CustomizedTables';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedTablesSource from '!raw-loader!./CustomizedTables';
import CustomTablePaginationAction from './CustomTablePaginationAction';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomTablePaginationActionSource from '!raw-loader!./CustomTablePaginationAction';
import FixedHeader from './FixedHeader';
// eslint-disable-next-line import/no-webpack-loader-syntax
import FixedHeaderSource from '!raw-loader!./FixedHeader';
import SpanningTable from './SpanningTable';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SpanningTableSource from '!raw-loader!./SpanningTable';
import VirtualizedTable from './VirtualizedTable';
// eslint-disable-next-line import/no-webpack-loader-syntax
import VirtualizedTableSource from '!raw-loader!./VirtualizedTable';
import ComplementaryProjects from './ComplementaryProjects';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ComplementaryProjectsSource from '!raw-loader!./ComplementaryProjects';

const Tables = () => {
  return (
    <>
      <ComponentHeader
        title='Tables'
        description='Data tables display sets of data. They can be fully customized'
        refUrl='https://material-ui.com/components/tables/'
      />

      <GridContainer>
        <Grid item xs={12}>
          <ComponentCard
            title='Simple Table'
            component={SimpleTable}
            source={SimpleTableSource}
            description='A simple example with no frills.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Dense Table'
            component={DenseTable}
            source={DenseTableSource}
            description='A simple example of a dense table with no frills.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Sorting & Selecting'
            component={SortingNSelecting}
            source={SortingNSelectingSource}
            description='This example demonstrates the use of Checkbox and clickable rows for selection, with a custom Toolbar. It uses the TableSortLabel component to help style column headings.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Customized tables'
            component={CustomizedTables}
            source={CustomizedTablesSource}
            description='Here is an example of customizing the component. You can learn more about this in the overrides documentation page.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Custom Table Pagination Action'
            component={CustomTablePaginationAction}
            source={CustomTablePaginationActionSource}
            description='The Action property of the TablePagination component allows the implementation of custom actions.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Fixed header'
            component={FixedHeader}
            source={FixedHeaderSource}
            description='An example of a table with scrollable rows and fixed column headers. It leverages the stickyHeader prop (⚠️ no IE 11 support).'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Spanning Table'
            component={SpanningTable}
            source={SpanningTableSource}
            description='A simple example with spanning rows & columns.'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Virtualized Table'
            component={VirtualizedTable}
            source={VirtualizedTableSource}
            description='In the following example, we demonstrate how to use react-virtualized with the Table component. It renders 200 rows and can easily handle more. Virtualization helps with performance issues..'
          />
        </Grid>
        <Grid item xs={12}>
          <ComponentCard
            title='Complementary projects'
            component={ComplementaryProjects}
            source={ComplementaryProjectsSource}
            description='For more advanced use cases you might be able to take advantage of:.'
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Tables;
