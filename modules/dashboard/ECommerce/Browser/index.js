import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';
import Box from '@material-ui/core/Box';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppList from '../../../../@crema/core/AppList';

const BrowserCell = ({item}) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      py={2}
      px={5}
      className='item-hover'>
      <Box mr={4}>
        <img alt='' style={{maxWidth: 50}} src={item.icon} />
      </Box>

      <Box flex={1}>
        <Box component='h3' fontWeight={Fonts.MEDIUM} mb={0.5} fontSize={14}>
          {item.name}
        </Box>
        <Box component='p' color='text.secondary' fontSize={14}>
          {item.value}
        </Box>
      </Box>
    </Box>
  );
};

const Browser = ({browserData}) => {
  const {messages} = useIntl();
  return (
    <AppCard
      title={messages['eCommerce.browser']}
      contentStyle={{paddingRight: 0, paddingLeft: 0}}>
      <AppList
        data={browserData}
        renderRow={(item, index) => <BrowserCell item={item} key={index} />}
      />
    </AppCard>
  );
};

export default Browser;
