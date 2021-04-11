import React from 'react';
import {Box} from '@material-ui/core';
import OrderPlaced from './OrderPlaced';
import AddressInfo from './AddressInfo';
import {addresses} from '../../../@crema/services/db/ecommerce/ecommerceData';
import {useSelector} from 'react-redux';
import ItemsList from './ItemsList';
import AppAnimate from '../../../@crema/core/AppAnimate';

export const getTotalPrice = (cartItems) => {
  let total = 0;
  cartItems.map((data) => {
    total = total + (+data.mrp - +data.discount) * +data.count;
    return data;
  });
  return total;
};

const Confirmation = () => {
  const {cartItems} = useSelector(({ecommerce}) => ecommerce);
  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box>
        <OrderPlaced cartItems={cartItems} />
        <AddressInfo address={addresses[0]} />
        <ItemsList cartItems={cartItems} />
      </Box>
    </AppAnimate>
  );
};

export default Confirmation;
