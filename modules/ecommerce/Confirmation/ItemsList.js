import React from 'react';
import AppCard from '../../../@crema/core/AppCard';
import AppList from '../../../@crema/core/AppList';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import {GridContainer} from '../../../@crema';
import {Button, Grid} from '@material-ui/core';
import {getTotalPrice} from './index';
import {Fonts} from '../../../shared/constants/AppEnums';

const ItemsList = ({cartItems}) => {
  return (
    <AppCard>
      <GridContainer>
        <Grid sx={12} sm={6} item>
          <AppList
            delay={200}
            data={cartItems}
            renderRow={(data) => (
              <Box
                key={data.id}
                display='flex'
                className='item-hover'
                px={4}
                py={3}>
                <Box mr={4} clone>
                  <Avatar src={data.image} />
                </Box>
                <Box>
                  <Box fontSize={15} fontWeight={Fonts.BOLD}>
                    {data.title} ({data.count})
                  </Box>
                  <Box color='text.secondary' fontSize={14}>
                    Brand: {data.brand}
                  </Box>
                </Box>
              </Box>
            )}
          />
        </Grid>

        <Grid xs={12} sm={6} item>
          <Box display='flex' flexDirection='column'>
            <Box p={4} fontSize={16} fontWeight={Fonts.BOLD}>
              Total ${getTotalPrice(cartItems)}
            </Box>
            <Box pl={2} display='flex' alignItems='center' mb={4}>
              <Box px={2}>
                <Button color='secondary' variant='contained'>
                  Cancel
                </Button>
              </Box>
              <Box px={2}>
                <Button color='primary' variant='contained'>
                  Need Help
                </Button>
              </Box>
            </Box>
            <Box mt='auto' p={4} display='flex' alignItems='center'>
              <Box component='span' mr={3}>
                <img
                  src={'/images/ecommerce/cart-icon.png'}
                  alt='cart'
                />
              </Box>
              Delivery expected by 27 Jul
            </Box>
          </Box>
        </Grid>
      </GridContainer>
    </AppCard>
  );
};

export default ItemsList;
