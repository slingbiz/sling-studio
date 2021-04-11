import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import AppList from '../../../../@crema/core/AppList';
import Box from '@material-ui/core/Box';
import AppLinearProgress from '../../../../@crema/core/AppLinearProgress';
import {useIntl} from 'react-intl';
import {isBreakPointDown} from '../../../../@crema/utility/Utils';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  firstItems: {
    width: '60%',
  },
  secondItems: {
    width: '30%',
  },
  thirdItems: {
    width: '10%',
  },
}));

const getColor = (percentage) => {
  if (percentage < 50) {
    return '#F5585B';
  }
  return '#0A8FDC';
};

const ResultItem = ({result}) => {
  const classes = useStyles();
  return (
    <Box
      className='item-hover'
      px={5}
      py={3}
      display='flex'
      alignItems='center'
      flexWrap='wrap'>
      <Box className={classes.firstItems} display='flex' alignItems='center'>
        <Box
          whiteSpace='nowrap'
          fontSize={14}
          fontWeight={Fonts.MEDIUM}
          component='p'
          color='text.primary'>
          {result.chapter}
        </Box>
        <Box whiteSpace='nowrap' ml={1} component='p' color='text.secondary'>
          - {result.topic}
        </Box>
      </Box>
      <Box className={classes.secondItems} pl={4}>
        <AppLinearProgress
          value={result.percentage}
          activeColor={getColor(result.percentage)}
        />
      </Box>
      <Box
        className={classes.thirdItems}
        pl={4}
        color={getColor(result.percentage)}
        component='span'>
        {result.percentage}%
      </Box>
    </Box>
  );
};

const LatestResults = ({latestResults}) => {
  const {messages} = useIntl();

  const getData = (data) => {
    if (isBreakPointDown('xl')) {
      return data.slice(0, 6);
    } else {
      return data;
    }
  };
  return (
    <AppCard
      height={1}
      title={messages['academy.latestResults']}
      contentStyle={{paddingLeft: 0, paddingRight: 0}}>
      <AppList
        animation='transition.slideRightBigIn'
        data={getData(latestResults)}
        renderRow={(data, index) => <ResultItem key={index} result={data} />}
      />
    </AppCard>
  );
};

export default LatestResults;
