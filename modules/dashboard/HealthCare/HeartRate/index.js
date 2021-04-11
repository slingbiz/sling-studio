import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import {Box, fade, makeStyles} from '@material-ui/core';
import ViewGraph from './ViewGraph';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  unitTitle: {
    backgroundColor: fade(theme.palette.common.black, 0.04),
    margin: '0 -24px -20px',
    padding: '12px 24px',
    fontSize: 20,
    fontWeight: Fonts.BOLD,
    [theme.breakpoints.up('xl')]: {
      fontSize: 24,
      padding: '8px 24px',
    },
  },
}));

const HeartRate = ({data}) => {
  const classes = useStyles();
  return (
    <AppCard style={{backgroundColor: data.color}}>
      <Box
        color='white'
        display='flex'
        flexDirection='column'
        justifyContent='space-between'>
        <Box fontSize={16} fontWeight={Fonts.BOLD}>
          {data.title}
        </Box>
        <Box display='flex' justifyContent='flex-end' width={1} mb={-10}>
          <Box width={{xs: 3 / 4, xl: 1 / 2}}>
            <ViewGraph data={data.graphData} />
          </Box>
        </Box>
        <Box className={classes.unitTitle}>
          {data.measurement}
          <Box fontSize={16} ml={2} component='span'>
            {data.unit}
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default HeartRate;
