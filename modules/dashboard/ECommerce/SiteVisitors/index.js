import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import {makeStyles} from '@material-ui/core/styles';
import {Box, Grid} from '@material-ui/core';
import {useIntl} from 'react-intl';
import {GridContainer} from '../../../../@crema';
import MapView from './MapView';
import AppList from '../../../../@crema/core/AppList';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  visitorsCount: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 15,
    color: '#fff',
    padding: theme.spacing(1, 3),
  },
  img: {
    height: 30,
    width: 30,
    borderRadius: '50%',
    backgroundColor: '#fff',
  },
  textTruncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));

const CountryCell = ({data, classes}) => (
  <Box display='flex' alignItems='center' py={2} px={5} className='item-hover'>
    <Box mr={2}>
      <img src={data.icon} className={classes.img} alt='icon' />
    </Box>
    <Box component='h6' className={classes.textTruncate} flex={1}>
      {data.country}
    </Box>
    <Box className={classes.visitorsCount}>{data.value}</Box>
  </Box>
);

const SiteVisitors = ({siteVisitorsData}) => {
  const classes = useStyles();
  const {messages} = useIntl();
  return (
    <AppCard
      height={1}
      title={messages['eCommerce.siteVisitorsStatistics']}
      contentStyle={{paddingRight: 0, paddingLeft: 0}}>
      <GridContainer>
        <Grid item xs={12} md={3}>
          <Box
            component='p'
            color='text.secondary'
            pl={4}
            fontSize={14}
            fontWeight={Fonts.MEDIUM}>
            {messages['eCommerce.countries']}
          </Box>
          <AppList
            data={siteVisitorsData}
            renderRow={(data) => (
              <CountryCell key={data.id} classes={classes} data={data} />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MapView />
        </Grid>
        <Grid item xs={12} md={3}>
          <Box
            component='p'
            color='text.secondary'
            pl={4}
            fontSize={14}
            fontWeight={Fonts.MEDIUM}>
            {messages['eCommerce.countries']}
          </Box>
          <AppList
            data={siteVisitorsData}
            renderRow={(data) => (
              <CountryCell
                key={'sec-c-' + data.id}
                classes={classes}
                data={data}
              />
            )}
          />
        </Grid>
      </GridContainer>
    </AppCard>
  );
};

export default SiteVisitors;
