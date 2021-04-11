import React from 'react';
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

const SocialMediaGraph = ({socialMediaData, classes}) => {
  const customizedLabel = (props) => {
    const {x, y, value} = props;
    return (
      <text
        x={x + 15}
        y={y}
        dy={-20}
        className={classes.graphText}
        fill={value > 0 ? '#48BB78' : '#E53E3E'}
        textAnchor='middle'>
        {value > 0 ? '+' + value : value}%
      </text>
    );
  };

  return (
    <Box mt={5}>
      <ResponsiveContainer width='100%' height={370}>
        <BarChart
          barSize={35}
          data={socialMediaData}
          margin={{top: 35, right: 0, left: 0, bottom: 35}}>
          <XAxis dataKey='revenue' axisLine={false} tickLine={false} />
          <YAxis hide />
          <Bar dataKey='revenue'>
            <LabelList
              dataKey='change'
              content={(x, y, value) => customizedLabel(x, y, value)}
            />
            {socialMediaData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SocialMediaGraph;

SocialMediaGraph.defaultProps = {
  socialMediaData: [],
};

SocialMediaGraph.propTypes = {
  socialMediaData: PropTypes.array,
};
