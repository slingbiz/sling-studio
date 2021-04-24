import React from 'react';
import Scrollbar from '../Scrollbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {fade} from '@material-ui/core';

export const useAppsContentStyles = makeStyles((theme) => ({
  appsContentContainer: (props) => ({
    display: 'flex',
    flexDirection: 'column',
    height: `calc(100% - ${props.isDetailView ? 60 : 115}px)`,
    [theme.breakpoints.up('sm')]: {
      height: `calc(100% - ${props.fullView ? 0 : 60}px)`,
    },
    [theme.breakpoints.up('xl')]: {
      height: `calc(100% - ${props.fullView ? 0 : 77}px)`,
    },
    '& .scrum-absolute': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
    },
    '& .scrum-row': {
      display: 'inline-flex',
      minWidth: '100%',
      height: '100%',
      marginLeft: '-10px',
      marginRight: '-10px',
    },
    '& .scrum-col': {
      minWidth: '280px',
      maxWidth: '280px',
      marginLeft: '10px',
      marginRight: '10px',
      borderRadius: theme.overrides.MuiCard.root.borderRadius,
      backgroundColor: fade(theme.palette.background.paper, 0.45),
      height: '100% !important',
      [theme.breakpoints.up('md')]: {
        minWidth: '354px',
        maxWidth: '354px',
      },
    },
    '& .scroll-scrum-item': {
      height: 'auto !important',
    },
  }),
}));

const AppsContent = (props) => {
  const classes = useAppsContentStyles(props);
  return (
    <Scrollbar className={classes.appsContentContainer} style={props.style}>
      {props.children}
    </Scrollbar>
  );
};

export default AppsContent;

AppsContent.defaultProps = {isDetailView: false};
