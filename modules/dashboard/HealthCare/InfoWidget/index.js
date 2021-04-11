import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import {Box} from '@material-ui/core';
import {Fonts} from '../../../../shared/constants/AppEnums';

const InfoWidget = ({data}) => {
  return (
    <AppCard
      height={1}
      className='card-hover'
      contentStyle={{paddingLeft: 8, paddingRight: 8}}>
      <Box
        display='flex'
        flexDirection='column'
        flex={1}
        alignItems='center'
        justifyContent='center'>
        <Box mt={1} mb={3}>
          <img src={data.icon} alt='icon' style={{height: 60, width: 60}} />
        </Box>
        <Box textAlign='center'>
          <Box color='text.secondary' mb={3}>
            {data.name}
          </Box>
          <Box
            component='p'
            fontSize={14}
            fontWeight={Fonts.BOLD}
            style={{color: data.color}}>
            {data.measurement}
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default InfoWidget;
