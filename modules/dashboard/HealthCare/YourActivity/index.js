import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import AppSelect from '../../../../@crema/core/AppSelect';
import {useIntl} from 'react-intl';
import ActivityGraph from './ActivityGraph';

const YourActivity = ({data}) => {
  const handleChange = (value) => {
    console.log('value', value);
  };
  const {messages} = useIntl();
  return (
    <AppCard
      title={messages['healthCare.yourActivity']}
      action={
        <AppSelect
          menus={['This Week', 'Last Week', 'This Month']}
          defaultValue='This Week'
          onChange={handleChange}
        />
      }>
      <ActivityGraph data={data} />
    </AppCard>
  );
};

export default YourActivity;
