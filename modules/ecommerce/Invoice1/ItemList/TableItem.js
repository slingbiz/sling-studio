import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import {Box, makeStyles} from '@material-ui/core';
import clsx from 'clsx';
import {Fonts} from '../../../../shared/constants/AppEnums';

const TableItem = (props) => {
  const {product} = props;

  const useStyles = makeStyles((theme) => ({
    textUppercase: {
      textTransform: 'uppercase',
    },
    textBase: {
      fontSize: 13,
      fontWeight: Fonts.MEDIUM,
    },
    alignTop: {
      verticalAlign: 'top',
    },
  }));

  const classes = useStyles(props);
  return (
    <TableRow>
      <TableCell component='th' scope='row'>
        <Box mb={2} className={clsx(classes.textUppercase, classes.textBase)}>
          {product.item}
        </Box>
        <Box component='p' color='text.secondary' mb={0}>
          {product.desc}
        </Box>
      </TableCell>
      <TableCell className={classes.alignTop}>
        <Box
          mb={2}
          textAlign='right'
          className={clsx(classes.textUppercase, classes.textBase)}>
          {product.type}
        </Box>
      </TableCell>
      <TableCell className={classes.alignTop}>
        <Box
          mb={2}
          textAlign='right'
          className={clsx(classes.textUppercase, classes.textBase)}>
          {product.quantity}
        </Box>
      </TableCell>
      <TableCell className={classes.alignTop}>
        <Box
          mb={2}
          textAlign='right'
          className={clsx(classes.textUppercase, classes.textBase)}>
          ${product.price}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  product: PropTypes.object.isRequired,
};
