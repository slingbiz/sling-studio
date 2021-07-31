import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ProtoTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import {Fonts} from '../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    minWidth: (props) => props.minWidth,
    maxWidth: (props) => props.maxWidth,
    margin: '0 auto',
  },
  circularProgressRoot: (props) => ({
    color: props.pathColor,
    width: '100% !important',
    height: '100% !important',
  }),
  circularProgressPrimary: (props) => ({
    color: props.activeColor,
    animationDuration: '550ms',
    position: 'absolute',
    left: theme.direction === 'rtl' ? -2 : 2,
    top: -2,
    width: '100% !important',
    height: '100% !important',
  }),
  centerContent: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 3,
    fontWeight: Fonts.EXTRA_BOLD,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    strokeLinecap: 'round',
  },
}));
const AppCircularProgress = ({
  pathColor,
  activeColor,
  value,
  centerNode,
  hidePercentage,
  minWidth,
  maxWidth,
  valueStyle,
  thickness,
  ...props
}) => {
  const classes = useStyles({
    pathColor,
    activeColor,
    minWidth,
    maxWidth,
  });

  return (
    <Box className={classes.root}>
      <Box position='relative'>
        <CircularProgress
          variant='static'
          value={100}
          className={classes.circularProgressRoot}
          thickness={thickness}
          {...props}
        />
        <CircularProgress
          className={classes.circularProgressPrimary}
          variant='static'
          value={value}
          thickness={thickness}
          classes={{
            circle: classes.circle,
          }}
          {...props}
        />
      </Box>
      <Box className={classes.centerContent}>
        {centerNode}
        {hidePercentage ? null : (
          <Box
            fontSize={30}
            fontWeight={500}
            color='secondary.main'
            style={valueStyle}>
            {value}%
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default AppCircularProgress;
AppCircularProgress.prototype = {
  hidePercentage: ProtoTypes.bool,
  pathColor: ProtoTypes.string,
  activeColor: ProtoTypes.string,
  value: ProtoTypes.number,
  thickness: ProtoTypes.number,
  valueStyle: ProtoTypes.object,
};

AppCircularProgress.defaultProps = {
  hidePercentage: false,
  minWidth: 130,
  maxWidth: 200,
  pathColor: '#d6d6d6',
  activeColor: '#23fa23',
  thickness: 10,
};
