import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import {Box} from '@material-ui/core';
import {Fonts} from '../../../../shared/constants/AppEnums';

const InfoWidget = ({data}) => {
  return (
    <AppCard
      height={1}
      style={{backgroundColor: data.bgColor}}
      contentStyle={{paddingLeft: 8, paddingRight: 8}}>
      <Box
        display='flex'
        flexDirection='column'
        flex={1}
        alignItems='center'
        justifyContent='center'>
        <Box mb={2}>
          <img src={data.icon} alt='icon' style={{height: 70, width: 'auto'}} />
        </Box>
        <Box textAlign='center'>
          <Box
            color='white'
            component='h3'
            mt={2}
            fontWeight={Fonts.MEDIUM}
            fontSize={20}>
            {data.count}
          </Box>
          <Box component='p' color='white'>
            {data.details}
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default InfoWidget;
