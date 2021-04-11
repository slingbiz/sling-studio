import React from 'react';
import {Box, Typography} from '@material-ui/core';
import AppCard from '../../../../@crema/core/AppCard';

const SalesState = (props) => {
  const {bgColor, icon, type, value} = props.state;

  return (
    <AppCard
      height={1}
      style={{backgroundColor: bgColor}}
      className='card-hover'>
      <Box display='flex' alignItems='center'>
        <Box mr={3} clone alignSelf='flex-start'>
          <img src={icon} alt='icon' />
        </Box>
        <Box flex={1} color='white'>
          <Typography component='h3' variant='inherit' color='inherit'>
            {value}
          </Typography>
          <Box mt={0.5} component='p'>
            {type}
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default SalesState;
