import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import TableRow from '@material-ui/core/TableRow';
import {Box, makeStyles} from '@material-ui/core';
import clsx from 'clsx';
import {Fonts} from '../../../../shared/constants/AppEnums';

const TableHeading = (props) => {
  const useStyles = makeStyles((theme) => ({
    textUppercase: {
      textTransform: 'uppercase',
    },
    textRes: {
      fontSize: 13,
    },
  }));

  const classes = useStyles(props);
  return (
    <TableRow>
      <TableCell>
        <Box
          color='grey.700'
          className={clsx(classes.textUppercase, classes.textRes)}
          fontWeight={Fonts.BOLD}>
          <IntlMessages id='invoice.itemDesc' />
        </Box>
      </TableCell>
      <TableCell>
        <Box
          color='grey.700'
          textAlign='right'
          className={clsx(classes.textUppercase, classes.textRes)}
          fontWeight={Fonts.BOLD}>
          <IntlMessages id='invoice.assignment' />
        </Box>
      </TableCell>
      <TableCell>
        <Box
          color='grey.700'
          textAlign='right'
          className={clsx(classes.textUppercase, classes.textRes)}
          fontWeight={Fonts.BOLD}>
          <IntlMessages id='invoice.quantity' />
        </Box>
      </TableCell>
      <TableCell>
        <Box
          color='grey.700'
          textAlign='right'
          className={clsx(classes.textUppercase, classes.textRes)}
          fontWeight={Fonts.BOLD}>
          <IntlMessages id='dashboard.price' />
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableHeading;
