import React from 'react';
import {Box} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

const Labels = ({labels}) => {
  return (
    <Box m={4} mx={-1} display='flex' alignItems='center'>
      {labels.map((label) => {
        return (
          <Tooltip title={label.name} placement='top' key={label.id}>
            <Box
              height={{xs: 4, sm: 6}}
              width={32}
              mx={1}
              borderRadius={20}
              key={label.id}
              bgcolor={label.color}
            />
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default Labels;

Labels.prototype = {
  labels: PropTypes.array.isRequired,
};
