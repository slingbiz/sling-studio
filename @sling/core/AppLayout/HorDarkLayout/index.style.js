import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    appMain: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      backgroundColor: theme.palette.background.default,
      '&.appMainHor': {
        '& .customizerOption': {
          position: 'fixed',
          top: 205,
          [theme.breakpoints.up('xl')]: {
            top: 225,
          },
        },
        '&.appMainFixedFooter': {
          paddingBottom: 48,
          [theme.breakpoints.up('xl')]: {
            paddingBottom: 58,
          },
          '& .footer': {
            borderTop: 'solid 1px',
            borderTopColor: theme.palette.grey[200],
          },
        },
      },
      '& .footer': {
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        [theme.breakpoints.up('md')]: {
          marginLeft: 0,
          marginRight: 0,
        },
      },
      '& .footerContainer': {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 16,
        paddingRight: 16,
        [theme.breakpoints.up('lg')]: {
          maxWidth: 1140,
        },
        [theme.breakpoints.up('xl')]: {
          maxWidth: 1720,
        },
      },
    },
    mainContent: {
      flex: 1,
      display: 'flex',
    },
    mainContainer: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      [theme.breakpoints.up('lg')]: {
        maxWidth: 1140,
      },
      [theme.breakpoints.up('xl')]: {
        maxWidth: 1720,
      },
      '& > .scrollbar-container': {
        padding: '20px 20px 0',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
          padding: '30px 20px',
        },
        '& > div': {
          marginBottom: 0,
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
        '& $mainContainer': {
          width: '100%',
        },
        '& .grid-btn': {
          fontSize: 11,
        },
      },
      [theme.breakpoints.up('xl')]: {
        maxWidth: 1680,
        '& $mainContent': {
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
