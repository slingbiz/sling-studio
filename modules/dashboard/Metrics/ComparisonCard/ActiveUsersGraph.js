import React from 'react';
import {Line, LineChart, ResponsiveContainer} from 'recharts';
import PropTypes from 'prop-types';

const ActiveUsersGraph = ({data, classes}) => {
  return (
    <ResponsiveContainer height={200} className={classes.containerRoot}>
      <LineChart data={data}>
        <Line
          type='monotone'
          dataKey='activeUsers'
          stroke='#4299E1'
          strokeWidth={5}
          dot={{r: 0}}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ActiveUsersGraph;

ActiveUsersGraph.defaultProps = {
  data: [],
};

ActiveUsersGraph.propTypes = {
  data: PropTypes.array,
};
