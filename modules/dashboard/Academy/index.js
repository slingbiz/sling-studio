import React, {useEffect} from 'react';
import Box from '@material-ui/core/Box';
import {useDispatch, useSelector} from 'react-redux';
import {onGetAcademyData} from '../../../redux/actions';
import AppAnimate from '../../../@crema/core/AppAnimate';
import GridContainer from '../../../@crema/core/GridContainer';
import {Grid, makeStyles} from '@material-ui/core';
import GeneralStats from './GeneralStats';
import CourseCategories from './CourseCategories';
import MyProfile from './MyProfile';
import MyCourses from './MyCourses';
import Notifications from './Notifications';
import CourseDetail from './CourseDetail';
import MyLearning from './MyLearning';
import LatestResults from './LatestResults';
import MyClass from './MyClass';
import StudentRankings from './StudentRankings';
import PromoCard from './PromoCard';
import AverageGrades from './AverageGrades';
import RelatedCourses from './RelatedCourses';
import VideoPromo from './VideoPromo';

const useStyles = makeStyles((theme) => ({
  notificRoot: {
    [theme.breakpoints.up('lg')]: {
      order: 2,
    },
  },
  myCourseRoot: {
    [theme.breakpoints.up('lg')]: {
      order: 1,
    },
  },
}));

const Academy = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(onGetAcademyData());
  }, [dispatch]);

  const {academyData} = useSelector(({dashboard}) => dashboard);

  return (
    <>
      {academyData && (
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <Box>
            <Box pt={{xl: 4}} pb={{xs: 2, lg: 4}} clone>
              <GridContainer>
                {academyData.academicStats.map((item, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <GeneralStats stats={item} />
                  </Grid>
                ))}

                {academyData.courseCategories.map((item, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <CourseCategories course={item} />
                  </Grid>
                ))}
              </GridContainer>
            </Box>

            <Box pb={{xs: 2, lg: 4}} clone>
              <GridContainer>
                <Grid item xs={12} sm={6} lg={3}>
                  <MyProfile profile={academyData.profile} />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={3}
                  className={classes.notificRoot}>
                  <Notifications notifications={academyData.notifications} />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  lg={6}
                  className={classes.myCourseRoot}>
                  <MyCourses courses={academyData.courses} />
                </Grid>
              </GridContainer>
            </Box>

            <GridContainer>
              {academyData.courseDetails.map((item, index) => (
                <Grid item xs={12} sm={12} md={4} key={index}>
                  <CourseDetail course={item} />
                </Grid>
              ))}

              <Grid item xs={12} sm={12} md={5} xl={6}>
                <VideoPromo videoPromo={academyData.videoPromo} />
              </Grid>

              <Grid item xs={12} sm={12} md={7} xl={6}>
                <GridContainer>
                  <Grid item xs={12} sm={12} md={12}>
                    <MyLearning learningData={academyData.learningData} />
                  </Grid>

                  <Grid item xs={12} sm={6} xl={6}>
                    <LatestResults latestResults={academyData.latestResults} />
                  </Grid>

                  <Grid item xs={12} sm={6} xl={6}>
                    <MyClass classData={academyData.classData} />
                  </Grid>
                </GridContainer>
              </Grid>

              <Grid item xs={12} sm={12} md={9}>
                <StudentRankings
                  studentRankings={academyData.studentRankings}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3}>
                <PromoCard />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <AverageGrades grades={academyData.grades} />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <RelatedCourses relatedCourses={academyData.relatedCourses} />
              </Grid>
            </GridContainer>
          </Box>
        </AppAnimate>
      )}
    </>
  );
};

export default Academy;
