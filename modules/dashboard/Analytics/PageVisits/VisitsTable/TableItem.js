import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import {Box, makeStyles} from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const useStyles = makeStyles((theme) => ({
  tableCell: {
    fontSize: 13,
    padding: 8,
    '&:first-child': {
      paddingLeft: 20,
    },
    '&:last-child': {
      paddingRight: 20,
    },
  },
  whiteSpace: {
    whiteSpace: 'no-wrap',
  },
  tableData: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconGreenColor: {
    color: theme.palette.success.main,
    width: 30,
    height: 30,
  },
  iconSecondaryColor: {
    color: theme.palette.secondary.main,
    width: 30,
    height: 30,
  },
}));

const TableItem = ({data}) => {
  const classes = useStyles();
  return (
    <TableRow key={data.id} className='item-hover'>
      <TableCell component='th' scope='data' className={classes.tableCell}>
        {data.page}
      </TableCell>
      <TableCell align='right' className={classes.tableCell}>
        <Box className={classes.tableData}>
          <ArrowDropUpIcon className={classes.iconGreenColor} /> {data.pageView}
        </Box>
      </TableCell>
      <TableCell align='right' className={classes.tableCell}>
        <Box className={classes.tableData}>
          <ArrowDropDownIcon className={classes.iconSecondaryColor} />
          {data.visitors}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
};
