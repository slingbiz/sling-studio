import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';
import AppMenu from '../../../../@crema/core/AppMenu';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import AppList from '../../../../@crema/core/AppList';
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
