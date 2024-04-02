import React from 'react';
import AppCard from '../../../../@sling/core/AppCard';
import {Box} from '@material-ui/core';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppSelect from '../../../../@sling/core/AppSelect';
import {useIntl} from 'react-intl';

const EarningByCountry = ({earningData}) => {
  const handleSelectionType = (data) => {
    console.log('data: ', data);
  };
  const {messages} = useIntl();
  return (
    <AppCard
      height={1}
      title={'Traffic Sources by Country'}
      action={
        <AppSelect
          menus={[
            messages['dashboard.thisWeek'],
            messages['dashboard.lastWeeks'],
            messages['dashboard.lastMonth'],
          ]}
          defaultValue={messages['dashboard.thisWeek']}
          onChange={handleSelectionType}
        />
      }>
      <Box
        display='flex'
        alignItems='center'
        flexWrap='wrap'
        justifyContent='space-between'>
        {earningData.map((data) => (
          <Box px={4.5} mb={2} key={data.id}>
            <Box component='p' mb={1} fontWeight={Fonts.MEDIUM} fontSize={20}>
              {data.amount}
            </Box>
            <Box display='flex' alignItems='center'>
              <Box
                component='span'
                height={{xs: 8, xl: 10}}
                width={{xs: 8, xl: 10}}
                borderRadius='50%'
                display='block'
                bgcolor={data.color}
                p={1}
                mr={2}
              />
              <Box
                component='p'
                color='text.secondary'
                fontSize={14}
                style={{textTransform: 'capitalize'}}>
                {data.country}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </AppCard>
  );
};

export default EarningByCountry;
