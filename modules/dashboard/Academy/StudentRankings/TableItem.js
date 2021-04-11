import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import {makeStyles} from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  tableCell: {
    fontSize: 13,
    padding: '12px 8px',
    '&:first-child': {
      paddingLeft: 20,
    },
    '&:last-child': {
      paddingRight: 20,
    },
  },
  whiteSpace: {
    whiteSpace: 'nowrap',
  },
  newBadge: {
    borderRadius: 30,
    color: '#D69D5A',
    backgroundColor: '#FEF1E4',
    textAlign: 'center',
    padding: theme.spacing(1, 3),
    fontWeight: Fonts.MEDIUM,
  },
}));

const TableItem = ({data}) => {
  const classes = useStyles();

  return (
    <TableRow key={data.name} className='item-hover'>
      <TableCell className={classes.tableCell}>
        <Box display='flex' alignItems='center'>
          <Box mr={3} clone>
            <Avatar src={data.profile_pic} />
          </Box>
          <Box fontWeight={Fonts.BOLD}>{data.name}</Box>
        </Box>
      </TableCell>
      <TableCell className={classes.tableCell}>
        <Box>{data.courseId}</Box>
      </TableCell>
      <TableCell className={classes.tableCell}>
        <Box>{data.courseName}</Box>
      </TableCell>
      <TableCell className={classes.tableCell}>
        <Box>{data.totalGrade} point</Box>
      </TableCell>
      <TableCell className={classes.tableCell}>
        <Box> Ranking {data.ranking}</Box>
      </TableCell>
      <TableCell className={classes.tableCell}>
        <Box className={classes.newBadge}>{data.category}</Box>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
};
