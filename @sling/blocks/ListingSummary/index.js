import React from 'react';
import {Box, Hidden} from '@material-ui/core';
import {Fonts} from '../../../shared/constants/AppEnums';
import Grid from '@material-ui/core/Grid';

const ListingSummary = ({payload}) => {
  const {muiWidths, style} = payload;
  return (
    <Box p={4}>
      <Box fontWeight={Fonts.BOLD} mr={3}>
        Watches
      </Box>
      <Hidden only='xs'>
        <Box component='span'>(Showing 1 – 40 products of 93,723 products)</Box>
      </Hidden>
    </Box>
  );
};
export default ListingSummary;
