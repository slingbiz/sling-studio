import React from 'react';
import GraphTabs from './GraphTabs';
import PropTypes from 'prop-types';
import AppCard from '../../../../@crema/core/AppCard';

export const Statistics = ({clientsData, incomeData, projectData}) => {
  return (
    <AppCard height='100%'>
      <GraphTabs
        clientsData={clientsData}
        incomeData={incomeData}
        projectData={projectData}
      />
    </AppCard>
  );
};

export default Statistics;

Statistics.defaultProps = {
  clientsData: [],
  incomeData: [],
  projectData: [],
};

Statistics.propTypes = {
  clientsData: PropTypes.array,
  incomeData: PropTypes.array,
  projectData: PropTypes.array,
};
