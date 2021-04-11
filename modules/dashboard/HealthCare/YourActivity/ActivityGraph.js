import React from 'react';
import {Bar, BarChart, ResponsiveContainer, Tooltip} from 'recharts';

const ActivityGraph = ({data}) => {
  return (
    <ResponsiveContainer width='100%' height={143}>
      <BarChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
        barSize={20}>
        <Tooltip labelStyle={{color: 'black'}} />
        <Bar dataKey='visits' fill='#0A8FDC33' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ActivityGraph;
