import React, {useEffect} from 'react';
import {Box, Grid} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import GridContainer from '../../../@crema/core/GridContainer';
import InfoView from '../../../@crema/core/InfoView';

import {onGetAnalyticsData} from '../../../redux/actions';
import WelcomeCard from './WelcomeCard/index';
import SalesState from './SalesState';
import StateCard from './StateCards';
import VisitorPageView from './VisitorPageView';
import ActiveVisitors from './ActiveVisitors';
import TopSelling from './TopSelling';
import EarningByCountry from './EarningByCountry';
import TicketsSupport from './TicketsSupport';
import PageVisits from './PageVisits';
import OrderNTransaction from './OrderNTransaction';
import TrafficSource from './TrafficSource';
import InfoWidget from './InfoWidget';
import AppAnimate from '../../../@crema/core/AppAnimate';

const CRM = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetAnalyticsData());
  }, [dispatch]);

  const analyticsData = useSelector(({dashboard}) => dashboard.analyticsData);

  return (
    <>
      {analyticsData ? (
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <Box pt={{xl: 4}} clone>
            <GridContainer>
              <Grid item xs={12} md={6}>
                <WelcomeCard data={analyticsData.welcomeCard} />

                <GridContainer>
                  <Grid item xs={12} sm={6}>
                    <StateCard data={analyticsData.revenueCards[0]} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StateCard data={analyticsData.revenueCards[1]} />
                  </Grid>
                </GridContainer>
              </Grid>
              <Grid item xs={12} md={6}>
                <SalesState
                  salesState={analyticsData.salesState}
                  chartData={analyticsData.salesChartData}
                />
              </Grid>
              <Grid item xs={12} md={8} xl={9}>
                <VisitorPageView data={analyticsData.visitorsPageView} />
              </Grid>
              <Grid item xs={12} md={4} xl={3}>
                <ActiveVisitors data={analyticsData.activeVisitors} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TopSelling products={analyticsData.topSellingProduct} />
              </Grid>
              <Grid item xs={12} md={6}>
                <EarningByCountry earningData={analyticsData.earningData} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TicketsSupport tickets={analyticsData.tickets} />

                <GridContainer>
                  {analyticsData.infoWidgets.map((data, index) => (
                    <Grid item xs={12} md={4} key={'grid-' + index}>
                      <InfoWidget data={data} />
                    </Grid>
                  ))}
                </GridContainer>
              </Grid>
              <Grid item xs={12} md={6}>
                <PageVisits pageVisits={analyticsData.pageVisits} />
              </Grid>
              <Grid item xs={12} md={9}>
                <OrderNTransaction
                  transactionData={analyticsData.transactionData}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TrafficSource trafficData={analyticsData.trafficData} />
              </Grid>
            </GridContainer>
          </Box>
        </AppAnimate>
      ) : null}

      <InfoView />
    </>
  );
};

export default CRM;
