import React from 'react';
import WebTrafficGraph from './WebTrafficGraph';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {blue, red} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';

const WebTraffic = ({websiteTrafficData}) => {
  const {messages} = useIntl();
  return (
    <AppCard mb={{xs: 5, md: 8}} title={messages['dashboard.websiteTraffic']}>
      <WebTrafficGraph websiteTrafficData={websiteTrafficData} />
      <Box pt={4} mb={1} display='flex' justifyContent='space-between'>
        <Box>
          <Box
            component='h4'
            mb={2}
            fontWeight={Fonts.MEDIUM}
            fontSize={{xs: 18, xl: 20}}
            color={red[500]}>
            1,265
          </Box>
          <Box component='p' fontSize={14} color='text.secondary'>
            <IntlMessages id='common.subscribers' />
          </Box>
        </Box>
        <Box
          color='grey.400'
          fontWeight={Fonts.MEDIUM}
          pt={2}
          fontSize={{xs: 18, xl: 20}}>
          2019
        </Box>
        <Box>
          <Box
            component='h4'
            mb={2}
            fontWeight={Fonts.MEDIUM}
            fontSize={{xs: 18, xl: 20}}
            color={blue[400]}>
            12,432
          </Box>
          <Box component='p' fontSize={14} color='text.secondary'>
            <IntlMessages id='common.newUsers' />
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default WebTraffic;

WebTraffic.defaultProps = {
  websiteTrafficData: [],
};

WebTraffic.propTypes = {
  websiteTrafficData: PropTypes.array,
};
