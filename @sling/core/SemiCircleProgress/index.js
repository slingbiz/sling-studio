import React from 'react';
import PropTypes from 'prop-types';
import {Box, withWidth} from '@material-ui/core';
import {Fonts} from '../../../shared/constants/AppEnums';
import {getBreakPointsValue} from '../../utility/Utils';

const SemiCircleProgress = ({
  activeColor,
  valueNode,
  labelStyle,
  strokeWidth,
  pathColor,
  diameter,
  orientation,
  direction,
  showPercentValue,
  percentage,
  ...rest
}) => {
  const actualDiameter = getBreakPointsValue(diameter, rest.width);

  const coordinateForCircle = actualDiameter / 2;
  const radius = (actualDiameter - 2 * strokeWidth) / 2;
  const circumference = Math.PI * radius;

  let percentageValue;
  if (percentage > 100) {
    percentageValue = 100;
  } else if (percentage < 0) {
    percentageValue = 0;
  } else {
    percentageValue = percentage;
  }
  const semiCirclePercentage = percentageValue * (circumference / 100);

  let rotation;
  if (orientation === 'down') {
    if (direction === 'left') {
      rotation = 'rotate(180deg) rotateY(180deg)';
    } else {
      rotation = 'rotate(180deg)';
    }
  } else {
    if (direction === 'right') {
      rotation = 'rotateY(180deg)';
    }
  }

  return (
    <Box width={actualDiameter} style={{position: 'relative'}}>
      <svg
        width={actualDiameter}
        height={actualDiameter / 2}
        style={{transform: rotation, overflow: 'hidden'}}>
        <circle
          cx={coordinateForCircle}
          cy={coordinateForCircle}
          r={radius}
          fill='none'
          stroke={pathColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: circumference,
          }}
        />
        <circle
          cx={coordinateForCircle}
          cy={coordinateForCircle}
          r={radius}
          fill='none'
          stroke={activeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: semiCirclePercentage,
            transition:
              'activeColor-dashoffset .3s ease 0s, activeColor-dasharray .3s ease 0s, activeColor .3s',
          }}
        />
      </svg>
      {showPercentValue && typeof valueNode === 'object' ? (
        valueNode
      ) : (
        <Box
          style={{
            width: '100%',
            left: '0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: orientation === 'down' ? 'auto' : '0',
            position: 'absolute',
            ...labelStyle,
          }}>
          <Box
            component='span'
            fontSize={{xs: 18, sm: 20, xl: 22}}
            fontWeight={Fonts.LIGHT}>
            {percentage}%
          </Box>
          <Box
            component='span'
            fontSize={{xs: 16, sm: 18, xl: 20}}
            style={{textTransform: 'uppercase'}}
            color='text.secondary'>
            Progress
          </Box>
        </Box>
      )}
    </Box>
  );
};

function percentageValidation(isRequired) {
  return function (props, propName, componentName) {
    const prop = props[propName];
    if (prop == null) {
      if (isRequired) {
        throw new Error('Percentage is a required prop.');
      }
    } else {
      if (typeof prop !== 'number') {
        return new Error(
          'Invalid percentage. Must be a number between 0 and 100.',
        );
      }
      if (props[propName] < 0 || props[propName] > 100) {
        return new Error(
          'Invalid percentage. Must be a number between 0 and 100.',
        );
      }
    }
  };
}

const percentageisRequired = percentageValidation(true);

SemiCircleProgress.propTypes = {
  activeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  pathColor: PropTypes.string,
  diameter: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  orientation: PropTypes.oneOf(['up', 'down']),
  direction: PropTypes.oneOf(['left', 'right']),
  showPercentValue: PropTypes.bool,
  percentage: percentageisRequired,
};

SemiCircleProgress.defaultProps = {
  activeColor: '#02B732',
  labelStyle: {},
  strokeWidth: 10,
  pathColor: '#D0D0CE',
  diameter: 200,
  orientation: 'up',
  direction: 'right',
  showPercentValue: false,
};
export default withWidth()(SemiCircleProgress);
