import React from 'react';
import GoalProgressGraph from './GoalProgressGraph';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';

const GoalProgress = ({progressGraphData}) => {
  const {messages} = useIntl();
  return (
    <AppCard height='1' title={messages['dashboard.goalProgress']}>
      <GoalProgressGraph progressGraphData={progressGraphData} />
      <Box mt={5} px={2} mb={1} display='flex' alignItems='center'>
        <Box display='flex' alignItems='center'>
          <Box
            component='span'
            height={{xs: 12, xl: 16}}
            width={{xs: 12, xl: 16}}
            mr={2}
            borderRadius='50%'
            bgcolor='primary.main'
          />
          <Box component='span' fontSize={14}>
            <IntlMessages id='dashboard.inProgress' />
          </Box>
        </Box>
        <Box ml='auto' display='flex' alignItems='center'>
          <Box
            component='span'
            height={{xs: 12, xl: 16}}
            width={{xs: 12, xl: 16}}
            mr={2}
            borderRadius='50%'
            bgcolor='error.main'
          />
          <Box component='span' fontSize={14}>
            <IntlMessages id='common.actual' />
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default GoalProgress;

GoalProgress.defaultProps = {
  progressGraphData: [],
};

GoalProgress.propTypes = {
  progressGraphData: PropTypes.array,
};
