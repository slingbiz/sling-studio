import React from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from '../../events';
import moment from 'moment';
import useStyles from '../../calandar.style';
import Box from '@material-ui/core/Box';

const localizer = momentLocalizer(moment);

const Selectable = (props) => {
  const classes = useStyles(props);
  return (
    <div className='app-calendar app-cul-calendar'>
      <Box component='h3' mb={3} fontSize={{xs: 18, xl: 22}}>
        Click an event to see more info, or drag the mouse over the calendar to
        select a date/time range.
      </Box>
      <Calendar
        className={classes.root}
        selectable
        events={events}
        localizer={localizer}
        defaultView='week'
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date(2019, 10, 12)}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={(slotInfo) =>
          alert(
            `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
              `\nend: ${slotInfo.end.toLocaleString()}` +
              `\naction: ${slotInfo.action}`,
          )
        }
      />
    </div>
  );
};

export default Selectable;
