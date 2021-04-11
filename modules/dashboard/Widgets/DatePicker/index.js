import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {DatePicker} from '@material-ui/pickers';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCard from '../../../../@crema/core/AppCard';

const useStyles = makeStyles((theme) => ({
  calendarRoot: {
    position: 'relative',
    '& .MuiPickersStaticWrapper-staticWrapperRoot': {
      height: '100%',
      minWidth: '100%',
    },
    '& .MuiPickersBasePicker-pickerViewLandscape': {
      padding: 0,
    },
    '& .MuiPickersBasePicker-container': {
      height: '100%',
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
      flexDirection: 'column',
    },
    '& .MuiPickersCalendarHeader-switchHeader': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      marginTop: 0,
      minHeight: 70,
    },
    '& .MuiPickersCalendarHeader-iconButton': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.contrastText,
    },
    '& .MuiPickersToolbar-toolbar': {
      display: 'none',
    },
    '& .MuiPickersBasePicker-pickerView': {
      justifyContent: 'flex-start',
      minWidth: '100%',
      height: '100%',
    },
    '& .MuiPickersCalendarHeader-switchHeader .MuiTypography-body1': {
      fontWeight: Fonts.BOLD,
      fontSize: 16,
    },
    '& .MuiPickersCalendarHeader-dayLabel': {
      color: theme.palette.text.primary,
      textTransform: 'uppercase',
      fontWeight: Fonts.MEDIUM,
      flex: 1,
      width: 30,
    },
    '& .MuiPickersCalendar-transitionContainer': {
      height: '100%',
    },
    '& .MuiPickersCalendar-transitionContainer > div': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    '& .MuiPickersCalendar-week': {
      flex: 1,
      alignItems: 'center',
      '& > div': {
        flex: 1,
        textAlign: 'center',
      },
    },
    '& .MuiPickersCalendarHeader-daysHeader': {
      marginTop: 15,
    },
    '& .MuiPickersDay-day': {
      width: 30,
      height: 30,
    },
  },
}));

const DateSelector = (props) => {
  const [day, setDay] = useState(null);

  const handleChange = (day) => {
    setDay(day);
  };

  const classes = useStyles(props);

  return (
    <AppCard height='1' contentStyle={{padding: 0}}>
      <Box height='100%' width='100%' className={classes.calendarRoot}>
        <DatePicker
          autoOk
          variant='static'
          openTo='date'
          value={day}
          onChange={handleChange}
        />
      </Box>
    </AppCard>
  );
};

export default DateSelector;
