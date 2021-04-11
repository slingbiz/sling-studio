import MaterialTable from 'material-table';
import React from 'react';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core';

const SimpleAction = (props) => {
  const useStyles = makeStyles(() => ({
    materialTable: {
      '& .MuiTableCell-paddingCheckbox': {
        paddingLeft: 16,
      },
    },
  }));

  const classes = useStyles(props);

  return (
    <Box className={classes.materialTable}>
      <MaterialTable
        title='Simple Action Preview'
        columns={[
          {title: 'Name', field: 'name'},
          {title: 'Surname', field: 'surname'},
          {title: 'Birth Year', field: 'birthYear', type: 'numeric'},
          {
            title: 'Birth Place',
            field: 'birthCity',
            lookup: {34: 'İstanbul', 63: 'Şanlıurfa'},
          },
        ]}
        data={[
          {name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63},
          {
            name: 'Zerya Betül',
            surname: 'Baran',
            birthYear: 2017,
            birthCity: 34,
          },
        ]}
        actions={[
          {
            icon: 'save',
            tooltip: 'Save User',
            onClick: (event, rowData) => alert('You saved ' + rowData.name),
          },
        ]}
      />
    </Box>
  );
};
export default SimpleAction;
