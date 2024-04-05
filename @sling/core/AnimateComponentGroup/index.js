import React from 'react';
import {Box} from '@material-ui/core';

const AnimateComponentGroup = ({loading, children, ...props}) => {
  return <Box {...props}>{children}</Box>;
};

export default AnimateComponentGroup;