import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '../../../../../@crema/core/AppTableContainer';

const PopularCoinsTable = (props) => {
  const {popularCoins} = props;

  const useStyles = makeStyles((theme) => ({
    borderBottomClass: {
      borderBottom: '0 none',
    },
  }));
  const classes = useStyles(props);
  return (
    <AppTableContainer>
      <Table>
        <TableHead className={classes.borderBottomClass}>
          <TableHeading />
        </TableHead>
        <TableBody>
          {popularCoins.map((row) => (
            <TableItem key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default PopularCoinsTable;

PopularCoinsTable.defaultProps = {
  popularCoins: [],
};

PopularCoinsTable.propTypes = {
  popularCoins: PropTypes.array,
};
