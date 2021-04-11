import React from 'react';
import {Box} from '@material-ui/core';
import AppSelect from '../../../../@crema/core/AppSelect';
import AppCard from '../../../../@crema/core/AppCard';
import GradeGraph from './GradeGraph';
import {useIntl} from 'react-intl';

const AverageGrades = ({grades}) => {
  const {messages} = useIntl();
  return (
    <AppCard
      height={1}
      display='flex'
      flexDirection='column'
      title={messages['academy.averageGrade']}
      action={
        <Box ml='auto' display='flex' alignItems='center'>
          <AppSelect
            menus={[2020, 2019, 2018]}
            defaultValue={2020}
            onChange={() => {}}
          />
          <AppSelect
            menus={['All Months', 'Jan', 'Feb']}
            defaultValue={'All Months'}
            onChange={() => {}}
          />
        </Box>
      }>
      <Box mt='auto' ml={-8}>
        <GradeGraph grades={grades} />
      </Box>
    </AppCard>
  );
};

export default AverageGrades;
