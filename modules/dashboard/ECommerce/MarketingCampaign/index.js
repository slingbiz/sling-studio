import React from 'react';
import AppCard from '../../../../@sling/core/AppCard';
import {useIntl} from 'react-intl';
import MarketingTable from './MarketingTable';

const MarketingCampaign = ({marketingCampaign}) => {
  const {messages} = useIntl();

  return (
    <AppCard
      title={messages['eCommerce.marketingCampaign']}
      contentStyle={{paddingLeft: 0, paddingRight: 0}}>
      <MarketingTable marketingCampaign={marketingCampaign} />
    </AppCard>
  );
};

export default MarketingCampaign;
