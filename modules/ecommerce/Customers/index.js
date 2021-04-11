import React, {useEffect, useState} from 'react';
import CustomerTable from './CustomerTable';
import AppsContainer from '../../../@crema/core/AppsContainer';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {getCustomers} from '../../../redux/actions/Ecommerce';
import {Button, Hidden} from '@material-ui/core';
import AppsHeader from '../../../@crema/core/AppsContainer/AppsHeader';
import AppsContent from '../../../@crema/core/AppsContainer/AppsContent';
import AppsPagination from '../../../@crema/core/AppsPagination';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import AppAnimate from '../../../@crema/core/AppAnimate';
import InfoView from '../../../@crema/core/InfoView';

const Customers = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const {customers, customerCount} = useSelector(({ecommerce}) => ecommerce);
  const [page, setPage] = useState(0);
  const [search, setSearchQuery] = useState('');

  const onPageChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    dispatch(getCustomers(search, page));
  }, [dispatch, search, page]);

  const onSearchOrder = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  return (
    <>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <AppsContainer title={messages['sidebar.ecommerce.customers']} fullView>
          <AppsHeader>
            <Box
              display='flex'
              flexDirection='row'
              alignItems='center'
              width={1}>
              <TextField
                style={{maxWidth: 150}}
                margin='dense'
                id='user-name'
                placeholder='Search'
                type='search'
                variant='outlined'
                onChange={onSearchOrder}
              />
              <Box
                display='flex'
                flexDirection='row'
                alignItems='center'
                ml='auto'>
                <Button variant='contained' color='primary'>
                  Add Customer
                </Button>

                <Hidden xsDown>
                  <AppsPagination
                    rowsPerPage={10}
                    count={customerCount}
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
            <CustomerTable customers={customers} />
          </AppsContent>

          <Hidden smUp>
            <AppsPagination
              rowsPerPage={10}
              count={customerCount}
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

export default Customers;
