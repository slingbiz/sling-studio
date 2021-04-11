import React from 'react';
import {Box} from '@material-ui/core';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import DateRangeIcon from '@material-ui/icons/DateRange';

const AvailableOffers = () => {
  return (
    <Box mb={5}>
      <Box component='h3' color='text.primary' fontSize={16} mb={3}>
        Available offers
      </Box>

      <Box
        fontSize={14}
        display='flex'
        alignItems='center'
        color='primary.main'>
        <LocalOfferIcon style={{fontSize: 18}} />
        <Box component='span' color='text.primary' mx={3}>
          Special PriceGet extra ₹598 off (price inclusive of discount){' '}
          <Box component='span' color='primary.main'>
            T&C
          </Box>
        </Box>
      </Box>

      <Box
        fontSize={14}
        my={3}
        display='flex'
        alignItems='center'
        color='primary.main'>
        <DateRangeIcon style={{fontSize: 18}} />
        <Box component='span' color='text.primary' mx={3}>
          No cost EMI ₹1,368/month. Standard EMI also available{' '}
          <Box component='span' color='primary.main'>
            View Plans
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AvailableOffers;
