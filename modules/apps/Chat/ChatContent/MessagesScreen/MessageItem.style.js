import {fade, makeStyles} from '@material-ui/core';
import orange from '@material-ui/core/colors/orange';

const useStyles = makeStyles((theme) => ({
  messageItemRoot: {
    marginBottom: 22,
    '&:last-child': {
      marginBottom: 0,
    },
    '&.right $messageChatRoot': {
      '& .message-time': {
        marginLeft: 0,
        marginRight: 55,
        textAlign: 'right',
      },
    },
    '&.right $messageChat': {
      flexDirection: 'row-reverse',
      textAlign: 'right',
      backgroundColor: fade(theme.palette.primary.main, 0.75),
      color: theme.palette.background.default,
      '& .MuiAvatar-root': {
        marginRight: -30,
        marginLeft: 0,
      },
      '& .message-info': {
        marginLeft: 0,
        display: 'flex',
        alignItems: 'center',
      },
    },
  },
  messageChatRoot: {
    position: 'relative',
  },
  messageTime: {
    fontSize: 12,
    marginLeft: 55,
    marginBottom: -15,
    color: theme.palette.grey[500],
    display: 'block',
  },
  messageChat: {
    display: 'flex',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,.26)',
    borderRadius: theme.overrides.MuiCard.root.borderRadius,
    padding: '10px 15px',
    position: 'relative',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: theme.palette.background.paper,
    '& .MuiAvatar-root': {
      marginLeft: -30,
      marginTop: -30,
    },
    '& .message-info': {
      fontSize: 14,
      [theme.breakpoints.up('lg')]: {
        fontSize: 16,
      },
    },
  },
  textPointer: {
    cursor: 'pointer',
  },
  arrowIcon: {
    marginTop: 20,
  },
  profilePic: {
    backgroundColor: orange[500],
  },
  editRoot: {
    paddingLeft: 10,
    color: theme.palette.grey[200],
    '& .MuiSvgIcon-root': {
      fontSize: 18,
    },
  },

  mediaWrapper: {
    position: 'relative',
    maxWidth: 360,
    maxHeight: 250,
    display: 'inline-block',
    verticalAlign: 'top',
    overflow: 'hidden',

    '& img': {
      objectFit: 'cover',
      maxWidth: 330,
      borderRadius: 10,
      maxHeight: 226,
    },
  },
  videoIcon: {
    fontSize: 70,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
}));
export default useStyles;
