import {makeStyles} from '@material-ui/core';
import {ThemeStyle} from '../../../../shared/constants/AppEnums';

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
        '& $mainContainer': {},
        '& $mainContainerFull': {},
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
        '& $mainContainerFull': {},
      },
    },
    mainContent: {
      flex: 1,
      display: 'flex',
    },
    mainContainer: {
      width: (props) =>
        `calc(100vw - ${
          props.themeStyle === ThemeStyle.MODERN ? '19rem' : '19rem'
        })`,
      paddingBottom: (props) => (props.footer ? 0 : 10),
      [theme.breakpoints.up('xl')]: {
        width: (props) =>
          `calc(100vw - ${
            props.themeStyle === ThemeStyle.MODERN ? '22.8rem' : '21.6rem'
          })`,
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
