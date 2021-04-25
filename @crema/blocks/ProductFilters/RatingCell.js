import React from 'react';
import {Box} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import Checkbox from '@material-ui/core/Checkbox';

const RatingCell = ({selected, data, onChange}) => {
  return (
    <Box
      display='flex'
      flexDirection='row'
      alignItems='center'
      onClick={() => onChange(data)}
      className='pointer'>
      <Checkbox
        checked={selected.some((item) => item === data)}
        color='primary'
        inputProps={{'aria-label': 'secondary checkbox'}}
      />
      {data}
      <StarIcon style={{fontSize: 16, marginRight: 5}} />
    </Box>
  );
};

export default RatingCell;
