import React from 'react';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

const Labels = ({labels}) => {
  return (
    <>
      {labels.map((label) => {
        return (
          <Tooltip title={label.name} placement='top' key={label.id}>
            <Box
              component='span'
              mr={2}
              width={12}
              height={12}
              bgcolor={label.color}
              borderRadius='50%'
              display='block'
            />
          </Tooltip>
        );
      })}
    </>
  );
};

export default Labels;

Labels.prototype = {
  labels: PropTypes.array.isRequired,
};
