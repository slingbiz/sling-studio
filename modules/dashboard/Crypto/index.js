import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import TotalBalance from './TotalBalance';
import Coins from './Coins';
import Bitcoin from './Bitcoin';
import BuySell from './BuySell';
import BtcVolumeCurrency from './BtcVolumeCurrency';
import PopularCoins from './PopularCoins';
import LatestNews from './LatestNews';
import CryptoMarketActivity from './CryptoMarketActivity';
import {useDispatch, useSelector} from 'react-redux';
import {onGetCryptoData} from '../../../redux/actions';
import GridContainer from '../../../@crema/core/GridContainer';
import InfoView from '../../../@crema/core/InfoView';
import Box from '@material-ui/core/Box';
import AppAnimate from '../../../@crema/core/AppAnimate';

const Crypto = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetCryptoData());
  }, [dispatch]);

  const cryptoData = useSelector(({dashboard}) => dashboard.cryptoData);

  return (
    <>
      {cryptoData ? (
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <Box pt={{xl: 4}}>
            <GridContainer>
              <Grid item xs={12} md={5}>
                <TotalBalance totalBalanceData={cryptoData.totalBalanceData} />
              </Grid>

              <Grid item xs={12} md={7}>
                <Coins coinsData={cryptoData.coinsData} />
              </Grid>

              <Grid item xs={12} md={8}>
                <Bitcoin coinGraphData={cryptoData.coinGraphData} />
              </Grid>

              <Grid item xs={12} md={4}>
                <BuySell buySell={cryptoData.buySell} />
              </Grid>

              <Grid item xs={12} md={4}>
                <BtcVolumeCurrency data={cryptoData.btcChartData} />
              </Grid>

              <Grid item xs={12} md={8}>
                <PopularCoins popularCoins={cryptoData.popularCoins} />
              </Grid>

              <Grid item xs={12} md={6}>
                <LatestNews newsData={cryptoData.newsData} />
              </Grid>

              <Grid item xs={12} md={6}>
                <CryptoMarketActivity
                  marketGraphData={cryptoData.marketGraphData}
                />
              </Grid>
            </GridContainer>
          </Box>
        </AppAnimate>
      ) : null}

      <InfoView />
    </>
  );
};

export default Crypto;
