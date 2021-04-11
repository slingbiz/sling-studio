import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import CancelIcon from '@material-ui/icons/Cancel';
import {useDispatch} from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import useStyles from './TableItem.style';
import {
  removeCartItem,
  updateCartItem,
} from '../../../../redux/actions/Ecommerce';
import {Fonts} from '../../../../shared/constants/AppEnums';

const TableItem = ({data}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onRemoveItem = (data) => {
    dispatch(removeCartItem(data));
  };

  const onDecrement = () => {
    if (data.count > 0) {
      dispatch(updateCartItem({...data, count: data.count - 1}));
    } else {
      dispatch(removeCartItem(data));
    }
  };
  const onIncrement = () => {
    dispatch(updateCartItem({...data, count: data.count + 1}));
  };

  return (
    <TableRow key={data.name} className='item-hover'>
      <TableCell>
        <Box display='flex'>
          <Box mr={4} clone>
            <Avatar src={data.image} />
          </Box>
          <Box>
            <Box fontSize={14} fontWeight={Fonts.MEDIUM}>
              {data.title}
            </Box>
            <Box color='text.secondary' fontSize={14}>
              Brand: {data.brand}
            </Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell
        align='left'
        className={classes.tableCell}
        fontWeight={Fonts.MEDIUM}>
        ${+data.mrp - +data.discount}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        <Box
          border={1}
          borderRadius={4}
          display='flex'
          borderColor='text.secondary'
          alignItems='center'
          justifyContent='center'
          width={100}
          height={40}>
          <AddIcon className='pointer' onClick={onIncrement} />
          <Box component='span' px={3}>
            {data.count}
          </Box>
          <RemoveIcon className='pointer' onClick={onDecrement} />
        </Box>
      </TableCell>
      <TableCell
        align='left'
        className={classes.tableCell}
        fontWeight={Fonts.MEDIUM}>
        ${(+data.mrp - +data.discount) * +data.count}
      </TableCell>
      <TableCell component='th' scope='row' className={classes.tableCell}>
        <CancelIcon onClick={() => onRemoveItem(data)} />
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
};
