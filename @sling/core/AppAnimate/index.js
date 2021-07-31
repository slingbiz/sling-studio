import PropTypes from "prop-types";
import React, { memo } from "react";
import { Box } from "@material-ui/core";

const AppAnimate = ({ loading, children, ...props }) => {
  return (
    <Box {...props}>
      {children}
    </Box>
  );
};

AppAnimate.propTypes = {
  children: PropTypes.element.isRequired
};

AppAnimate.defaultProps = {};

export default memo(AppAnimate);
/* CRA VERSION
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {VelocityComponent} from 'velocity-react';
import 'velocity-animate/velocity.ui';

const AppAnimate = (props) => {
  const children = React.cloneElement(props.children, {
    style: {
      ...props.children.style,
      visibility: 'hidden',
    },
  });
  return <VelocityComponent {...props}>{children}</VelocityComponent>;
};

AppAnimate.propTypes = {
  children: PropTypes.element.isRequired,
};

AppAnimate.defaultProps = {
  animation: 'transition.fadeIn',
  runOnMount: true,
  targetQuerySelector: null,
  interruptBehavior: 'stop',
  visibility: 'visible',
  duration: 400,
  delay: 100,
  easing: [0.4, 0.0, 0.2, 1],
  display: null,
  setRef: undefined,
};

export default memo(AppAnimate);
*/
