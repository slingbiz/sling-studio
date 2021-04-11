import React from 'react';
import Box from '@material-ui/core/Box';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {green, red} from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core';
import StatGraphs from './StatGraphs';
import AppCard from '../../../../@crema/core/AppCard';

const StateCard = ({data}) => {
  const useStyles = makeStyles((theme) => ({
    icon: {
      height: 50,
      width: 50,
      marginLeft: 'auto',
      marginRight: -20,
      marginTop: -12,
    },
    statGraphs: {
      margin: '0 -24px -20px',
    },
  }));
  const classes = useStyles();

  return (
    <AppCard className={classes.statsCard}>
      <Box display='flex' flex={1} flexDirection='column'>
        <Box display='flex' flex={1} flexDirection='row'>
          <Box position='relative' mr={{xs: 3, xl: 6}}>
            <Box mb={1}>
              <Box
                component='h3'
                display='inline-block'
                fontWeight={Fonts.BOLD}
                fontSize={20}>
                {data.value}
              </Box>
              <Box
                component='span'
                ml={3}
                fontSize={16}
                fontWeight={Fonts.MEDIUM}
                color={data.growth > 0.0 ? green[500] : red[500]}>
                {data.growth}%
              </Box>
            </Box>
            <Box component='p' fontSize={14} color='text.secondary' mb={1}>
              {data.type}
            </Box>
          </Box>
          <IconButton className={classes.icon}>
            <img alt='icon' src={data.icon} />
          </IconButton>
        </Box>
        <Box className={classes.statGraphs}>
          <StatGraphs data={data.graphData} strokeColor={data.strokeColor} />
        </Box>
      </Box>
    </AppCard>
  );
};

export default StateCard;
