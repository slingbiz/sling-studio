import React from 'react';
import AppCard from '../@sling/core/AppCard';
import {text} from '@storybook/addon-knobs';
import StatGraphs from '../modules/dashboard/CRM/Statisitcs/GraphTabs/StatGraphs';
import crmData from '../@sling/services/db/dashboard/crm';
import ContextProvider from '../@sling/utility/ContextProvider';

const appCard = {
  title: 'AppCard',
  component: AppCard,
};
export default appCard;

export const Default = () => (
  <ContextProvider>
    <AppCard
      title={text('title', 'Statistics')}
      action={text('action', 'View All')}>
      <StatGraphs data={crmData.statisticsGraph.clientsData} />
    </AppCard>
  </ContextProvider>
);
