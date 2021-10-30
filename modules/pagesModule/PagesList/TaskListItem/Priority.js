import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

const Priority = ({priority}) => {
  return (
    <Box
      component='span'
      ml={{xs: 'auto', sm: 4}}
      px={3}
      py={1}
      color='primary.contrastText'
      borderRadius='30px'
      fontSize={14}
      bgcolor={priority.color}>
      {priority.name}
    </Box>
  );
};

export default Priority;

Priority.prototype = {
  priority: PropTypes.object.isRequired,
};
