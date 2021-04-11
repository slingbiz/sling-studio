import React from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from '../../events';
import moment from 'moment';
import useStyles from '../../calandar.style';

const localizer = momentLocalizer(moment);

const Timeslots = (props) => {
  const classes = useStyles(props);
  return (
    <Calendar
      className={classes.root}
      {...props}
      events={events}
      localizer={localizer}
      step={15}
      timeslots={8}
      defaultView='week'
      defaultDate={new Date(2019, 10, 12)}
    />
  );
};

export default Timeslots;
