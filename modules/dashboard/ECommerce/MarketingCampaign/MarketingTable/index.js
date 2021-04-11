import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import PropTypes from 'prop-types';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import TableContainer from '@material-ui/core/TableContainer';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    maxHeight: 500,
  },
});
const OrderTable = ({marketingCampaign}) => {
  const classes = useStyles();
  return (
    <TableContainer className={classes.table}>
      <Table stickyHeader>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {marketingCampaign.map((data) => (
            <TableItem data={data} key={data.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;

OrderTable.defaultProps = {
  transactionData: [],
};

OrderTable.propTypes = {
  transactionData: PropTypes.array,
};
