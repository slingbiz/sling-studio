import React from 'react';
import AppCard from '../../../@crema/core/AppCard';
import {Box, Button, Grid} from '@material-ui/core';
import {Fonts} from '../../../shared/constants/AppEnums';
import {GridContainer} from '../../../@crema';

const AddressInfo = ({address}) => {
  return (
    <AppCard style={{marginBottom: 24}}>
      <GridContainer>
        <Grid sx={12} md={6} item>
          <Box px={4}>
            <Box my={4} fontSize={16} fontWeight={Fonts.BOLD}>
              Delivery Address
            </Box>
            <Box fontSize={14} fontWeight={Fonts.BOLD}>
              {address.name}
            </Box>
            <Box fontSize={14} fontWeight={Fonts.REGULAR}>
              {address.addressLine}, {address.city}, {address.pin}
            </Box>
          </Box>

          <Box p={4} borderColor='#D9DBE3'>
            <Box
              display='flex'
              alignItems='center'
              fontSize={14}
              fontWeight={Fonts.BOLD}>
              Phone number
            </Box>
            <Box>{address.mobile}</Box>
          </Box>
        </Grid>
        <Grid sx={12} md={6} item>
          <Box p={4}>
            <Box fontSize={16} fontWeight={Fonts.BOLD}>
              Your Rewards
            </Box>

            <Box
              display='flex'
              flexDirection='row'
              alignItems='center'
              flexWrap='wrap'
              px={4}
              pt={4}>
              <Box
                display='flex'
                flexDirection='row'
                alignItems='center'
                mb={1}>
                <img src={'/images/ecommerce/sms-icon.png'} alt='sms' />
                <Box px={4} fontSize={14}>
                  SMS updates at every step
                </Box>
              </Box>
              <Box mb={1}>
                <Button
                  variant='contained'
                  color='primary'
                  style={{minWidth: 120}}>
                  Subscribe
                </Button>
              </Box>
            </Box>

            <Box
              display='flex'
              flexDirection='row'
              flexWrap='wrap'
              alignItems='center'
              p={4}>
              <Box
                display='flex'
                flexDirection='row'
                alignItems='center'
                mb={1}>
                <img
                  src={'/images/ecommerce/add-person.png'}
                  alt='sms'
                />
                <Box px={4} fontSize={14}>
                  Order shared with 1 Person{'    '}
                </Box>
              </Box>
              <Box mb={1}>
                <Button
                  variant='contained'
                  color='primary'
                  style={{minWidth: 120}}>
                  Manage
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </GridContainer>
    </AppCard>
  );
};

export default AddressInfo;
