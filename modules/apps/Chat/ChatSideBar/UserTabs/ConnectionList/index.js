import React from 'react';
import ConnectionItem from './ConnectionItem';
import PropTypes from 'prop-types';
import AppList from '../../../../../../@crema/core/AppList';
import ListEmptyResult from '../../../../../../@crema/core/AppList/ListEmptyResult';
import ChatListSkeleton from '../../../../../../@crema/core/Skeleton/ChatListSkeleton';
import {useIntl} from 'react-intl';
import {useSelector} from 'react-redux';

const ConnectionList = ({connectionListData, loading}) => {
  const {messages} = useIntl();
  const {selectedUser} = useSelector(({chatApp}) => chatApp);
  return (
    <AppList
      containerStyle={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      data={connectionListData}
      ListEmptyComponent={
        <ListEmptyResult
          content={messages['chatApp.noUserFound']}
          loading={loading}
          placeholder={<ChatListSkeleton />}
        />
      }
      renderRow={(item) => (
        <ConnectionItem
          listStyle='px-0'
          key={item.id}
          item={item}
          selectedUser={selectedUser}
        />
      )}
    />
  );
};

export default ConnectionList;

ConnectionList.propTypes = {
  connectionListData: PropTypes.array.isRequired,
};
