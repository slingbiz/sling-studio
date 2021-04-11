import {makeStyles} from '@material-ui/core';
import {ThemeStyle} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => {
  return {
    appMain: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
      backgroundColor: theme.palette.background.default,
      paddingTop: 56,
      [theme.breakpoints.up('sm')]: {
        paddingTop: 70,
      },
      '&.appMainFixedFooter': {
        paddingBottom: 48,
        [theme.breakpoints.up('xl')]: {
          paddingBottom: 58,
        },
        '& .scrollAppSidebar': {
          height: (props) =>
            props.themeStyle === ThemeStyle.MODERN
              ? 'calc(100vh - 260px) !important'
              : 'calc(100vh - 198px) !important',
          [theme.breakpoints.up('xl')]: {
            height: (props) =>
              props.themeStyle === ThemeStyle.MODERN
                ? 'calc(100vh - 300px) !important'
                : 'calc(100vh - 236px) !important',
          },
        },
        '& $mainContainer': {
          paddingBottom: 1,
        },
      },
    },
    mainContent: {
      flex: 1,
      display: 'flex',
    },
    mainContainer: {
      paddingBottom: (props) => (props.footer ? 0 : 10),
      width: '100%',
      [theme.breakpoints.up('lg')]: {
        width: `calc(100vw - 19rem)`,
      },
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
        '& $mainContainer': {
          width: 'calc(100% - 19rem)',
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
