import React from 'react';
import SocialVisitorsGraph from './SocialVisitorsGraph';
import PropTypes from 'prop-types';
import Categories from './Categories';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';

const SocialVisitors = ({data}) => {
  const {messages} = useIntl();
  return (
    <AppCard
      title={messages['dashboard.socialVisitors']}
      action={messages['common.viewAll']}>
      <SocialVisitorsGraph data={data} />

      <Categories data={data} />
    </AppCard>
  );
};

export default SocialVisitors;

SocialVisitors.defaultProps = {
  data: [],
};

SocialVisitors.propTypes = {
  data: PropTypes.array,
};
