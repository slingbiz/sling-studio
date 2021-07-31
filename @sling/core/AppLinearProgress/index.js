import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    height: (props) => props.thickness,
    borderRadius: (props) => props.borderRadius,
  },
  colorPrimary: {
    backgroundColor: (props) => props.pathColor,
  },
  bar: {
    borderRadius: (props) => props.borderRadius,
    backgroundColor: (props) => props.activeColor,
  },
});

export function CustomLinearProgress({
  pathColor,
  activeColor,
  thickness,
  borderRadius,
  ...rest
}) {
  const classes = useStyles({
    pathColor,
    activeColor,
    thickness,
    borderRadius,
  });
  return (
    <LinearProgress
      className={classes.root}
      classes={{colorPrimary: classes.colorPrimary, bar: classes.bar}}
      {...rest}
    />
  );
}

CustomLinearProgress.propTypes = {
  pathColor: PropTypes.string,
  activeColor: PropTypes.string,
  thickness: PropTypes.number,
  borderRadius: PropTypes.number,
};
CustomLinearProgress.defaultProps = {
  thickness: 5,
  pathColor: '#d6d6d6',
  activeColor: '#1a90ff',
  borderRadius: 10,
};

const AppLinearProgress = ({
  pathColor,
  borderRadius,
  activeColor,
  thickness,
  ...rest
}) => {
  return (
    <CustomLinearProgress
      pathColor={pathColor}
      thickness={thickness}
      borderRadius={borderRadius}
      activeColor={activeColor}
      {...rest}
    />
  );
};

AppLinearProgress.defaultProps = {
  thickness: 5,
  borderRadius: 10,
  pathColor: '#d6d6d6',
  activeColor: '#1a90ff',
  variant: 'determinate',
};

AppLinearProgress.prototype = {
  thickness: PropTypes.number,
  borderRadius: PropTypes.number,
  pathColor: PropTypes.string,
  activeColor: PropTypes.string,
  variant: PropTypes.oneOf(['buffer', 'determinate', 'indeterminate', 'query']),
};

export default AppLinearProgress;
