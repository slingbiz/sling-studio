import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      '& .cr-calendar .react-daypicker-root .day.today, & .cr-calendar .react-daypicker-root .day.today:hover ': {
        color: theme.palette.primary.main,
      },
      '& .rbc-event, & .rbc-event.rbc-selected': {
        backgroundColor: theme.palette.primary.main,
      },
      '& .rbc-slot-selection': {
        backgroundColor: theme.palette.primary.main,
      },
      '& .rbc-toolbar button': {
        cursor: 'pointer',
        color: theme.palette.text.secondary,
        fontSize: '100%',
        '&:hover, &:focus': {
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        },
        '&:active, &.rbc-active': {
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
        },
      },
      '& .cr-calendar-color .header': {
        backgroundColor: theme.palette.primary.main,
      },
      '& .rbc-off-range-bg': {
        backgroundColor: theme.palette.background.paper,
      },
      '& .rbc-row-segment a': {
        color: theme.palette.primary.main,
      },
      '& .cr-calendar table': {
        color: '#a8aaad',
        '& th': {
          color: '#b1b5b8',
        },
      },
      '& .cr-calendar .react-daypicker-root .day:hover:not(.empty), & .cr-calendar .react-daypicker-root .day.active': {
        backgroundColor: 'transparent',
        color: '#888888',
      },
      '& .cr-calendar-color .react-daypicker-root .previous-month, & .cr-calendar-color .react-daypicker-root .next-month, & .cr-calendar-color .react-daypicker-root .previous-month:hover, & .cr-calendar-color .react-daypicker-root .next-month:hover': {
        color: theme.palette.primary.contrastText,
      },
      '& .cr-calendar-color .header .month-year': {
        color: theme.palette.primary.contrastText,
      },
      '& .cr-calendar-color table thead th': {
        color: '#313541',
      },
      '& .rbc-today': {
        backgroundColor: theme.palette.background.paper,
      },
      '& .rbc-show-more': {
        backgroundColor: 'transparent',
      },
    },
    selectRoot: {
      marginLeft: 12,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
  };
});
export default useStyles;
