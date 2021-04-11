import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import {Box, makeStyles} from '@material-ui/core';
import Graph from './Graph';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import {Fonts} from '../../../../shared/constants/AppEnums';

const useStyles = makeStyles((theme) => ({
  arrowIconRoot: {
    fontSize: 18,
    marginRight: 2,
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
}));

const AppointmentCard = ({data}) => {
  const classes = useStyles();
  return (
    <AppCard style={{backgroundColor: data.color}} className='card-hover'>
      <Box display='flex' flexDirection='row' color='white'>
        <Box width={1 / 2} display='flex' flexDirection='column'>
          <Box>
            <img src={data.icon} alt={data.name} />
          </Box>
          <Box py={2} className={classes.truncate}>
            {data.name}
          </Box>
          <Box fontSize={20} fontWeight={Fonts.BOLD}>
            {data.value}
          </Box>
        </Box>
        <Box
          width={1 / 2}
          display='flex'
          flexDirection='column'
          alignItems='flex-end'>
          <Box display='flex' alignItems='center'>
            <ArrowUpwardIcon className={classes.arrowIconRoot} />
            <Box>{data.chartValue}</Box>
          </Box>
          <Box
            fontSize={12}
            mb={3}
            fontWeight={Fonts.BOLD}
            className={classes.truncate}
            textAlign='right'>
            {data.chartTime}
          </Box>
          <Graph data={data.chartData} />
        </Box>
      </Box>
    </AppCard>
  );
};

export default AppointmentCard;
