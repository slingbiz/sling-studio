import {makeStyles} from '@material-ui/core';
import {orange} from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  customizerOption: {
    position: 'absolute',
    right: 0,
    top: 85,
    zIndex: 1110,
    [theme.breakpoints.up('xl')]: {
      top: 125,
    },
  },
  customizerButton: {
    borderRadius: '30px 0 0 30px',
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
    '& button': {
      borderRadius: '30px 0 0 30px',

      '&:focus': {
        borderRadius: '30px 0 0 30px',
      },
    },
  },
  rightSidebar: {
    width: 300,
    [theme.breakpoints.up('xl')]: {
      width: 400,
    },
  },
  rightSidebarHeader: {
    padding: '20px',
    borderBottom: '1px solid #e0e0e0',
    [theme.breakpoints.up('xl')]: {
      padding: '28px 22px',
    },
  },
  rightSidebarMain: {
    padding: '20px',
    [theme.breakpoints.up('xl')]: {
      padding: '28px 22px',
    },
  },
  customizerItem: {
    '&:not(:last-child)': {
      borderBottom: ['1px solid #e0e0e0'],
      paddingBottom: 20,
      marginBottom: 20,
      [theme.breakpoints.up('xl')]: {
        paddingBottom: 30,
        marginBottom: 30,
      },
    },
  },
  colorRow: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    position: 'relative',
  },
  navOption: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginLeft: '-10px',
    marginRight: '-10px',
  },
  navOptionItem: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
  },
  navOptionContent: {
    position: 'relative',
    cursor: 'pointer',
  },
  navOptionRightIcon: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 20,
    height: 20,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.palette.primary.main,
    color: '',
  },
  selectBox: {
    '& .MuiOutlinedInput-input': {
      padding: '12px 32px 12px 14px',
    },
  },
  toggleBtn: {
    height: 36,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    '&:not(:first-child)': {
      borderColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up('xl')]: {
      height: 48,
      minWidth: 96,
    },
    '&:hover,&:focus': {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.main,
    },
    '&.active': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover,&:focus': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },
    },
  },
  colorOptionList: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 -5px',
    padding: 0,
    listStyle: 'none',
    '& > li': {
      padding: '0 5px',
      marginBottom: 10,
    },
  },
  wFull: {
    width: '100%',
  },
  textWhite: {
    color: 'white',
  },
  mb5: {
    marginBottom: 20,
  },
}));
export default useStyles;
