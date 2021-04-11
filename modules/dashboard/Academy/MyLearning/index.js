import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import AppList from '../../../../@crema/core/AppList';
import LearningItem from './LearningItem';
import {useIntl} from 'react-intl';

const MyLearning = ({learningData}) => {
  const {messages} = useIntl();
  return (
    <AppCard
      title={messages['academy.myLearning']}
      contentStyle={{paddingLeft: 0, paddingRight: 0}}>
      <AppList
        animation='transition.slideRightBigIn'
        data={learningData}
        renderRow={(data, index) => <LearningItem key={index} course={data} />}
      />
    </AppCard>
  );
};

export default MyLearning;
