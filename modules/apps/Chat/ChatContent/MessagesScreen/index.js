import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import {useDispatch, useSelector} from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  getConnectionMessages,
  onDeleteConversation,
  onDeleteMessage,
  onEditMessage,
  onSendMessage,
} from '../../../../../redux/actions/ChatApp';
import AddNewMessage from './AddNewMessage';
import MessagesList from './MessagesList';
import {useAuthUser} from '../../../../../@crema/utility/AppHooks';
import moment from 'moment';
import Header from './Header';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import grey from '@material-ui/core/colors/grey';
import AppsHeader from '../../../../../@crema/core/AppsContainer/AppsHeader';
import {useAppsContentStyles} from '../../../../../@crema/core/AppsContainer/AppsContent';
import AppsFooter from '../../../../../@crema/core/AppsContainer/AppsFooter';
import {MessageType} from '../../../../../@crema/services/db/apps/chat/connectionList';

const useStyles = makeStyles((theme) => ({
  scrollChatNomain: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    height: '100% !important',
  },
  noMessage: {
    fontSize: 18,
    color: grey[500],
  },
}));

const MessagesScreen = ({selectedUser}) => {
  const [message, setMessage] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const {userMessages} = useSelector(({chatApp}) => chatApp);
  const dispatch = useDispatch();
  const user = useAuthUser();

  let _scrollBarRef = null;
  useEffect(() => {
    dispatch(getConnectionMessages(selectedUser.channelId));
  }, [dispatch, selectedUser]);

  useEffect(() => {
    if (
      userMessages &&
      userMessages.messageData &&
      userMessages.messageData.length > 0
    ) {
      if (_scrollBarRef) {
        _scrollBarRef._container.scrollTop = 99999;
      }
    }
  }, [userMessages, _scrollBarRef]);

  const sendFileMessage = (fileMessage) => {
    const data = {
      ...fileMessage,
      sender: user.id,
      time: moment().format('llll'),
    };
    dispatch(onSendMessage(selectedUser.channelId, data));
  };

  const onSend = (message) => {
    const data = {
      ...selectedMessage,
      message,
      message_type: MessageType.TEXT,
      sender: user.id,
      time: moment().format('llll'),
    };

    console.log('data: ', data, isEdit);
    if (isEdit) {
      data.edited = true;
      dispatch(onEditMessage(selectedUser.channelId, data));
      setMessage('');
      setIsEdit(false);
      setSelectedMessage(null);
    } else {
      dispatch(onSendMessage(selectedUser.channelId, data));
      setMessage('');
    }
  };

  const onClickEditMessage = (data) => {
    if (data.message_type === MessageType.TEXT) {
      setIsEdit(true);
      setMessage(data.message);
      setSelectedMessage(data);
    }
  };

  const deleteMessage = (messageId) => {
    dispatch(onDeleteMessage(selectedUser.channelId, messageId));
  };

  const deleteConversation = () => {
    dispatch(onDeleteConversation(selectedUser.channelId));
  };

  const appsContentStyles = useAppsContentStyles();

  const classes = useStyles();
  return (
    <Box display='flex' height={1} flexDirection='column'>
      <AppsHeader>
        <Header
          selectedUser={selectedUser}
          deleteConversation={deleteConversation}
        />
      </AppsHeader>

      {userMessages && user ? (
        <PerfectScrollbar
          ref={(ref) => {
            _scrollBarRef = ref;
          }}
          className={appsContentStyles.appsContentContainer}>
          <MessagesList
            userMessages={userMessages}
            authUser={user}
            selectedUser={selectedUser}
            onClickEditMessage={onClickEditMessage}
            deleteMessage={deleteMessage}
          />
        </PerfectScrollbar>
      ) : (
        <Box
          className={clsx(classes.scrollChatNomain, 'scroll-chat-nomain')}
          component='span'>
          <Box component='span' className={classes.noMessage}>
            <IntlMessages id='chatApp.sayHi' /> {selectedUser.name}
          </Box>
        </Box>
      )}

      <AppsFooter mt='auto'>
        <AddNewMessage
          currentMessage={message}
          sendFileMessage={sendFileMessage}
          onSendMessage={onSend}
        />
      </AppsFooter>
    </Box>
  );
};

export default MessagesScreen;

MessagesScreen.defaultProps = {};

MessagesScreen.prototype = {
  selectedUser: PropTypes.object.isRequired,
};
