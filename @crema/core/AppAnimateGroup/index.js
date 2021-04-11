import React from "react";
import { Box } from "@material-ui/core";

const AppAnimateGroup = ({ loading, children, ...props }) => {
  return (
    <Box {...props}>
      {children}
    </Box>
  );
};

export default AppAnimateGroup;/* CRA Version
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {VelocityTransitionGroup} from 'velocity-react';
import 'velocity-animate/velocity.ui';

const enterAnimationDefaults = {
  animation: 'transition.fadeIn',
  stagger: 50,
  duration: 200,
  display: null,
  visibility: 'visible',
  delay: 0,
};

const leaveAnimationDefaults = {
  animation: 'transition.slideUpOut',
  backwards: 150,
  duration: 200,
  display: null,
  visibility: 'visible',
  delay: 0,
};

function AppAnimateGroup({loading, ...props}) {
  return (
    <VelocityTransitionGroup
      {...props}
      enter={{...enterAnimationDefaults, ...props.enter}}
      leave={{...leaveAnimationDefaults, ...props.leave}}
    />
  );
}

AppAnimateGroup.propTypes = {
  children: PropTypes.any,
};

AppAnimateGroup.defaultProps = {
  enter: enterAnimationDefaults,
  leave: leaveAnimationDefaults,
  easing: [0.4, 0.0, 0.2, 1],
  runOnMount: true,
  enterHideStyle: {
    visibility: 'visible',
  },
  enterShowStyle: {
    visibility: 'hidden',
  },
};

export default memo(AppAnimateGroup);
*/
