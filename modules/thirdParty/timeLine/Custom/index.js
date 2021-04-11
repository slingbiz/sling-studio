import React from 'react';
import data from './data';
import TimelineItem from './Component/TimelineItem';
import {makeStyles} from '@material-ui/core';
import Box from '@material-ui/core/Box';

const Timeline = (props) => {
  const useStyles = makeStyles((theme) => ({
    timelineCustom: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',

      '@media (max-width: 499px)': {
        justifyContent: 'flex-start',
      },
    },
    timelineContainer: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      margin: '20px 0',
      width: '100%',

      [theme.breakpoints.up('md')]: {
        margin: '40px 0',
      },

      '@media (max-width: 499px)': {
        minWidth: 400,
        paddingRight: 16,
      },

      '&:after': {
        backgroundColor: '#d5d6d8',
        content: '""',
        position: 'absolute',
        left: 'calc(50% - 0.5px)',
        width: 1,
        height: '100%',

        [theme.breakpoints.down('sm')]: {
          left: 30,
        },

        '@media (max-width: 499px)': {
          left: 10,
        },
      },
    },
  }));

  const classes = useStyles(props);

  return (
    data.length > 0 && (
      <Box className={classes.timelineCustom}>
        <Box className={classes.timelineContainer}>
          {data.map((data, idx) => (
            <TimelineItem data={data} key={idx} />
          ))}
        </Box>
      </Box>
    )
  );
};

export default Timeline;
