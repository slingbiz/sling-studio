import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {onGetWidgetsData} from '../../../redux/actions';
import GridContainer from '../../../@crema/core/GridContainer';
import Grid from '@material-ui/core/Grid';
import WallPaper from './WallPaper';
import TemperatureCard from './TemperatureCard';
import VisitorAnalysis from './VisitorAnalysis';
import BirthdayCard from './BirthdayCard';
import RecentActivity from './RecentActivity';
import IllustrationDesign from './IllustrationDesign';
import Categories from './Categories';
import Header from './Header';
import Subscribe from './Subscribe';
import Profile from './Profile';
import Messages from './Messages';
import TaskList from './TaskList';
import HollywoodMovie from './HollywoodMovie';
import CountryMap from './CountryMap';
import Colors from './Colors';
import AddTags from './AddTags';
import Reviews from './Reviews';
import CremaCard from './CremaCard';
import Formats from './Formats';
import Price from './Price';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InfoView from '../../../@crema/core/InfoView';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import CityInfo from './CityInfo';
import {blue, indigo} from '@material-ui/core/colors';
import {Fonts} from '../../../shared/constants/AppEnums';
import DateSelector from './DatePicker';
import AppAnimate from '../../../@crema/core/AppAnimate';

const Widgets = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetWidgetsData());
  }, [dispatch]);

  const widgetsData = useSelector(({dashboard}) => dashboard.widgetsData);

  return (
    <>
      {widgetsData ? (
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <Box pt={{xl: 4}}>
            <Box
              component='h3'
              color='text.primary'
              mb={{xs: 4, sm: 4, xl: 6}}
              fontSize={16}
              fontWeight={Fonts.BOLD}>
              <IntlMessages id='dashboard.widgets' />
            </Box>

            <GridContainer>
              <Grid item xs={12} md={6}>
                <WallPaper />
              </Grid>

              <Grid item xs={12} md={6}>
                <HollywoodMovie />
              </Grid>

              <Grid item xs={12} md={4}>
                <TemperatureCard temperatures={widgetsData.temperatures} />
              </Grid>

              <Grid item xs={12} md={4}>
                <DateSelector />
              </Grid>

              <Grid item xs={12} md={4}>
                <VisitorAnalysis />
              </Grid>

              <Grid item xs={12} md={4}>
                <BirthdayCard />
              </Grid>

              <Grid item xs={12} md={4}>
                <CountryMap />
              </Grid>

              <Grid item xs={12} md={4}>
                <RecentActivity data={widgetsData.recentActivity} />
              </Grid>

              <Grid item xs={12} md={4}>
                <IllustrationDesign />
              </Grid>

              <Grid item xs={12} md={4}>
                <CityInfo cityData={widgetsData.cityData} />
              </Grid>

              <Grid item xs={12} md={4}>
                <Categories data={widgetsData.categories} />
              </Grid>

              <Grid item xs={12} md={7}>
                <Header />
              </Grid>

              <Grid item xs={12} md={5}>
                <Subscribe />
              </Grid>

              <Grid item xs={12} md={4}>
                <Profile data={widgetsData.profile} />
              </Grid>

              <Grid item xs={12} md={4}>
                <Messages data={widgetsData.messages} />
              </Grid>

              <Grid item xs={12} md={4}>
                <TaskList data={widgetsData.taskList} />
              </Grid>

              <Grid item xs={12} md={3}>
                <Colors data={widgetsData.colorsList} />
              </Grid>

              <Grid item xs={12} md={5}>
                <Reviews data={widgetsData.reviewsList} />
              </Grid>

              <Grid item xs={12} md={4}>
                <GridContainer>
                  <Grid item xs={12} md={12}>
                    <AddTags data={widgetsData.tagsList} />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Price />
                  </Grid>
                </GridContainer>
              </Grid>

              <Grid item xs={12} md={4}>
                <CremaCard
                  data={widgetsData.mateInfo.facebookInfo}
                  bgColor={indigo[600]}
                  color='white'
                  icon={
                    <Box color='white' cursor='pointer' clone>
                      <FacebookIcon />
                    </Box>
                  }
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <CremaCard
                  data={widgetsData.mateInfo.twitterInfo}
                  bgColor={blue[600]}
                  color='white'
                  icon={
                    <Box color='white' cursor='pointer' clone>
                      <TwitterIcon />
                    </Box>
                  }
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Formats data={widgetsData.formatList} />
              </Grid>
            </GridContainer>

            <InfoView />
          </Box>
        </AppAnimate>
      ) : null}
    </>
  );
};

export default Widgets;
