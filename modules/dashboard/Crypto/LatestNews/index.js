import React from 'react';
import NewsList from './NewsList';
import PropTypes from 'prop-types';
import AppCard from '../../../../@crema/core/AppCard';
import {useIntl} from 'react-intl';

const LatestNews = (props) => {
  const {newsData} = props;

  const {messages} = useIntl();

  return (
    <AppCard
      height='1'
      contentStyle={{paddingRight: 0, paddingLeft: 0}}
      title={messages['dashboard.latestNews']}
      action={messages['common.viewAll']}>
      <NewsList newsData={newsData} />
    </AppCard>
  );
};

export default LatestNews;

LatestNews.defaultProps = {
  newsData: [],
};

LatestNews.propTypes = {
  newsData: PropTypes.array,
};
