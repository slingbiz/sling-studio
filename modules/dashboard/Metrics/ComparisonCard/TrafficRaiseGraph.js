import React from 'react';
import {Line, LineChart, ResponsiveContainer} from 'recharts';
import PropTypes from 'prop-types';

const TrafficRaiseGraph = ({data, classes}) => {
  return (
    <ResponsiveContainer height={200} className={classes.containerRoot}>
      <LineChart data={data}>
        <Line
          type='monotone'
          dataKey='traffic'
          stroke='#4299E1'
          strokeWidth={5}
          dot={{r: 7}}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TrafficRaiseGraph;

TrafficRaiseGraph.defaultProps = {
  data: [],
};

TrafficRaiseGraph.propTypes = {
  data: PropTypes.array,
};
