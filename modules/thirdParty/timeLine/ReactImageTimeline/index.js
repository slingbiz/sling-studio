import React from 'react';
import Timeline from 'react-image-timeline';
import {makeStyles} from '@material-ui/core';
import Box from '@material-ui/core/Box';

const events = [
  {
    date: new Date(2019, 10, 10),
    text: 'Sed leo elit, pellentesque sit amet congue quis, ornare nec lorem.',
    title: 'Madrid, Spain',
    buttonText: 'Read More',
    imageUrl: '/images/timeline/madrid.jpg',
  },
  {
    date: new Date(2019, 10, 27),
    text: 'Sed leo elit, pellentesque sit amet congue quis, ornare nec lorem.',
    title: 'New York, New York',
    buttonText: 'Read More',
    imageUrl: '/images/timeline/ny.jpg',
  },
  {
    date: new Date(2019, 11, 2),
    text: 'Sed leo elit, pellentesque sit amet congue quis, ornare nec lorem.',
    title: 'London, England',
    buttonText: 'Read More',
    imageUrl: '/images/timeline/london.jpg',
  },
  {
    date: new Date(2019, 11, 20),
    text: 'Sed leo elit, pellentesque sit amet congue quis, ornare nec lorem.',
    title: 'Cairo, Egypt',
    buttonText: 'Read More',
    imageUrl: '/images/timeline/cairo.jpg',
  },
  {
    date: new Date(2019, 12, 5),
    text: 'Sed leo elit, pellentesque sit amet congue quis, ornare nec lorem.',
    title: 'Chicago, Illinois',
    buttonText: 'Read More',
    imageUrl: '/images/timeline/chicago.jpg',
  },
  {
    date: new Date(2019, 12, 10),
    text: 'Sed leo elit, pellentesque sit amet congue quis, ornare nec lorem.',
    title: 'Paris, France',
    buttonText: 'Read More',
    imageUrl: '/images/timeline/paris.jpg',
  },
  {
    date: new Date(2019, 12, 25),
    text: 'Sed leo elit, pellentesque sit amet congue quis, ornare nec lorem.',
    title: 'Rome, Italy',
    buttonText: 'Read More',
    imageUrl: '/images/timeline/rome.jpg',
  },
  {
    date: new Date(2019, 12, 28),
    text: 'Sed leo elit, pellentesque sit amet congue quis, ornare nec lorem.',
    title: 'Seoul, South Korea',
    buttonText: 'Read More',
    imageUrl: '/images/timeline/seoul.jpg',
  },
  {
    date: new Date(2020, 1, 1),
    text: 'Sed leo elit, pellentesque sit amet congue quis, ornare nec lorem.',
    title: 'Berlin, Germany',
    buttonText: 'Read More',
    imageUrl: '/images/timeline/berlin.jpg',
  },
  {
    date: new Date(2020, 1, 10),
    text: 'Sed leo elit, pellentesque sit amet congue quis, ornare nec lorem.',
    title: 'Tokyo, Japan',
    buttonText: 'Read More',
    imageUrl: '/images/timeline/tokyo.jpg',
  },
];

const ReactImageTimeline = (props) => {
  const useStyles = makeStyles((theme) => ({
    timelineImage: {
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        paddingBottom: 16,
      },
      '& .rt-backing': {
        borderRadius: theme.overrides.MuiCard.root.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      },
      '& .rt-event .rt-svg-container .rt-arrow': {
        color: theme.palette.background.paper,
      },
      '& .rt-event .rt-dot': {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.secondary.main,
        border: `solid 2px ${theme.palette.secondary.main}`,
      },
      '& .rt-footer-container': {
        borderTop: `solid 1px ${theme.palette.grey[300]}`,
      },
      '& .rt-label': {
        backgroundColor: theme.palette.secondary.main,
      },
      '& .rt-btn': {
        color: theme.palette.secondary.main,
        backgroundColor: 'transparent',
        border: '0 none',
      },
    },
  }));

  const classes = useStyles(props);

  return (
    <Box className={classes.timelineImage}>
      <Timeline events={events} />
    </Box>
  );
};
export default ReactImageTimeline;
