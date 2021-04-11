import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import {makeStyles} from '@material-ui/core/styles';
import MapChart from '../../Widgets/CountryMap/MapChart';
import {Box} from '@material-ui/core';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppSelect from '../../../../@crema/core/AppSelect';
import {useIntl} from 'react-intl';

const useStyles = makeStyles((theme) => ({
  mapChartRoot: {
    height: 224,
    '& .map-chart': {
      width: '100%',
      height: '100%',
    },
  },
}));
const EarningByCountry = ({earningData}) => {
  const handleSelectionType = (data) => {
    console.log('data: ', data);
  };
  const classes = useStyles();
  const {messages} = useIntl();
  return (
    <AppCard
      height={1}
      title={messages['dashboard.analytics.earningByCountries']}
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
      <Box className={classes.mapChartRoot}>
        <MapChart />
      </Box>

      <Box
        display='flex'
        alignItems='center'
        flexWrap='wrap'
        justifyContent='space-between'>
        {earningData.map((data) => (
          <Box px={4.5} mb={2} key={data.id}>
            <Box component='p' mb={1} fontWeight={Fonts.MEDIUM} fontSize={20}>
              ${data.amount}
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
