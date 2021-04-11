import React, {useEffect, useState} from 'react';
import OrderTable from './OrderTable';
import AppsContainer from '../../../@crema/core/AppsContainer';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {getRecentOrders} from '../../../redux/actions/Ecommerce';
import {Button, Hidden} from '@material-ui/core';
import AppsHeader from '../../../@crema/core/AppsContainer/AppsHeader';
import AppsContent from '../../../@crema/core/AppsContainer/AppsContent';
import AppsPagination from '../../../@crema/core/AppsPagination';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import AppAnimate from '../../../@crema/core/AppAnimate';
import InfoView from '../../../@crema/core/InfoView';

const Orders = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const {recentOrders, orderCount} = useSelector(({ecommerce}) => ecommerce);
  const [page, setPage] = useState(0);
  const [search, setSearchQuery] = useState('');

  const onPageChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    dispatch(getRecentOrders(search, page));
  }, [dispatch, search, page]);

  const onSearchOrder = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };
  return (
    <>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <AppsContainer title={messages['eCommerce.recentOrders']} fullView>
          <AppsHeader>
            <Box
              display='flex'
              flexDirection='row'
              alignItems='center'
              width={1}
              justifyContent='space-between'>
              <TextField
                style={{maxWidth: 150}}
                margin='dense'
                id='user-name'
                placeholder='Search'
                type='search'
                variant='outlined'
                onChange={onSearchOrder}
              />
              <Box display='flex' flexDirection='row' alignItems='center'>
                <Button variant='contained' color='primary'>
                  Add Order
                </Button>

                <Hidden xsDown>
                  <AppsPagination
                    rowsPerPage={10}
                    count={orderCount}
                    page={page}
                    onPageChange={onPageChange}
                  />
                </Hidden>
              </Box>
            </Box>
          </AppsHeader>

          <AppsContent
            style={{
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <OrderTable orderData={recentOrders} />
          </AppsContent>

          <Hidden smUp>
            <AppsPagination
              rowsPerPage={10}
              count={orderCount}
              page={page}
              onPageChange={onPageChange}
            />
          </Hidden>
        </AppsContainer>
      </AppAnimate>
      <InfoView />
    </>
  );
};

export default Orders;
