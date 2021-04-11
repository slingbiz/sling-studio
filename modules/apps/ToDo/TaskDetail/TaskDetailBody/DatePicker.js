import React from 'react';
import {KeyboardDatePicker} from '@material-ui/pickers';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

const DatePicker = ({classes, scheduleDate, setScheduleDate}) => {
  return (
    <Box ml={{xs: 0, sm: 5}} mt={{xs: 2, sm: 0}}>
      <KeyboardDatePicker
        autoOk
        format='YYYY/MM/DD'
        variant='inline'
        inputVariant='outlined'
        label={<IntlMessages id='common.selectDate' />}
        name='date'
        className={classes.datePicker}
        value={scheduleDate}
        onChange={(value) => setScheduleDate(moment(value).format('lll'))}
      />
    </Box>
  );
};

export default DatePicker;

DatePicker.prototype = {
  scheduleDate: PropTypes.object.isRequired,
  setScheduleDate: PropTypes.func,
};
