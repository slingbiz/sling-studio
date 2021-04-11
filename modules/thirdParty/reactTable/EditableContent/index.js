import React from 'react';
import {makeData} from '../data/Utils';
// Import React Table
import ReactTable from 'react-table';

class EditableContent extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData(),
    };
    this.renderEditable = this.renderEditable.bind(this);
  }

  renderEditable(cellInfo) {
    return (
      <div
        style={{backgroundColor: '#fafafa'}}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const data = [...this.state.data];
          data[cellInfo.BelowNavHeader][cellInfo.column.id] =
            e.target.innerHTML;
          this.setState({data});
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.BelowNavHeader][cellInfo.column.id],
        }}
      />
    );
  }

  render() {
    const {data} = this.state;
    return (
      <ReactTable
        data={data}
        columns={[
          {
            Header: 'First Name',
            accessor: 'firstName',
            Cell: this.renderEditable,
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
            Cell: this.renderEditable,
          },
          {
            Header: 'Full Name',
            id: 'full',
            accessor: (d) => (
              <div
                dangerouslySetInnerHTML={{
                  __html: d.firstName + ' ' + d.lastName,
                }}
              />
            ),
          },
        ]}
        defaultPageSize={10}
        className='-striped -highlight'
      />
    );
  }
}

export default EditableContent;
