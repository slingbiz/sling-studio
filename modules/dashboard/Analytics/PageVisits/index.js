import React from 'react';
import SlingCard from '../../../../@sling/core/SlingCard';
import VisitsTable from './VisitsTable';
import {useIntl} from 'react-intl';

const PageVisits = ({pageVisits}) => {
  const {messages} = useIntl();
  return (
    <SlingCard
      contentStyle={{paddingLeft: 0, paddingRight: 0}}
      title={messages['dashboard.analytics.pageVisits']}
      action={messages['common.viewAll']}>
      <VisitsTable visitsData={pageVisits} />
    </SlingCard>
  );
};

export default PageVisits;
