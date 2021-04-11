import React from 'react';
import {makeData} from '../data/Utils';
import ReactTable from 'react-table';

class FixedHeaderVerticalScroll extends React.Component {
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
              },
              {
                Header: 'Last Name',
                id: 'lastName',
                accessor: (d) => d.lastName,
              },
            ],
          },
          {
            Header: 'Info',
            columns: [
              {
                Header: 'Age',
                accessor: 'age',
              },
            ],
          },
        ]}
        defaultPageSize={20}
        style={{
          height: '400px', // This will force the table body to overflow and scroll, since there is not enough room
        }}
        className='-striped -highlight'
      />
    );
  }
}

export default FixedHeaderVerticalScroll;
