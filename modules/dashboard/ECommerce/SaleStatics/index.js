import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';
import AppSelect from '../../../../@crema/core/AppSelect';
import {GridContainer} from '../../../../@crema';
import {Box, Grid, makeStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AppCircularProgress from '../../../../@crema/core/AppCircularProgress';
import SaleStaticChart from './SaleStaticChart';

const useStyles = makeStyles((theme) => ({
  textBase: {
    fontSize: 14,
  },
  chartContainer: {
    marginBottom: theme.spacing(9),
    [theme.breakpoints.up('xl')]: {
      paddingLeft: theme.spacing(8),
    },
  },
}));

const SaleStatics = (props) => {
  const {messages} = useIntl();
  const handleSelectionType = (data) => {
    console.log('data: ', data);
  };

  const classes = useStyles(props);
  return (
    <AppCard
      title={messages['eCommerce.saleStatics']}
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
      <GridContainer>
        <Grid item xs={12} md={9}>
          <SaleStaticChart />
        </Grid>
        <Grid item xs={12} md={3}>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            height={1}>
            <Box className={classes.chartContainer}>
              <AppCircularProgress
                activeColor='#0A8FDC'
                pathColor='#F44D50'
                hidePercentage
                value={70}
                centerNode={
                  <img
                    alt='icon'
                    style={{
                      borderRadius: '50%',
                      boxShadow: '0px 10px 20px rgba(160, 165, 185, 0.2)',
                    }}
                    src={'/images/dashboard/application_icon.png'}
                  />
                }
                thickness={2}
              />
            </Box>
            <Box display='flex' justifyContent='center'>
              <Box mr={6} display='flex' alignItems='center'>
                <Box
                  bgcolor='#0A8FDC'
                  height={10}
                  width={10}
                  mr={2}
                  borderRadius='50%'
                />
                <Typography className={classes.textBase}>Android</Typography>
              </Box>
              <Box display='flex' alignItems='center'>
                <Box
                  bgcolor='#F44D50'
                  height={10}
                  width={10}
                  mr={2}
                  borderRadius='50%'
                />
                <Typography className={classes.textBase}>IOS</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </GridContainer>
    </AppCard>
  );
};

export default SaleStatics;
