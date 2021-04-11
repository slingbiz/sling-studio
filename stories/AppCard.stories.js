import React from 'react';
import AppCard from '../@crema/core/AppCard';
import {text} from '@storybook/addon-knobs';
import StatGraphs from '../modules/dashboard/CRM/Statisitcs/GraphTabs/StatGraphs';
import crmData from '../@crema/services/db/dashboard/crm';
import ContextProvider from '../@crema/utility/ContextProvider';

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
