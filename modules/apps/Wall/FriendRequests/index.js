import React from 'react';
import AppCard from '../../../../@sling/core/AppCard';
import AppList from '../../../../@sling/core/AppList';
import RequestItem from './RequestItem';

const FriendRequests = ({friendRequests}) => {
  return (
    <AppCard
      title={`${friendRequests.length} friend requests`}
      contentStyle={{paddingLeft: 0, paddingRight: 0}}>
      <AppList
        animation='transition.slideRightBigIn'
        data={friendRequests}
        renderRow={(data, index) => <RequestItem key={index} request={data} />}
      />
    </AppCard>
  );
};

export default FriendRequests;
