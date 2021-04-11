import React from 'react';
import AccountGraph from './AccountGraph';
import PropTypes from 'prop-types';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';
import Box from '@material-ui/core/Box';

const YourAccount = ({data}) => {
  const {messages} = useIntl();
  return (
    <AppCard
      title={messages['dashboard.yourAccount']}
      height={1}
      contentStyle={{display: 'flex', flexDirection: 'column'}}>
      <Box mt='auto'>
        <AccountGraph data={data} />
      </Box>
    </AppCard>
  );
};

export default YourAccount;

YourAccount.defaultProps = {
  data: [],
};

YourAccount.propTypes = {
  data: PropTypes.array,
};
