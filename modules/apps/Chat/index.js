import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import ChatSideBar from './ChatSideBar';
import ChatContent from './ChatContent';
import {getConnectionList} from '../../../redux/actions/ChatApp';
import {useIntl} from 'react-intl';
import AppsContainer from '../../../@crema/core/AppsContainer';

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConnectionList());
  }, [dispatch]);

  const {messages} = useIntl();
  return (
    <AppsContainer
      title={messages['chatApp.chat']}
      sidebarContent={<ChatSideBar />}>
      <ChatContent />
    </AppsContainer>
  );
};

export default Chat;
