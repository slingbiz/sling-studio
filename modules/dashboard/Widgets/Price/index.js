import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';

const AirbnbSlider = withStyles({
  root: {
    color: '#E53E3E',
    height: 10,
    padding: '13px 0',
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    marginTop: -10,
    marginLeft: -13,
    boxShadow: '#ebebeb 0px 2px 2px',
    '&:focus,&:hover,&$active': {
      boxShadow: '#ccc 0px 2px 3px 1px',
    },
    '& .bar': {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 10,
  },
  rail: {
    color: '#d8d8d8',
    opacity: 1,
    height: 10,
    borderRadius: 6,
  },
})(Slider);

function AirbnbThumbComponent(props) {
  return (
    <Box component='span' {...props}>
      <Box component='span' className='bar' />
      <Box component='span' className='bar' />
      <Box component='span' className='bar' />
    </Box>
  );
}

const Price = () => {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {messages} = useIntl();
  return (
    <AppCard title={messages['dashboard.price']}>
      <Box
        component='p'
        color='grey.700'
        fontWeight={Fonts.MEDIUM}
        fontSize={14}>{`$${value[0]}mi - $${value[1]}mi`}</Box>

      <AirbnbSlider
        ThumbComponent={AirbnbThumbComponent}
        defaultValue={value}
        onChange={handleChange}
      />
    </AppCard>
  );
};

export default Price;
