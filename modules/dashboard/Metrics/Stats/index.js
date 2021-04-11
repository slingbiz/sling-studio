import React, {useState} from 'react';
import StatsGraph from './StatsGraph';
import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import AppSelect from '../../../../@crema/core/AppSelect';
import AppCard from '../../../../@crema/core/AppCard';
import {Box} from '@material-ui/core';

const Stats = ({data}) => {
  const [graphData, setGraphData] = useState(data.dataOne);

  const handleYearChange = (value) => {
    switch (value) {
      case 2017:
        setGraphData(data.dataTwo);
        break;
      case 2018:
        setGraphData(data.dataThree);
        break;
      case 2019:
        setGraphData(data.dataOne);
        break;
      default:
        setGraphData(data.dataOne);
    }
  };

  const handleMonthChange = (value) => {
    switch (value) {
      case 'June':
        setGraphData(data.dataTwo);
        break;
      case 'July':
        setGraphData(data.dataThree);
        break;
      case 'August':
        setGraphData(data.dataOne);
        break;
      default:
        setGraphData(data.dataThree);
    }
  };

  const {messages} = useIntl();

  return (
    <AppCard
      height={1}
      title={messages['dashboard.companyProduction']}
      action={
        <Box>
          <AppSelect
            menus={[2019, 2018, 2017]}
            defaultValue={2019}
            onChange={handleYearChange}
          />
          <AppSelect
            menus={[
              messages['common.june'],
              messages['common.july'],
              messages['common.august'],
            ]}
            defaultValue={messages['common.june']}
            onChange={handleMonthChange}
          />
        </Box>
      }>
      <StatsGraph data={graphData} />
    </AppCard>
  );
};

export default Stats;

Stats.defaultProps = {
  data: {
    dataOne: {
      stats1: [],
      stats2: [],
    },
    dataTwo: {
      stats1: [],
      stats2: [],
    },
    dataThree: {
      stats1: [],
      stats2: [],
    },
  },
};

Stats.propTypes = {
  data: PropTypes.object,
};
