import React, {useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from '../../events';
import moment from 'moment';
import useStyles from '../../calandar.style';
import Box from '@material-ui/core/Box';

const localizer = momentLocalizer(moment);

// require('globalize/lib/cultures/globalize.culture.en-GB');
// require('globalize/lib/cultures/globalize.culture.es');
// require('globalize/lib/cultures/globalize.culture.fr');
// require('globalize/lib/cultures/globalize.culture.ar-AE');

const Cultures = (props) => {
  const [culture, setCulture] = useState('fr');

  const classes = useStyles(props);

  let cultures = ['en', 'en-GB', 'es', 'fr', 'ar-AE'];
  let rtl = culture === 'ar-AE';

  return (
    <Box className='app-calendar app-cul-calendar'>
      <Box component='h3' mb={3}>
        <label>Select a Culture</label>
        <select
          className={classes.selectRoot}
          style={{width: 200, display: 'inline-block'}}
          defaultValue={'fr'}
          onChange={(e) => setCulture(e.target.value)}>
          {cultures.map((c, idx) => (
            <option key={idx} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Box>
      <Calendar
        className={classes.root}
        rtl={rtl}
        localizer={localizer}
        events={events}
        // culture={this.state.culture}
        defaultDate={new Date(2019, 10, 1)}
      />
    </Box>
  );
};

export default Cultures;
