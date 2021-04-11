import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    appMain: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
      backgroundColor: theme.palette.background.default,
      paddingTop: 56,

      [theme.breakpoints.up('lg')]: {
        paddingTop: 0,
      },
      '&.bitBucketCollapsed': {
        '& $mainContent': {
          position: 'relative',
          '& $mainContainer': {
            width: 'calc(100vw - 4.3rem)',
          },
        },
        '& .bit-bucket-sidebar': {
          width: '4.3rem',
          '& .app-sidebar-container': {
            width: '1rem',
          },
        },
      },
    },
    mainContent: {
      flex: 1,
      display: 'flex',
    },
    mainContainer: {
      width: `calc(100vw - 19rem)`,
      paddingBottom: (props) => (props.footer ? 0 : 10),
      transition: 'all 0.5s ease',

      [theme.breakpoints.up('xl')]: {
        width: `calc(100vw - 21.6rem)`,
      },
      '& > .scrollbar-container': {
        padding: '20px 20px 0',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
          padding: '30px 32px 0',
        },
      },
    },
    mainContainerFull: {
      width: '100vw',
      paddingBottom: 10,
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
        '& $mainContent': {
          width: 'calc(100% - 19rem)',
          flex: 'auto',
        },
        '& $mainContainer': {
          width: '100%',
        },
        '& .app-bar': {
          width: 'calc(100% - 19rem)',
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
          width: 'calc(100% - 21.6rem)',
        },
      },
    },
  };
});
export default useStyles;
