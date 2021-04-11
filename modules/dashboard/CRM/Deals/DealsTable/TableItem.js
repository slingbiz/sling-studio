import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import {Box, makeStyles} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {blue, green, red} from '@material-ui/core/colors';
import {Fonts} from '../../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  borderBottomClass: {
    borderBottom: '0 none',
  },
  tableCell: {
    borderBottom: '0 none',
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
  tableCellColor: {
    color: (props) => `${getProgressColor(props.progress)}`,
  },
}));
const getProgressColor = (progress) => {
  switch (progress) {
    case 'Pending':
      return `${red[600]}`;

    case 'Approved':
      return `${blue[600]}`;

    case 'Application':
      return `${green[600]}`;

    default:
      return `${red[600]}`;
  }
};

const TableItem = (props) => {
  const {row} = props;

  const classes = useStyles({progress: row.progress});
  return (
    <TableRow
      key={row.name}
      className={clsx(classes.borderBottomClass, 'item-hover')}>
      <TableCell component='th' scope='row' className={classes.tableCell}>
        {row.id}.
      </TableCell>
      <TableCell
        align='left'
        className={clsx(classes.tableCell, classes.whiteSpace)}>
        <Box display='flex' alignItems='center'>
          {row.logo ? (
            <Avatar src={row.logo} />
          ) : (
            <Avatar>{row.name[0].toUpperCase()}</Avatar>
          )}
          <Box component='span' ml={{xs: 3, xl: 5}} fontWeight={Fonts.BOLD}>
            {row.name}
          </Box>
        </Box>
      </TableCell>
      <TableCell
        align='left'
        className={clsx(classes.tableCell, classes.tableCellColor)}>
        <Box component='span' fontWeight={Fonts.REGULAR}>
          {row.progress}
        </Box>
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {row.type}
      </TableCell>
      <TableCell
        align='left'
        className={classes.tableCell}
        fontWeight={Fonts.MEDIUM}>
        {row.amount}
      </TableCell>
      <TableCell
        align='left'
        className={clsx(classes.tableCell, classes.whiteSpace)}>
        {row.created}
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  row: PropTypes.object.isRequired,
};
