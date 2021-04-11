import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import useStyles from './TableItem.style';
import AppMenu from '../../../../../@crema/core/AppMenu';
import Avatar from '@material-ui/core/Avatar';
import {Fonts} from '../../../../../shared/constants/AppEnums';

const TableItem = ({data}) => {
  const classes = useStyles();

  return (
    <TableRow key={data.name} className='item-hover'>
      <TableCell component='th' scope='row' className={classes.tableCell}>
        <Box display='flex' alignItems='center'>
          <Box mr={3} clone>
            <Avatar src={data.profile_pic} />
          </Box>
          <Box fontWeight={Fonts.BOLD}>{data.name}</Box>
        </Box>
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {data.gender}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {data.weight}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {data.assignedDr}
      </TableCell>
      <TableCell align='left'>{data.date}</TableCell>
      <TableCell align='left'>
        <Box
          className={classes.badgeRoot}
          style={{
            color: data.color,
            backgroundColor: data.color + '44',
          }}>
          {data.status}
        </Box>
      </TableCell>
      <TableCell align='right'>
        <AppMenu />
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
};
