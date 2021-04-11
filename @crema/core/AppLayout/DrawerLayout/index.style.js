import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    appMain: {
      height: '100vh',
      display: 'flex',
      position: 'relative',
      paddingTop: 56,
      backgroundColor: theme.palette.background.default,
      [theme.breakpoints.up('sm')]: {
        paddingTop: 70,
      },
      '&.appMainFooter': {
        '& $mainContainerFull': {},
      },
      '&.appMainFixedFooter': {
        paddingBottom: 48,
        [theme.breakpoints.up('xl')]: {
          paddingBottom: 58,
        },
        '& $mainContainerFull': {},
      },
    },
    mainContent: {
      flex: 1,
      display: 'flex',
    },
    mainContainerFull: {
      width: '100vw',
      paddingBottom: (props) => (props.footer ? 0 : 10),
      '& > .scrollbar-container': {
        padding: '20px 20px 0',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
          padding: '30px 32px 0',
        },
      },
    },
    boxedLayout: {
      [theme.breakpoints.up('lg')]: {
        maxWidth: 1260,
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '0px 0px 4px 2px rgba(0,0,0,0.12)',
        '& .app-sidebar': {
          position: 'absolute',
        },
        '& .fixed-footer': {
          maxWidth: 1260,
          marginLeft: 'auto',
          marginRight: 'auto',
          right: 0,
        },
        '& $mainContent': {
          width: '100%',
          flex: 'auto',
        },
        '& $mainContainerFull': {
          width: '100%',
        },
        '& .app-bar': {
          width: '100%',
          position: 'absolute',
          boxShadow: '0px 0px 4px 2px rgba(0,0,0,0.12)',
        },
        '& .grid-btn': {
          fontSize: 11,
        },
      },
      [theme.breakpoints.up('xl')]: {
        maxWidth: 1680,
        '& $mainContent, & .app-bar': {
          width: '100%',
        },
        '& .fixed-footer': {
          maxWidth: 1680,
        },
      },
    },
  };
});
export default useStyles;
