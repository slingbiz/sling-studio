import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  textUppercase: {
    textTransform: 'uppercase',
  },
}));
const DayTemperature = (props) => {
  const {day} = props;

  const classes = useStyles(props);
  return (
    <Box px={4} textAlign='center'>
      <Box
        component='span'
        mb={3}
        display='block'
        fontWeight={Fonts.MEDIUM}
        fontSize={14}
        className={classes.textUppercase}>
        {day.day}
      </Box>
      <Box display='inline-block'>
        <img src={day.image} alt='weather' />
      </Box>
    </Box>
  );
};

export default DayTemperature;

DayTemperature.propTypes = {
  day: PropTypes.object.isRequired,
};
