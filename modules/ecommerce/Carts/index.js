import React, { useEffect } from "react";
import { Box, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";

import { GridContainer } from "../../../@crema";
import CartTable from "./CartTable";
import AppCard from "../../../@crema/core/AppCard";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import { Fonts } from "../../../shared/constants/AppEnums";
import { getCartItems } from "../../../redux/actions/Ecommerce";
import OrderSummary from "../OrderSummary";
import AppAnimate from "../../../@crema/core/AppAnimate";
import { useRouter } from "next/router";

const Carts = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cartItems } = useSelector(({ ecommerce }) => ecommerce);

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
          <IntlMessages id='sidebar.ecommerce.cart' />
        </Box>
        <GridContainer>
          <Grid item xs={12} md={8}>
            <AppCard
              contentStyle={{ paddingRight: 0, paddingLeft: 0 }}
              footer={
                <Box
                  mt={4}
                  width={1}
                  display='flex'
                  justifyContent='space-between'>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      router.push("/ecommerce/products");
                    }}>
                    Continue Shopping
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => {
                      router.push("/ecommerce/checkout");
                    }}>
                    Checkout
                  </Button>
                </Box>
              }>
              <CartTable cartItems={cartItems} />
            </AppCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <OrderSummary cartItems={cartItems} />
          </Grid>
        </GridContainer>
      </Box>
    </AppAnimate>
  );
};

export default Carts;
