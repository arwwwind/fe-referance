import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CustomizedAxisTick = ({ x, y, payload }) => {
  const [firstHalf, secondHalf] = payload.value.split('-');

  return (
    <g transform={`translate(${x},${y})`} width={20}>
      <text x={-35} y={0} dy={16} textAnchor="begin" fill="#32313E" transform="rotate(0)" fontSize={12} fontFamily="Lato">{firstHalf}-</text>
      <text x={-35} y={18} dy={16} textAnchor="begin" fill="#32313E" transform="rotate(0)" fontSize={12} fontFamily="Lato">{secondHalf}</text>
    </g>
  );
};

const EddLiensChart = (props) => props.data.length ? (
  <div className="chart">
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={props.data}>
        <XAxis tickLine={false} stroke="#32313E" fontFamily="Lato" dataKey="name" tick={<CustomizedAxisTick />} height={60} interval={0} />
        <YAxis stroke="#32313E" fontFamily="Lato" label={{ value: 'Days of Overlap', angle: 0, position: 'insideTop', width: 30, offset:15 }} padding={{ top: 100 }} />
        <Tooltip />
        <Bar maxBarSize={36} dataKey="overlap" stackId="a" >
          {
            props.data.map((entry, key) => (
              <Cell key={key} fill={entry.type === 'TD' ? '#4542d7' : entry.type === 'PD' ? '#1fdbd5' : ''} />
            ))
          }
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
) : <div style={{margin: 'auto'}}>No days of overlap to show</div>;

export default EddLiensChart;
