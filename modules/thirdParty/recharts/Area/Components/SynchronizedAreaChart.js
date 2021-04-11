import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import data from './data';
import Box from '@material-ui/core/Box';

const SynchronizedAreaChart = () => (
  <ResponsiveContainer width='100%'>
    <div>
      <Box component='p' mb={4}>
        A demo of synchronized AreaCharts
      </Box>
      <Box mb={4}>
        <ResponsiveContainer width='100%' height={200}>
          <AreaChart
            data={data}
            syncId='anyId'
            margin={{top: 10, right: 0, left: -25, bottom: 0}}>
            <XAxis dataKey='name' />
            <YAxis />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip />
            <Area
              type='monotone'
              dataKey='uv'
              stroke='#4299E1'
              fill='#4299E1'
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
      <Box component='p' mb={4}>
        Maybe some other content
      </Box>
      <Box mb={4}>
        <ResponsiveContainer width='100%' height={200}>
          <AreaChart
            data={data}
            syncId='anyId'
            margin={{top: 10, right: 0, left: -25, bottom: 0}}>
            <XAxis dataKey='name' />
            <YAxis />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip />
            <Area
              type='monotone'
              dataKey='pv'
              stroke='#F04F47'
              fill='#F04F47'
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </div>
  </ResponsiveContainer>
);

export default SynchronizedAreaChart;
