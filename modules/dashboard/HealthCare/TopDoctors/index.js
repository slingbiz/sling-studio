import React from 'react';
import {useIntl} from 'react-intl';
import AppCard from '../../../../@sling/core/AppCard';
import AppMenu from '../../../../@sling/core/AppMenu';
import AppList from '../../../../@sling/core/AppList';
import DoctorCell from './DoctorCell';
import Scrollbar from '../../../../@sling/core/Scrollbar';

const TopDoctors = ({data}) => {
  const {messages} = useIntl();
  return (
    <AppCard
      title={messages['healthCare.topDoctors']}
      contentStyle={{paddingLeft: 0, paddingRight: 0}}
      action={<AppMenu />}>
      <Scrollbar style={{maxHeight: 280}}>
        <AppList
          data={data}
          renderRow={(doctor) => <DoctorCell key={doctor.id} doctor={doctor} />}
        />
      </Scrollbar>
    </AppCard>
  );
};

export default TopDoctors;
