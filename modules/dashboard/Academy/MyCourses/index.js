import React, {useState} from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import AppList from '../../../../@crema/core/AppList';
import CourseCell from './CourseCell';
import {useIntl} from 'react-intl';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  chipRoot: {
    cursor: 'pointer',
    backgroundColor: '#EFEFEF',
    color: '#737989',
    '&.MuiChip-colorPrimary': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
}));

const MyCourses = ({courses}) => {
  const [selectedCategory, setSelectedCategory] = useState(
    courses.categories[0].slug,
  );

  const handleChangeCategory = (category) => {
    setSelectedCategory(category);
  };

  const {messages} = useIntl();
  const classes = useStyles();

  return (
    <AppCard
      height={1}
      title={messages['academy.myCourses']}
      contentStyle={{paddingLeft: 0, paddingRight: 0}}>
      <Box mb={2} px={5} display='flex' alignItems='center' flexWrap='wrap'>
        {courses.categories.map((item, index) => (
          <Box
            mr={3}
            mb={1}
            key={index}
            onClick={() => handleChangeCategory(item.slug)}>
            <Chip
              className={classes.chipRoot}
              color={item.slug === selectedCategory ? 'primary' : 'default'}
              key={index}
              label={item.title}
            />
          </Box>
        ))}
      </Box>
      <AppList
        animation='transition.slideRightBigIn'
        data={courses.courses}
        renderRow={(data, index) => <CourseCell key={index} course={data} />}
      />
    </AppCard>
  );
};

export default MyCourses;
