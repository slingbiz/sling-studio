import React, {useEffect} from 'react';
import {Box, Grid} from '@material-ui/core';
import {GridContainer} from '../../../@crema';
import AppCard from '../../../@crema/core/AppCard';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../shared/constants/AppEnums';
import {useDispatch, useSelector} from 'react-redux';
import {getCartItems} from '../../../redux/actions/Ecommerce';
import OrderSummary from '../OrderSummary';
import DeliveryAddress from './DeliveryAddress';
import PaymentInfo from './PaymentInfo';
import AppAnimate from '../../../@crema/core/AppAnimate';

const Checkout = () => {
  const dispatch = useDispatch();
  const {cartItems} = useSelector(({ecommerce}) => ecommerce);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box>
        <Box
          component='h2'
          color='text.primary'
          fontWeight={Fonts.BOLD}
          mb={6}
          fontSize={16}>
          <IntlMessages id='sidebar.ecommerce.checkout' />
        </Box>
        <GridContainer>
          <Grid item xs={12} md={8}>
            <AppCard
              title={
                <Box fontSize={16} fontWeight={Fonts.BOLD}>
                  Delivery Address
                </Box>
              }>
              <DeliveryAddress />
            </AppCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <OrderSummary cartItems={cartItems} />
            <PaymentInfo />
          </Grid>
        </GridContainer>
      </Box>
    </AppAnimate>
  );
};

export default Checkout;
