import React from 'react';
import {Box} from '@material-ui/core';
import AppList from '../../../../../@crema/core/AppList';
import ReviewCell from './ReviewCell';
import Divider from '@material-ui/core/Divider';
import ReviewInfo from './ReviewInfo';

const Review = () => {
  return (
    <Box>
      <Box component='h3' color='text.primary' fontSize={16} mb={3}>
        Reviews
      </Box>
      <ReviewInfo />
      <Divider style={{marginTop: 15, marginBottom: 15}} />
      <AppList
        data={[1, 2, 3, 4, 5]}
        renderRow={(data) => <ReviewCell key={data} />}
      />
    </Box>
  );
};

export default Review;
