import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core';
import CourseGraph from './CourseGraph';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 60,
    width: 60,
    borderRadius: theme.overrides.MuiCard.root.borderRadius,
    overflow: 'hidden',
  },
}));

const CourseDetail = ({course}) => {
  const classes = useStyles();

  const getTitle = () => (
    <Box display='flex' alignItems='center'>
      <Box mr={4} clone>
        <img className={classes.logo} alt='' src={course.thumb} />
      </Box>
      <Box flex={1}>
        <Box component='h3' fontWeight={Fonts.BOLD} mb={0.5} fontSize={14}>
          {course.title}
        </Box>
        <Box component='p' fontSize={14} color='text.secondary'>
          {course.level}
        </Box>
      </Box>
    </Box>
  );

  return (
    <AppCard
      title={getTitle()}
      action={
        <Box>
          <IconButton
            aria-label='more'
            aria-controls='long-menu'
            aria-haspopup='true'
            onClick={null}>
            <MoreHorizIcon />
          </IconButton>
        </Box>
      }>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Box>
          <Box fontSize={14} fontWeight={Fonts.MEDIUM} mb={3} component='p'>
            {course.coveredDuration}
          </Box>
          <Box mb={1} component='p' color='text.secondary'>
            Lecture of
          </Box>
          <Box component='p' color='text.secondary'>
            {course.totalDuration}
          </Box>
        </Box>
        <Box>
          <Box fontSize={14} fontWeight={Fonts.MEDIUM} mb={3} component='p'>
            {course.coveredPractice}
          </Box>
          <Box mb={1} component='p' color='text.secondary'>
            Practice of
          </Box>
          <Box component='p' color='text.secondary'>
            {course.totalPractice}
          </Box>
        </Box>

        <CourseGraph data={course.graphData} />
      </Box>
    </AppCard>
  );
};

export default CourseDetail;
