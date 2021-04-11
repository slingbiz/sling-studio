import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../../shared/constants/AppEnums';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  tableRowRoot: {
    '& td': {
      borderBottomColor: '#E5E4EA',
      fontSize: 13,
      padding: 8,
      '&:first-child': {
        paddingLeft: 20,
      },
      '&:last-child': {
        paddingRight: 20,
      },
    },
  },
  textBase: {
    fontSize: 14,
    flex: 1,
  },
}));
const TableItem = (props) => {
  const classes = useStyles(props);

  return (
    <TableRow
      key={props.data.name}
      className={clsx(classes.tableRowRoot, 'item-hover')}>
      <TableCell>
        <Box display='flex' alignItems='center'>
          <Box mr={4} clone>
            <Avatar src={props.data.icon} />
          </Box>
          <Box className={classes.textBase}>
            <Box mb={0.5} fontWeight={Fonts.MEDIUM}>
              {props.data.name}
            </Box>
            <Box component='p' color='text.secondary'>
              {props.data.description}
            </Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell>{props.data.spent}</TableCell>
      <TableCell>
        {props.data.growth ? (
          <img
            src={'/images/dashboard/growth_icon.png'}
            alt='growth_icon'
          />
        ) : (
          <img
            src={'/images/dashboard/decries_icon.png'}
            alt='decries_icon'
          />
        )}
        <Box
          component='span'
          mx={2}
          color={props.data.growth ? '#0A8FDC' : '#F44D50'}>
          {props.data.graph}
        </Box>
        <Box component='span' color='text.secondary'>
          {props.data.growth ? 'Up' : 'Down'}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
};
