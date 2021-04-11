import React from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from '../../events';
import moment from 'moment';
import useStyles from '../../calandar.style';
import Box from '@material-ui/core/Box';

const localizer = momentLocalizer(moment);

const Popup = (props) => {
  const classes = useStyles(props);
  return (
    <Box className='app-calendar app-cul-calendar'>
      <Box component='h3' fontSize={{xs: 18, xl: 22}} mb={3}>
        Click the "+x more" link on any calendar day that cannot fit all the
        days events to see an inline popup of all the events.
      </Box>
      <Calendar
        className={classes.root}
        popup
        localizer={localizer}
        events={events}
        defaultDate={new Date(2019, 10, 1)}
      />
    </Box>
  );
};

export default Popup;
