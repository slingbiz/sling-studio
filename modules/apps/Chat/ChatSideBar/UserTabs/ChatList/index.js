import React from 'react';
import ChatItem from './ChatItem';
import PropTypes from 'prop-types';
import AppList from '../../../../../../@sling/core/AppList';
import ListEmptyResult from '../../../../../../@sling/core/AppList/ListEmptyResult';
import {useIntl} from 'react-intl';
import ChatListSkeleton from '../../../../../../@sling/core/Skeleton/ChatListSkeleton';
import {useSelector} from 'react-redux';

const ChatList = ({chatListData, loading}) => {
  const {messages} = useIntl();
  const {selectedUser} = useSelector(({chatApp}) => chatApp);
  return (
    <AppList
      containerStyle={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      data={chatListData}
      ListEmptyComponent={
        <ListEmptyResult
          content={messages['chatApp.noUserFound']}
          loading={loading}
          placeholder={<ChatListSkeleton />}
        />
      }
      renderRow={(item) => (
        <ChatItem key={item.id} item={item} selectedUser={selectedUser} />
      )}
    />
  );
};

export default ChatList;

ChatList.propTypes = {
  chatListData: PropTypes.array.isRequired,
};
