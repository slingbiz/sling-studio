import React from 'react';
import {Line, LineChart, ResponsiveContainer, Tooltip} from 'recharts';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  revenueChart: {
    height: '208px !important',
    [theme.breakpoints.up('xl')]: {
      height: '193px !important',
    },
  },
}));

const RevenueGraph = (props) => {
  const classes = useStyles(props);

  const {data} = props;

  return (
    <ResponsiveContainer width={400} className={classes.revenueChart}>
      <LineChart data={data} margin={{left: 10, right: 55, bottom: 10}}>
        <Line
          type='monotone'
          dataKey='revenue'
          stroke='#FFDE00'
          strokeWidth={5}
          dot={{r: 7}}
        />
        <Tooltip
          labelStyle={{color: 'black'}}
          cursor={false}
          content={(data) => {
            return data.payload[0] ? (
              <Box component='span' p={4} color='primary.main'>
                {data.payload[0].payload.revenue}
              </Box>
            ) : null;
          }}
          wrapperStyle={{
            background: '#FFDE00',
            borderRadius: 10,
            radius: 10,
            overflow: 'hidden',
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueGraph;

RevenueGraph.defaultProps = {
  data: [],
};

RevenueGraph.propTypes = {
  data: PropTypes.array,
};
