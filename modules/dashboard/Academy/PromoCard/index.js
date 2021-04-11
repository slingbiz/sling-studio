import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {Fonts} from '../../../../shared/constants/AppEnums';

const PromoCard = () => {
  return (
    <AppCard height={1} style={{backgroundColor: '#0A8FDC'}}>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Box mb={2}>
          <img src={'/images/dashboard/academy/promo.png'} alt='promo' />
        </Box>
        <Box
          mb={2}
          fontSize={14}
          fontWeight={Fonts.MEDIUM}
          component='p'
          color='#fff'>
          Do you want to get
        </Box>
        <Box mb={3} component='p' color='#fff'>
          Better results?
        </Box>
        <Box>
          <Button
            variant='contained'
            size='small'
            style={{
              backgroundColor: '#fff',
              color: '#000',
              textTransform: 'capitalize',
            }}>
            Upgrade
          </Button>
        </Box>
      </Box>
    </AppCard>
  );
};

export default PromoCard;
