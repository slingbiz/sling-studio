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
import {makeStyles} from '@material-ui/core/styles/index';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {isBreakPointDown} from '../../../../@crema/utility/Utils';

const SocialVisitorsGraph = ({data}) => {
  const useStyle = makeStyles((theme) => ({
    graphText: {
      fontWeight: Fonts.MEDIUM,
      fontSize: 16,
      [theme.breakpoints.up('xl')]: {
        fontSize: 18,
      },
    },
  }));
  const classes = useStyle();
  const customizedLabel = (props) => {
    const {x, y, value} = props;
    return (
      <text
        x={x + 15}
        y={y}
        dy={-20}
        fill={value > 0 ? '#48BB78' : '#E53E3E'}
        className={classes.graphText}
        textAnchor='middle'>
        {value > 0 ? '+' + value : value}%
      </text>
    );
  };

  return (
    <ResponsiveContainer
      width='100%'
      height={isBreakPointDown('xl') ? 270 : 300}>
      <BarChart
        barSize={35}
        data={data}
        margin={{top: 30, right: 0, left: 0, bottom: 20}}>
        <XAxis dataKey='visitors' axisLine={false} tickLine={false} hide />
        <YAxis hide />
        <Bar dataKey='visitors'>
          <LabelList
            dataKey='change'
            content={(x, y, value) => customizedLabel(x, y, value)}
          />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SocialVisitorsGraph;

SocialVisitorsGraph.defaultProps = {
  data: [],
};

SocialVisitorsGraph.propTypes = {
  data: PropTypes.array,
};
