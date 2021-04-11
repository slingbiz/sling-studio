import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {makeStyles} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  tableRowRoot: {
    color: grey[500],
  },
  tableCellRoot: {
    borderBottom: '0 none',
    fontSize: 13,
    padding: 8,
    fontWeight: Fonts.BOLD,
    whiteSpace: 'nowrap',
    '&:first-child': {
      paddingLeft: 20,
    },
    '&:last-child': {
      paddingRight: 20,
    },
  },
}));

const TableHeading = (props) => {
  const classes = useStyles(props);
  return (
    <TableRow className={classes.tableRowRoot}>
      <TableCell align='left' className={classes.tableCellRoot}>
        Product
      </TableCell>
      <TableCell align='left' className={classes.tableCellRoot}>
        Unit Price
      </TableCell>
      <TableCell align='left' className={classes.tableCellRoot}>
        QTY
      </TableCell>
      <TableCell align='left' className={classes.tableCellRoot}>
        Total
      </TableCell>
      <TableCell className={classes.tableCellRoot} />
    </TableRow>
  );
};

export default TableHeading;
