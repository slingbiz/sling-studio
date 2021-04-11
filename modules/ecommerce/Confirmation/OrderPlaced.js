import React from 'react';
import AppCard from '../../../@crema/core/AppCard';
import {GridContainer} from '../../../@crema';
import Grid from '@material-ui/core/Grid';
import {Box, Button} from '@material-ui/core';
import {getTotalPrice} from './index';

const OrderPlaced = ({cartItems}) => {
  return (
    <AppCard style={{marginBottom: 24}}>
      <GridContainer>
        <Grid xs={12} md={8} item>
          <Box display='flex' p={4} alignItems='center'>
            <img src={'/images/ecommerce/gift.png'} alt='confirm' />
            <Box p={4}>
              <Box component='h3' color='primary.main' mb={0.5} fontSize={16}>
                Order placed for ${getTotalPrice(cartItems)}!
              </Box>
              <Box fontSize={14}>
                Your {cartItems.length} Item will be delivered by Mon, 27 Aug
                20.
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} md={4} item>
          <Box display='flex' p={4}>
            <Box>
              <Box fontSize={14}>Why call? Just click!</Box>
              <Box py={3}>Easily track all your orders! </Box>
              <Button variant='contained' color='primary'>
                Go to My Orders
              </Button>
            </Box>
            <Box ml='auto'>
              <img
                style={{maxHeight: 60, marginTop: 20}}
                src={'/images/ecommerce/confirm-box.png'}
                alt='confirm'
              />
            </Box>
          </Box>
        </Grid>
      </GridContainer>
    </AppCard>
  );
};

export default OrderPlaced;
