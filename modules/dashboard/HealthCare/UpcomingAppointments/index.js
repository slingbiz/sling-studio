import React from 'react';
import {useIntl} from 'react-intl';
import AppCard from '../../../../@crema/core/AppCard';
import AppMenu from '../../../../@crema/core/AppMenu';
import AppList from '../../../../@crema/core/AppList';
import AppointmentCell from './AppointmentCell';
import Scrollbar from '../../../../@crema/core/Scrollbar';

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
