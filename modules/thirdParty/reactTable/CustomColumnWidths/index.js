import React from 'react';
import {makeData} from '../data/Utils';
// Import React Table
import ReactTable from 'react-table';

class CustomColumnWidths extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData(),
    };
  }

  render() {
    const {data} = this.state;
    return (
      <ReactTable
        data={data}
        columns={[
          {
            Header: 'Name',
            columns: [
              {
                Header: 'First Name',
                accessor: 'firstName',
                maxWidth: 200,
              },
              {
                Header: 'Last Name',
                id: 'lastName',
                accessor: (d) => d.lastName,
                width: 300,
              },
            ],
          },
          {
            Header: 'Info',
            columns: [
              {
                Header: 'Age',
                accessor: 'age',
                minWidth: 400,
              },
            ],
          },
        ]}
        defaultPageSize={10}
        className='-striped -highlight'
      />
    );
  }
}

export default CustomColumnWidths;
