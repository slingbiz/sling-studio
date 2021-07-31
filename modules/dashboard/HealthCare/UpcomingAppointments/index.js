import React from 'react';
import {useIntl} from 'react-intl';
import AppCard from '../../../../@sling/core/AppCard';
import AppMenu from '../../../../@sling/core/AppMenu';
import AppList from '../../../../@sling/core/AppList';
import AppointmentCell from './AppointmentCell';
import Scrollbar from '../../../../@sling/core/Scrollbar';

const UpcomingAppointments = ({data}) => {
  const {messages} = useIntl();
  return (
    <AppCard
      contentStyle={{paddingLeft: 0, paddingRight: 0}}
      title={messages['healthCare.upcomingAppointments']}
      action={<AppMenu />}>
      <Scrollbar style={{maxHeight: 280}}>
        <AppList
          data={data}
          renderRow={(appointment) => (
            <AppointmentCell key={appointment.id} appointment={appointment} />
          )}
        />
      </Scrollbar>
    </AppCard>
  );
};

export default UpcomingAppointments;
