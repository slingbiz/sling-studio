import React from 'react';
import {Box} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

const CheckedCell = ({selected, data, onChange}) => {
  return (
    <Box
      display='flex'
      flexDirection='row'
      alignItems='center'
      onClick={() => onChange(data.id)}
      className='pointer'>
      <Checkbox
        checked={selected.some((item) => item === data.id)}
        color='primary'
        inputProps={{'aria-label': 'secondary checkbox'}}
      />
      <Box>{data.name}</Box>
    </Box>
  );
};

export default CheckedCell;
