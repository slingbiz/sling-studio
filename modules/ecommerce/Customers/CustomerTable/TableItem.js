import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import useStyles from './TableItem.style';
import OrderActions from './OrderActions';
import StarRateIcon from '@material-ui/icons/StarRate';

const TableItem = ({data}) => {
  const classes = useStyles();
  return (
    <TableRow key={data.name} className='item-hover'>
      <TableCell component='th' scope='row' className={classes.tableCell}>
        <Box className={classes.anchar}>{data.name}</Box>
      </TableCell>
      <TableCell align='left' className={classes.tableCellColor}>
        {data.email}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {data.lastItem}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {data.lastOrder}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        <Box
          component='span'
          color='white'
          bgcolor='#388E3C'
          width={42}
          mr={2}
          px={2}
          display='flex'
          alignItems='center'
          height={18}
          borderRadius={10}
          fontSize={12}>
          {data.rating} <StarRateIcon style={{fontSize: 16}} />
        </Box>
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {data.balance}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {data.address}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {data.joinDate}
      </TableCell>
      <TableCell align='right' className={classes.tableCell}>
        <OrderActions />
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
};
