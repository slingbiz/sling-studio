import React from 'react';
import SlingCard from '../../../../@sling/core/SlingCard';
import TransactionTable from './TransactionTable';
import AppSelect from '../../../../@sling/core/AppSelect';
import {useIntl} from 'react-intl';

const OrderNTransaction = ({transactionData}) => {
  const handleSelectionType = (data) => {
    console.log('data: ', data);
  };
  const {messages} = useIntl();
  return (
    <SlingCard
      height={1}
      contentStyle={{paddingLeft: 0, paddingRight: 0}}
      title={messages['dashboard.analytics.ordersTransaction']}
      action={
        <AppSelect
          menus={[
            messages['dashboard.thisWeek'],
            messages['dashboard.lastWeeks'],
            messages['dashboard.lastMonth'],
          ]}
          defaultValue={messages['dashboard.thisWeek']}
          onChange={handleSelectionType}
        />
      }>
      <TransactionTable transactionData={transactionData} />
    </SlingCard>
  );
};

export default OrderNTransaction;
