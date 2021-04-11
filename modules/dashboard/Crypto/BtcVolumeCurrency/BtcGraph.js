import React, {useState} from 'react';
import {Cell, Pie, PieChart, Sector} from 'recharts';
import {makeStyles} from '@material-ui/core';
import PropTypes from 'prop-types';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius}
        outerRadius={outerRadius + 4}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill='#333'>{`${value}`}</text>
    </g>
  );
};

const BtcGraph = (props) => {
  const useStyles = makeStyles((theme) => ({
    btcGraph: {
      width: '260px !important',
      height: '260px !important',
      alignSelf: 'center',

      [theme.breakpoints.up('xl')]: {
        width: '320px !important',
        height: '320px !important',
      },

      '& .recharts-surface': {
        width: '260px !important',
        height: '260px !important',

        [theme.breakpoints.up('xl')]: {
          width: '320px !important',
          height: '320px !important',
        },
      },
    },
  }));

  const classes = useStyles(props);

  const {data} = props;

  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };

  return (
    <PieChart width={400} height={400} className={classes.btcGraph}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={200}
        cy={200}
        innerRadius={70}
        outerRadius={100}
        fill='#8884d8'
        paddingAngle={5}
        dataKey='value'
        onMouseEnter={onPieEnter}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default BtcGraph;

BtcGraph.defaultProps = {
  data: [],
};

BtcGraph.propTypes = {
  data: PropTypes.array,
};
