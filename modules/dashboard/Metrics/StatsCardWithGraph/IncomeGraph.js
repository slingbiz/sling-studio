import React from 'react';
import {Line, LineChart, ResponsiveContainer, Tooltip} from 'recharts';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

const IncomeGraph = ({data}) => {
  return (
    <ResponsiveContainer height={200} width='100%'>
      <LineChart data={data}>
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
              <Box component='span' p={4} color='text.primary'>
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

export default IncomeGraph;

IncomeGraph.defaultProps = {
  data: [],
};

IncomeGraph.propTypes = {
  data: PropTypes.array,
};
