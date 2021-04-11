import React from 'react';
import Box from '@material-ui/core/Box';
import {useSelector} from 'react-redux';
import NoUserScreen from './NoUserScreen';
import MessagesScreen from './MessagesScreen';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  messagesScreenRoot: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  scrollChatNoUser: {
    fontSize: 18,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    height: 'calc(100vh - 169px) !important',
    [theme.breakpoints.up('lg')]: {
      fontSize: 20,
    },
    '& .MuiSvgIcon-root': {
      fontSize: '3rem',
      color: '#BDBDBD',
      [theme.breakpoints.up('lg')]: {
        fontSize: '5rem',
      },
    },
  },
}));

const ChatContent = () => {
  const {selectedUser} = useSelector(({chatApp}) => chatApp);

  const classes = useStyles();
  return (
    <>
      {selectedUser ? (
        <Box className={classes.messagesScreenRoot}>
          <MessagesScreen selectedUser={selectedUser} />
        </Box>
      ) : (
        <Box
          p={4}
          className={clsx(classes.scrollChatNoUser, 'scroll-chat-nouser')}>
          <NoUserScreen />
        </Box>
      )}
    </>
  );
};

export default ChatContent;
