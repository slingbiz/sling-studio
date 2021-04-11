import React from 'react';
import Slider from '@material-ui/core/Slider';
import {Box, withStyles} from '@material-ui/core';
import {Fonts} from '../../../../shared/constants/AppEnums';

const ThumbBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';
const PriceSlider = withStyles({
  root: {
    color: '#0A8FDC',
    height: 2,
    padding: '15px 0',
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    boxShadow: ThumbBoxShadow,
    marginTop: -8,
    marginLeft: -8,
    '&:focus, &:hover, &$active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: ThumbBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 12px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);

const PriceSelector = () => {
  const [value, setValue] = React.useState([50, 400]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <PriceSlider value={value} max={500} onChange={handleChange} />
      <Box display='flex' justifyContent='space-between'>
        <Box fontWeight={Fonts.MEDIUM}>$ {value[0]}</Box>
        <Box fontWeight={Fonts.MEDIUM}>$ {value[1]}</Box>
      </Box>
    </>
  );
};

export default PriceSelector;
