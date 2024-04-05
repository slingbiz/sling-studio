import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {Box} from '@material-ui/core';

//
const AnimateComponent = ({loading, children, ...props}) => {
  return <Box {...props}>{children}</Box>;
};

AnimateComponent.propTypes = {
  children: PropTypes.element.isRequired,
};

AnimateComponent.defaultProps = {};

export default memo(AnimateComponent);
