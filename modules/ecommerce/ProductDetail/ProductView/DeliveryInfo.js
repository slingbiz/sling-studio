import React from 'react';
import {Box} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import LoopIcon from '@material-ui/icons/Loop';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const DeliveryInfo = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Box component='h3' color='text.primary' fontSize={16} mb={3}>
          Deliver to
        </Box>
        <TextField
          id='delivery-pin-code'
          label='Pin Code'
          variant='outlined'
          margin='dense'
        />

        <Box fontSize={14} mt={2}>
          Delivery in 5-7 days |{' '}
          <Box component='span' color='#49BD65' mx={3}>
            Free
          </Box>
          <Box component='span' color='text.secondary'>
            $40
          </Box>
        </Box>
        <Box mt={1}>If ordered before 2:05 AM </Box>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Box component='h3' color='text.primary' fontSize={16} mb={3}>
          Services
        </Box>

        <Box fontSize={14} display='flex' alignItems='center'>
          <Tooltip title='Return policy'>
            <LoopIcon style={{color: '#0A8FDC', fontSize: 18}} />
          </Tooltip>
          <Box color='text.primary' ml={3} display='flex' alignItems='center'>
            30 Day Return Policy
            <Tooltip title='info'>
              <InfoIcon
                style={{color: '#A0A5B9', fontSize: 18, marginLeft: 12}}
              />
            </Tooltip>
          </Box>
        </Box>

        <Box fontSize={14} my={3} display='flex' alignItems='center'>
          <Tooltip title='COD Available'>
            <MonetizationOnIcon style={{color: '#0A8FDC', fontSize: 18}} />
          </Tooltip>
          <Box color='text.primary' ml={3} display='flex' alignItems='center'>
            Cash on Delivery available{' '}
            <Tooltip title='info'>
              <InfoIcon
                style={{color: '#A0A5B9', fontSize: 18, marginLeft: 12}}
              />
            </Tooltip>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DeliveryInfo;
