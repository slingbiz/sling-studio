import React from 'react';
import {Box, Hidden} from '@material-ui/core';
import {Fonts} from "../../../shared/constants/AppEnums";

const ListingSummary = ({parentProps}) => {
  return (
    <Box display='flex' flex={1}>
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
