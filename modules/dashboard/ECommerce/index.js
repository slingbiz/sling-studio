import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {onGetECommerceData} from '../../../redux/actions';
import InfoView from '../../../@crema/core/InfoView';
import {Box, Grid} from '@material-ui/core';
import GridContainer from '../../../@crema/core/GridContainer';
import SalesState from './SalesState';
import SaleStatics from './SaleStatics';
import Application from './Application';
import ReportCard from './ReportCard';
import RecentOrders from './RecentOrders';
import Revenue from './Revenue';
import MarketingCampaign from './MarketingCampaign';
import Notifications from './Notifications';
import NewCustomers from './NewCustomers';
import PopularProducts from './PopularProducts';
import Browser from './Browser';
import SiteVisitors from './SiteVisitors';
import AppAnimate from '../../../@crema/core/AppAnimate';

const ECommerce = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetECommerceData());
  }, [dispatch]);

  const ecommerceData = useSelector(({dashboard}) => dashboard.ecommerceData);

  return (
    <>
      {ecommerceData ? (
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <Box pt={{xl: 4}} clone>
            <GridContainer>
              {ecommerceData.salesState.map((state, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <SalesState state={state} />
                </Grid>
              ))}
              <Grid item xs={12} md={9}>
                <SaleStatics />
              </Grid>
              <Grid item xs={12} md={3}>
                <Application />
              </Grid>
              {ecommerceData.reportCards.map((report, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <ReportCard data={report} />
                </Grid>
              ))}
              <Grid item xs={12} md={9}>
                <RecentOrders recentOrders={ecommerceData.recentOrders} />
              </Grid>
              <Grid item xs={12} md={3}>
                <Revenue />
              </Grid>

              <Grid item xs={12} md={6}>
                <MarketingCampaign
                  marketingCampaign={ecommerceData.marketingCampaign}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Notifications notifications={ecommerceData.notifications} />
              </Grid>

              <Grid item xs={12} md={6}>
                <NewCustomers newCustomers={ecommerceData.newCustomers} />
              </Grid>
              <Grid item xs={12} md={6}>
                <PopularProducts
                  popularProducts={ecommerceData.popularProducts}
                />
              </Grid>

              <Grid item xs={12} md={9}>
                <SiteVisitors siteVisitorsData={ecommerceData.siteVisitors} />
              </Grid>
              <Grid item xs={12} md={3}>
                <Browser browserData={ecommerceData.browser} />
              </Grid>
            </GridContainer>
          </Box>
        </AppAnimate>
      ) : null}
      <InfoView />
    </>
  );
};

export default ECommerce;
