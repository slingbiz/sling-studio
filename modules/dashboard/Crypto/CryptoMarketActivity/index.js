import React from 'react';
import MarketGraph from './MarketGraph';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {Box} from '@material-ui/core';
import PropTypes from 'prop-types';
import {indigo, red, teal} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';

const CryptoMarketActivity = (props) => {
  const {marketGraphData} = props;

  const {messages} = useIntl();
  return (
    <AppCard
      height='1'
      title={messages['dashboard.cryptoMarketActivity']}
      action={messages['common.viewAll']}
      footer={
        <Box
          display='flex'
          flexDirection={{xs: 'column', xl: 'row'}}
          alignItems={{xl: 'center'}}>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'>
            <Box mr={3} display='flex' alignItems='center'>
              <Box
                component='span'
                height={{xs: 12, xl: 16}}
                width={{xs: 12, xl: 16}}
                display='block'
                borderRadius='50%'
                mr={2}
                bgcolor={teal[600]}
              />
              <Box component='span' mr={2} fontSize={14}>
                <IntlMessages id='common.low' />
              </Box>
            </Box>
            <Box mr={3} display='flex' alignItems='center'>
              <Box
                component='span'
                height={{xs: 12, xl: 16}}
                width={{xs: 12, xl: 16}}
                display='block'
                borderRadius='50%'
                mr={2}
                bgcolor={indigo[700]}
              />
              <Box component='span' mr={2} fontSize={14}>
                <IntlMessages id='common.medium' />
              </Box>
            </Box>
            <Box display='flex' alignItems='center'>
              <Box
                component='span'
                height={{xs: 12, xl: 16}}
                width={{xs: 12, xl: 16}}
                display='block'
                borderRadius='50%'
                mr={2}
                bgcolor={red[600]}
              />
              <Box component='span' fontSize={14}>
                <IntlMessages id='common.high' />
              </Box>
            </Box>
          </Box>
          <Box
            ml={{xs: 0, xl: 'auto'}}
            mt={{xs: 3, xl: 0}}
            fontSize={14}
            display='flex'
            alignItems='center'
            justifyContent='space-between'>
            <Box mr={3}>
              <Box component='span' fontWeight={Fonts.MEDIUM}>
                1356
              </Box>
              <Box component='span' ml={2}>
                <IntlMessages id='dashboard.openDeals' />
              </Box>
            </Box>

            <Box>
              <Box component='span' fontWeight={Fonts.MEDIUM}>
                $5.9B
              </Box>
              <Box component='span' ml={2}>
                <IntlMessages id='dashboard.dealsVolume' />
              </Box>
            </Box>
          </Box>
        </Box>
      }>
      <MarketGraph marketGraphData={marketGraphData} />
    </AppCard>
  );
};

export default CryptoMarketActivity;

CryptoMarketActivity.defaultProps = {
  marketGraphData: [],
};

CryptoMarketActivity.propTypes = {
  marketGraphData: PropTypes.array,
};
