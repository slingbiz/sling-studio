import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../shared/constants/AppEnums';

const TableHeading = (props) => {
  const useStyles = makeStyles((theme) => ({
    tableRowRoot: {
      position: 'relative',
    },
    tableCellRoot: {
      borderBottom: '0 none',
      fontSize: 13,
      padding: 8,
      paddingTop: 0,
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

  const classes = useStyles(props);
  return (
    <TableRow className={classes.tableRowRoot}>
      <TableCell align='left' className={classes.tableCellRoot}>
        Student Name
      </TableCell>
      <TableCell align='left' className={classes.tableCellRoot}>
        Course ID
      </TableCell>
      <TableCell align='left' className={classes.tableCellRoot}>
        Course Name
      </TableCell>
      <TableCell align='left' className={classes.tableCellRoot}>
        Total Grade
      </TableCell>
      <TableCell align='left' className={classes.tableCellRoot}>
        Ranking
      </TableCell>
      <TableCell align='left' className={classes.tableCellRoot}>
        Category
      </TableCell>
    </TableRow>
  );
};

export default TableHeading;
