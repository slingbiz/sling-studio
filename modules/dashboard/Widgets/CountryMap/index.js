import React from 'react';
import {Box} from '@material-ui/core';
import MapChart from './MapChart';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';

const CountryMap = () => {
  const {messages} = useIntl();
  return (
    <AppCard
      contentStyle={{
        display: 'flex',
        flexDirection: 'column',
      }}
      height='1'
      title={messages['dashboard.usa']}
      action={messages['common.next']}>
      <Box
        flex={1}
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'>
        <MapChart />
      </Box>
    </AppCard>
  );
};

export default CountryMap;
