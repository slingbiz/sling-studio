import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import {grey} from '@material-ui/core/colors/index';
import {isBreakPointDown} from '../../../../../@crema/utility/Utils';
import AppTableContainer from '../../../../../@crema/core/AppTableContainer';

const useStyles = makeStyles((theme) => ({
  borderBottomClass: {
    borderBottom: '0 none',
  },
  tableResponsiveMaterial: {
    minHeight: '.01%',
    overflowX: 'auto',

    '@media (max-width: 767px)': {
      width: '100%',
      marginBottom: 15,
      overflowY: 'hidden',
      border: `1px solid ${grey[300]}`,
      '& > table': {
        marginBottom: 0,
        '& > thead > tr > th, > tbody > tr > th, > tfoot > tr > th, thead > tr > td, tbody > tr > td, tfoot > tr > td': {
          whiteSpace: 'nowrap',
        },
      },
    },
  },
}));
const getData = (data) => {
  if (isBreakPointDown('xl')) {
    return data.slice(0, 9);
  } else {
    return data.slice(0, 7);
  }
};

const TicketSupportTable = (props) => {
  const ticketSupportData = getData(props.ticketSupportData);

  const classes = useStyles(props);
  return (
    <AppTableContainer>
      <Table>
        <TableHead className={classes.borderBottomClass}>
          <TableHeading />
        </TableHead>
        <TableBody className={classes.borderBottomClass}>
          {ticketSupportData.map((row, index) => (
            <TableItem key={row.name + index} row={row} />
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default TicketSupportTable;

TicketSupportTable.defaultProps = {
  ticketSupportData: [],
};

TicketSupportTable.propTypes = {
  ticketSupportData: PropTypes.array,
};
