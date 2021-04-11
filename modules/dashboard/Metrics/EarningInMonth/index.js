import React from 'react';
import EarningGraph from './EarningGraph';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Categories from './Categories';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';

const EarningInMonth = ({data}) => {
  const {messages} = useIntl();
  return (
    <AppCard
      title={messages['dashboard.earningInMonth']}
      footer={<Categories data={data} />}
      height={1}>
      <Box
        my={3}
        display='flex'
        flex='1'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'>
        <EarningGraph data={data} />
      </Box>
    </AppCard>
  );
};

export default EarningInMonth;

EarningInMonth.defaultProps = {
  data: [],
};

EarningInMonth.propTypes = {
  data: PropTypes.array,
};
