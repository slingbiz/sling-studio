import React from 'react';
import PopularCoinsTable from './PopularCoinsTable';
import PropTypes from 'prop-types';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';

const PopularCoins = (props) => {
  const {popularCoins} = props;
  const {messages} = useIntl();
  return (
    <AppCard
      height='1'
      contentStyle={{paddingLeft: 0, paddingRight: 0}}
      title={messages['dashboard.popularCoins']}
      action={messages['common.viewAll']}>
      <PopularCoinsTable popularCoins={popularCoins} />
    </AppCard>
  );
};

export default PopularCoins;

PopularCoins.defaultProps = {
  popularCoins: [],
};

PopularCoins.propTypes = {
  popularCoins: PropTypes.array,
};
