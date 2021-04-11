import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import SenderMessageItem from './SenderMessageItem';
import ReceiverMessageItem from './ReceiverMessageItem';
import AppList from '../../../../../@crema/core/AppList';

const MessagesList = ({
  userMessages,
  authUser,
  selectedUser,
  onClickEditMessage,
  deleteMessage,
}) => {
  return (
    <Box px={6} py={6}>
      <AppList
        animation='transition.slideUpIn'
        data={userMessages.messageData}
        renderRow={(item) => {
          if (item.sender === authUser.id) {
            return (
              <SenderMessageItem
                authUser={authUser}
                item={item}
                key={item.id}
                onClickEditMessage={onClickEditMessage}
                deleteMessage={deleteMessage}
              />
            );
          } else {
            return (
              <ReceiverMessageItem
                selectedUser={selectedUser}
                item={item}
                key={item.id}
              />
            );
          }
        }}
      />
    </Box>
  );
};

export default MessagesList;

MessagesList.defaultProps = {};

MessagesList.prototype = {
  userMessages: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
  selectedUser: PropTypes.object.isRequired,
  onClickEditMessage: PropTypes.func,
  deleteMessage: PropTypes.func,
};
