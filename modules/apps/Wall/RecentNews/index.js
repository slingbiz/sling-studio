import React from 'react';
import Box from '@material-ui/core/Box';
import AppCard from '../../../../@crema/core/AppCard';
import AppList from '../../../../@crema/core/AppList';
import NewsItem from './NewsItem';
import {useIntl} from 'react-intl';

const RecentNews = ({recentNews}) => {
  const {messages} = useIntl();
  return (
    <AppCard
      mb={8}
      title={messages['wall.recentNews']}
      contentStyle={{paddingLeft: 0, paddingRight: 0}}
      footerStyle={{borderTop: '1px solid #E5E4EA'}}
      footer={
        <Box color='primary.main' textAlign='center' className='pointer'>
          View More
        </Box>
      }>
      <AppList
        data={recentNews}
        renderRow={(item, index) => <NewsItem key={index} item={item} />}
      />
    </AppCard>
  );
};

export default RecentNews;
