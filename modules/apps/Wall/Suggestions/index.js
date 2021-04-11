import React from 'react';
import Box from '@material-ui/core/Box';
import AppList from '../../../../@crema/core/AppList';
import AppCard from '../../../../@crema/core/AppCard';
import SuggestionItem from './SuggestionItem';
import {useIntl} from 'react-intl';

const Suggestions = ({suggestions}) => {
  const {messages} = useIntl();
  return (
    <AppCard
      mb={8}
      title={messages['wall.suggestions']}
      contentStyle={{paddingLeft: 0, paddingRight: 0}}
      footerStyle={{borderTop: '1px solid #E5E4EA'}}
      footer={
        <Box color='primary.main' textAlign='center' className='pointer'>
          View More
        </Box>
      }>
      <AppList
        data={suggestions}
        renderRow={(item, index) => <SuggestionItem key={index} item={item} />}
      />
    </AppCard>
  );
};

export default Suggestions;
