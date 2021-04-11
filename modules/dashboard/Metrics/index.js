import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {onGetMetricsData} from '../../../redux/actions';
import GridContainer from '../../../@crema/core/GridContainer';
import Grid from '@material-ui/core/Grid';
import StatsCard from './StatsCard';
import StatsCardWithGraph from './StatsCardWithGraph';
import ComparisonCard from './ComparisonCard';
import Sales from './Sales';
import YourAccount from './YourAccount';
import EarningInMonth from './EarningInMonth';
import MetricTitleLineGraphCard from './MetricTitleLineGraphCard';
import FloatingGraphs from './FloatingGraphs';
import Visits from './Visits';
import StatsCardSecond from './StatsCardSecond';
import Orders from './Orders';
import ProfileViews from './ProfileViews';
import WorkViews from './WorkViews';
import SocialDataCard from './SocialDataCard';
import Stats from './Stats';
import SocialVisitors from './SocialVisitors';
import InfoView from '../../../@crema/core/InfoView';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import Subscriptions from './Subscriptions';
import Share from './Share';
import {blue, green, grey, indigo, red} from '@material-ui/core/colors';
import {Fonts} from '../../../shared/constants/AppEnums';
import AppAnimate from '../../../@crema/core/AppAnimate';

const Metrics = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetMetricsData());
  }, [dispatch]);

  const metricsData = useSelector(({dashboard}) => dashboard.metricsData);

  return (
    <>
      {metricsData ? (
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <Box pt={{xl: 4}}>
            <Box
              component='h2'
              color='text.primary'
              mb={{xs: 4, sm: 4, xl: 6}}
              fontSize={16}
              fontWeight={Fonts.BOLD}>
              <IntlMessages id='dashboard.metrics' />
            </Box>

            <GridContainer>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                  text={<IntlMessages id='dashboard.ordersThisYear' />}
                  value={metricsData.ordersThisYear}
                  bgColor={red[500]}
                  icon={'/images/metricsIcons/order.png'}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                  text={<IntlMessages id='dashboard.revenueThisYear' />}
                  value={metricsData.revenueThisYear}
                  bgColor={blue[300]}
                  icon={'/images/metricsIcons/revenue.png'}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                  text={<IntlMessages id='dashboard.visitsThisYear' />}
                  value={metricsData.visitsThisYear}
                  bgColor={indigo[400]}
                  icon={'/images/metricsIcons/visits.png'}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                  text={<IntlMessages id='dashboard.queriesThisYear' />}
                  value={metricsData.queriesThisYear}
                  bgColor={green[500]}
                  icon={'/images/metricsIcons/querries.png'}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <StatsCardWithGraph
                  text={<IntlMessages id='dashboard.incomeLastYear' />}
                  data={metricsData.incomeLastYear}
                  type='incomeGraph'
                  bgColor={indigo[500]}
                  headingColor='white'
                  valueColor='white'
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <StatsCardWithGraph
                  text={<IntlMessages id='dashboard.webTraffic' />}
                  data={metricsData.websiteTrafficData}
                  bgColor='background.paper'
                  type='trafficGraph'
                  headingColor='text.primary'
                  valueColor={red[600]}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <StatsCardWithGraph
                  text={<IntlMessages id='dashboard.growthInRevenue' />}
                  data={metricsData.revenueGrowthData}
                  bgColor='background.paper'
                  type='revenueGrowth'
                  headingColor='text.primary'
                  valueColor={blue[500]}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <ComparisonCard
                  text={<IntlMessages id='dashboard.incrementInUsers' />}
                  data={metricsData.incrementActiveUsers}
                  bgColor='background.paper'
                  type='activeUsers'
                  headingColor='text.primary'
                  valueColor='#4299E1'
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <ComparisonCard
                  text={<IntlMessages id='dashboard.extraRevenue' />}
                  data={metricsData.extraRevenue}
                  bgColor='background.paper'
                  type='extraRevenue'
                  headingColor='text.primary'
                  valueColor='#4C51BF'
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <ComparisonCard
                  text={<IntlMessages id='dashboard.trafficRaise' />}
                  data={metricsData.trafficRaise}
                  bgColor='background.paper'
                  type='trafficRaise'
                  headingColor='text.primary'
                  valueColor={blue[500]}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <ComparisonCard
                  text={<IntlMessages id='dashboard.lessOrders' />}
                  data={metricsData.lessOrders}
                  bgColor='background.paper'
                  type='lessOrders'
                  headingColor='text.primary'
                  valueColor={red[500]}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Sales data={metricsData.salesData} />
              </Grid>

              <Grid item xs={12} md={4}>
                <YourAccount data={metricsData.accountData} />
              </Grid>

              <Grid item xs={12} md={4}>
                <EarningInMonth data={metricsData.earningInMonth} />
              </Grid>

              <Grid item xs={12} md={7}>
                <Subscriptions data={metricsData.subscriptionData} />
              </Grid>

              <Grid item xs={12} md={5}>
                <Box mb={8}>
                  <MetricTitleLineGraphCard
                    data={metricsData.metricsLineGraphData}
                    title={<IntlMessages id='dashboard.rides' />}
                    titleColor='rgb(73, 80, 87)'
                    valueColor={grey[500]}
                    differenceColor={red[500]}
                    bgColor='white'
                    graphColor='#4299E1'
                  />
                </Box>

                <Box>
                  <MetricTitleLineGraphCard
                    data={metricsData.metricsLineGraphData}
                    title={<IntlMessages id='dashboard.visits' />}
                    titleColor='white'
                    valueColor={indigo[300]}
                    differenceColor='white'
                    bgColor={indigo[500]}
                    graphColor='#FFFFFF'
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <StatsCardSecond
                  text={<IntlMessages id='dashboard.revenueThisYear' />}
                  value={metricsData.revenueThisYear}
                  bgColor={blue[500]}
                  icon={'/images/metricsIcons/revenue.png'}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <StatsCardSecond
                  text={<IntlMessages id='dashboard.ordersThisYear' />}
                  value={metricsData.ordersThisYear}
                  bgColor={red[500]}
                  icon={'/images/metricsIcons/order.png'}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <StatsCardSecond
                  text={<IntlMessages id='dashboard.visitsThisYear' />}
                  value={metricsData.visitsThisYear}
                  bgColor={indigo[500]}
                  icon={'/images/metricsIcons/visits.png'}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <StatsCardSecond
                  text={<IntlMessages id='dashboard.queriesThisYear' />}
                  value={metricsData.queriesThisYear}
                  bgColor={green[500]}
                  icon={'/images/metricsIcons/querries.png'}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FloatingGraphs
                  title={<IntlMessages id='dashboard.sales' />}
                  data={metricsData.metricsFloatingGraphData.salesData}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FloatingGraphs
                  title={<IntlMessages id='dashboard.clients' />}
                  data={metricsData.metricsFloatingGraphData.clientsData}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FloatingGraphs
                  title={<IntlMessages id='dashboard.revenue' />}
                  data={metricsData.metricsFloatingGraphData.revenueData}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FloatingGraphs
                  title={<IntlMessages id='dashboard.newUser' />}
                  data={metricsData.metricsFloatingGraphData.newUserData}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Visits data={metricsData.visitsData} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Orders data={metricsData.ordersData} />
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <ProfileViews data={metricsData.profileViewsData} />
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <WorkViews data={metricsData.workViewsData} />
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <SocialDataCard data={metricsData.socialData} />
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <Share data={metricsData.shareData} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Stats data={metricsData.statsGraph} />
              </Grid>

              <Grid item xs={12} md={6}>
                <SocialVisitors data={metricsData.socialVisitorsData} />
              </Grid>
            </GridContainer>
          </Box>
        </AppAnimate>
      ) : null}
      <InfoView />
    </>
  );
};

export default Metrics;
