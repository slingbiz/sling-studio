import React, {useEffect} from 'react';
import GridContainer from '../../../@crema/core/GridContainer';
import {Grid, makeStyles} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {onGetWallData} from '../../../redux/actions';
import VideoCall from './VideoCall';
import FriendRequests from './FriendRequests';
import Photos from './Photos';
import RecentNews from './RecentNews';
import WhoToFollow from './WhoToFollow';
import Suggestions from './Suggestions';
import CreatePost from './CreatePost';
import PostsList from './PostsList';
import AppsContainer from '../../../@crema/core/AppsContainer';
import Scrollbar from '../../../@crema/core/Scrollbar';
import {useIntl} from 'react-intl';

const useStyles = makeStyles((theme) => ({
  wallLeftSidebar: {
    '@media screen and (min-width: 600px) and (max-width: 1020px)': {
      flexBasis: '40%',
      maxWidth: '40%',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  wallMainContent: {
    '@media screen and (min-width: 600px) and (max-width: 1020px)': {
      flexBasis: '60%',
      maxWidth: '60%',
    },
  },
  wallRightSidebar: {
    '@media screen and (max-width: 1020px)': {
      display: 'none',
    },
  },
}));

const Wall = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(onGetWallData());
  }, [dispatch]);

  const {wallData} = useSelector(({wall}) => wall);
  const {messages} = useIntl();

  return (
    <AppsContainer
      title={messages['sidebar.apps.wall']}
      cardStyle={{backgroundColor: 'transparent', boxShadow: 'none'}}
      fullView>
      {wallData && (
        <GridContainer style={{height: 'calc(100% + 32px)'}}>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            style={{height: '100%'}}
            className={classes.wallLeftSidebar}>
            <Scrollbar style={{height: '100%'}}>
              <VideoCall data={wallData.videoCall} />
              <Photos photos={wallData.photos} />
              <FriendRequests friendRequests={wallData.friendRequests} />
            </Scrollbar>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            style={{height: '100%'}}
            className={classes.wallMainContent}>
            <Scrollbar style={{height: '100%'}}>
              <CreatePost />
              <PostsList />
            </Scrollbar>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            style={{height: '100%'}}
            className={classes.wallRightSidebar}>
            <Scrollbar style={{height: '100%'}}>
              <RecentNews recentNews={wallData.recentNews} />
              <Suggestions suggestions={wallData.suggestions} />
              <WhoToFollow whoToFollow={wallData.whoToFollow} />
            </Scrollbar>
          </Grid>
        </GridContainer>
      )}
    </AppsContainer>
  );
};

export default Wall;
