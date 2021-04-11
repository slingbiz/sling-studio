import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import TableRow from '@material-ui/core/TableRow';
import {makeStyles} from '@material-ui/core';
import {Fonts} from '../../../../../shared/constants/AppEnums';

const TableHeading = (props) => {
  const useStyles = makeStyles((theme) => ({
    borderBottomClass: {
      borderBottom: '0 none',
    },
    tableCell: {
      borderBottom: '0 none',
      fontSize: 13,
      padding: 8,
      fontWeight: Fonts.BOLD,
      '&:first-child': {
        paddingLeft: 20,
      },
      '&:last-child': {
        paddingRight: 20,
      },
    },
  }));
  const classes = useStyles(props);
  return (
    <TableRow className={classes.borderBottomClass}>
      <TableCell className={classes.tableCell}>
        <IntlMessages id='common.num' />
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        <IntlMessages id='common.name' />
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        <IntlMessages id='dashboard.marketCap' />
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        <IntlMessages id='dashboard.volume24h' />
      </TableCell>
      <TableCell align='right' className={classes.tableCell}>
        <IntlMessages id='dashboard.24h' /> %
      </TableCell>
    </TableRow>
  );
};

export default TableHeading;
