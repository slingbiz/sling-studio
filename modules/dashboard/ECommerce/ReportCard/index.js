import React from 'react';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core';
import StaticsGraph from './StaticsGraph';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppCard from '../../../../@crema/core/AppCard';

const useStyles = makeStyles({
  chartContainer: {
    minWidth: 160,
  },
});

const ReportCard = ({data}) => {
  const classes = useStyles();

  return (
    <AppCard className='card-hover'>
      <Box display='flex'>
        <Box flex={1} pr={3}>
          <Box mb={0.5} component='h3' fontSize={20}>
            {data.value}
          </Box>
          <Box component='p' color='#737989'>
            {data.type}
          </Box>
        </Box>
        <Box className={classes.chartContainer}>
          <StaticsGraph
            id={data.id}
            graphData={data.graphData}
            growth={data.growth}
            strokeColor={data.strokeColor}
          />
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            fontWeight={Fonts.BOLD}
            color={data.strokeColor}>
            {data.growth > 0 ? (
              <ArrowUpwardIcon style={{color: data.strokeColor}} />
            ) : (
              <ArrowDownwardIcon style={{color: data.strokeColor}} />
            )}
            {data.growth}
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default ReportCard;
