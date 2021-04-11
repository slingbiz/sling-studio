import React from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from '../../events';
import moment from 'moment';
import useStyles from '../../calandar.style';

const localizer = momentLocalizer(moment);

function Event({event}) {
  return (
    <span>
      <strong>{event.title}</strong>
      {event.desc && ':  ' + event.desc}
    </span>
  );
}

function EventAgenda({event}) {
  return (
    <span>
      <em style={{color: 'magenta'}}>{event.title}</em>
      <p>{event.desc}</p>
    </span>
  );
}

const Rendering = (props) => {
  const classes = useStyles(props);
  return (
    <div className='app-calendar'>
      <Calendar
        className={classes.root}
        events={events}
        localizer={localizer}
        defaultDate={new Date(2019, 10, 1)}
        defaultView='agenda'
        components={{
          event: Event,
          agenda: {
            event: EventAgenda,
          },
        }}
      />
    </div>
  );
};

export default Rendering;
