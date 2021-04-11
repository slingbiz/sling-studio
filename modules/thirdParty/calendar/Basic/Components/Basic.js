import React from 'react';
import {Calendar, momentLocalizer, Views} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from '../../events';
import moment from 'moment';
import useStyles from '../../calandar.style';

let allViews = Object.keys(Views).map((k) => Views[k]);

const ColoredDateCellWrapper = ({children}) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  });
const localizer = momentLocalizer(moment);
const Basic = (props) => {
  const classes = useStyles(props);

  return (
    <Calendar
      className={classes.root}
      events={events}
      views={allViews}
      step={60}
      showMultiDayTimes
      defaultDate={new Date(2019, 10, 1)}
      components={{
        timeSlotWrapper: ColoredDateCellWrapper,
      }}
      localizer={localizer}
    />
  );
};
export default Basic;
