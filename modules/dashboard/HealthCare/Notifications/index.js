import React from 'react';
import AppCard from '../../../../@sling/core/AppCard';
import {useIntl} from 'react-intl';
import AppMenu from '../../../../@sling/core/AppMenu';
import Scrollbar from '../../../../@sling/core/Scrollbar';
import AppList from '../../../../@sling/core/AppList';
import NotificationCell from './NotificationCell';

const Notifications = ({data}) => {
  const {messages} = useIntl();
  return (
    <AppCard
      contentStyle={{paddingLeft: 0, paddingRight: 0}}
      title={messages['healthCare.notification']}
      action={<AppMenu />}>
      <Scrollbar style={{maxHeight: 280}}>
        <AppList
          data={data}
          renderRow={(notification) => (
            <NotificationCell
              key={notification.id}
              notification={notification}
            />
          )}
        />
      </Scrollbar>
    </AppCard>
  );
};

export default Notifications;
