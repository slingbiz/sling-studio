import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import {Box, makeStyles} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import PageviewIcon from '@material-ui/icons/Pageview';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {green, red} from '@material-ui/core/colors';
import {Fonts} from '../../../../../shared/constants/AppEnums';

const TableItem = (props) => {
  const {row} = props;
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
    tableCellColor: {
      color: green[600],
    },
    fontLIGHT: {
      fontWeight: Fonts.MEDIUM,
    },
    whitespaceNowrap: {
      whiteSpace: 'nowrap',
    },
    avatar: {
      width: 40,
      height: 40,
      padding: 12,
      backgroundColor: row.image ? row.color : red[500],
      [theme.breakpoints.up('xl')]: {
        width: 50,
        height: 50,
      },
    },
  }));
  const classes = useStyles(props);
  return (
    <TableRow className={clsx(classes.borderBottomClass, 'item-hover')}>
      <TableCell component='th' scope='row' className={classes.tableCell}>
        {row.id}.
      </TableCell>
      <TableCell
        align='left'
        className={clsx(classes.tableCell, classes.whitespaceNowrap)}>
        <Box display='flex'>
          <Box mr={{xs: 3, xl: 5}}>
            {row.image ? (
              <Avatar className={classes.avatar}>
                <img src={row.image} alt='' />
              </Avatar>
            ) : (
              <Avatar className={classes.avatar}>
                <PageviewIcon />
              </Avatar>
            )}
          </Box>
          <Box component='span' mt={3} mr={1} fontWeight={700}>
            {row.name}
          </Box>
          <Box color='text.secondary' ml={1} mt={3}>
            ({row.shortName})
          </Box>
        </Box>
      </TableCell>
      <TableCell
        align='left'
        className={clsx(classes.tableCell, classes.fontLIGHT)}>
        ${row.marketCap}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        ${row.volume}
      </TableCell>
      <TableCell
        align='right'
        className={clsx(
          classes.tableCell,
          classes.fontLIGHT,
          classes.whitespaceNowrap,
          classes.tableCellColor,
        )}>
        {row.h} %
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  row: PropTypes.object.isRequired,
};
