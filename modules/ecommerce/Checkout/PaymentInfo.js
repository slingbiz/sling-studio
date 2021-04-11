import React, {useState} from 'react';
import AppCard from '../../../@crema/core/AppCard';
import {Box} from '@material-ui/core';
import {Fonts} from '../../../shared/constants/AppEnums';
import Checkbox from '@material-ui/core/Checkbox';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const PaymentInfo = () => {
  const [paymentMode, setPaymentMode] = useState('CARD');
  return (
    <AppCard
      mt={6}
      footerStyle={{marginTop: 10}}
      title={
        <Box fontSize={16} fontWeight={Fonts.BOLD}>
          Payment Info
        </Box>
      }
      footer={
        <Button variant='contained' color='primary' fullWidth>
          Place Order
        </Button>
      }>
      <Box>
        <Box onClick={() => setPaymentMode('COD')} className='pointer'>
          <Checkbox
            checked={paymentMode === 'COD'}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<RadioButtonCheckedIcon />}
            color='primary'
          />
          <Box component='span' fontSize={14} fontWeight={Fonts.MEDIUM}>
            COD
          </Box>
        </Box>
        {paymentMode === 'COD' ? (
          <Box ml={3} color='text.secondary'>
            Cash on delivery
          </Box>
        ) : null}
      </Box>
      <Box>
        <Box onClick={() => setPaymentMode('CARD')} className='pointer'>
          <Checkbox
            checked={paymentMode === 'CARD'}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<RadioButtonCheckedIcon />}
            color='primary'
          />
          <Box component='span' fontSize={14} fontWeight={Fonts.MEDIUM}>
            CARD
          </Box>
        </Box>
        {paymentMode === 'CARD' ? (
          <Box ml={3} color='text.secondary'>
            <TextField
              margin='dense'
              fullWidth
              id='user-name'
              label='Full Name'
              type='search'
              variant='outlined'
            />
            <TextField
              margin='dense'
              fullWidth
              id='card-number'
              label='Card Number'
              type='search'
              variant='outlined'
            />
            <Box display='flex'>
              <TextField
                margin='dense'
                id='expiry-date'
                label='Expiry Date (MM/YY)'
                type='search'
                style={{marginRight: 20}}
                variant='outlined'
              />
              <TextField
                margin='dense'
                id='card-cvv'
                label='CVV'
                type='password'
                variant='outlined'
              />
            </Box>
          </Box>
        ) : null}
      </Box>
      <Box>
        <Box onClick={() => setPaymentMode('PAYPAL')} className='pointer'>
          <Checkbox
            checked={paymentMode === 'PAYPAL'}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<RadioButtonCheckedIcon />}
            color='primary'
          />
          <Box component='span' fontSize={14} fontWeight={Fonts.MEDIUM}>
            PAYPAL
          </Box>
        </Box>
        {paymentMode === 'PAYPAL' ? (
          <Box ml={3} color='text.secondary'>
            <TextField
              margin='dense'
              fullWidth
              id='paypal-email'
              label='PayPal email address'
              type='search'
              variant='outlined'
            />
          </Box>
        ) : null}
      </Box>
    </AppCard>
  );
};

export default PaymentInfo;
