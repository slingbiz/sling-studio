import React from 'react';
import RevenueGraph from './RevenueGraph';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {indigo} from '@material-ui/core/colors';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCard from '../../../../@crema/core/AppCard';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  textUppercase: {
    textTransform: 'uppercase',
  },
}));

const TotalRevenue = ({revenueData}) => {
  const classes = useStyles();
  return (
    <>
      <Box
        component='h2'
        color='text.primary'
        className={classes.textUppercase}
        fontSize={16}
        mb={{xs: 4, sm: 4, xl: 6}}
        fontWeight={Fonts.BOLD}>
        <IntlMessages id='dashboard.totalRevenue' />
      </Box>
      <AppCard style={{backgroundColor: indigo[700]}}>
        <Box display='flex' flexDirection={{xs: 'column', sm: 'row'}}>
          <Box mr={{xs: 2, xl: 10}} display='flex' flexDirection='column'>
            <Box mb={4}>
              <Box
                component='h3'
                mb={4}
                color='primary.contrastText'
                fontWeight={Fonts.MEDIUM}
                fontSize={20}>
                {revenueData.ytdRevenue}
              </Box>
              <Box component='p' mb={0} fontSize={14} color={indigo[200]}>
                <IntlMessages id='dashboard.ytdRevenue' />
              </Box>
            </Box>
            <Box mt='auto' mx={{xs: -2, xl: -5}} mb={1} display='flex'>
              <Box px={{xs: 2, xl: 5}}>
                <Box
                  mb={2}
                  component='h3'
                  color='primary.contrastText'
                  fontWeight={Fonts.MEDIUM}
                  fontSize={20}>
                  {revenueData.clients}
                </Box>
                <Box component='p' mb={0} fontSize={14} color={indigo[200]}>
                  <IntlMessages id='dashboard.clients' />
                </Box>
              </Box>

              <Box px={{xs: 2, xl: 5}}>
                <Box
                  mb={2}
                  component='h2'
                  color='primary.contrastText'
                  fontWeight={Fonts.MEDIUM}
                  fontSize={20}>
                  {revenueData.countries}
                </Box>
                <Box component='p' mb={0} fontSize={14} color={indigo[200]}>
                  <IntlMessages id='dashboard.countries' />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box ml='auto' mb={{xs: -6, xl: -2}}>
            <RevenueGraph data={revenueData.revenueGraphData} />
          </Box>
        </Box>
      </AppCard>
    </>
  );
};

export default TotalRevenue;

TotalRevenue.defaultProps = {
  revenueData: {
    ytdRevenue: '',
    clients: 0,
    countries: '',
    revenueGraphData: [],
  },
};

TotalRevenue.propTypes = {
  revenueData: PropTypes.object,
};
