import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const data = [
  { value: 70, name: 'maths', color: '#E38627' },
  { value: 15, name: 'English', color: '#C13C37' },
  { value: 15, name: 'physics', color: '#6A2135' },
];

const PieChartComponent = () => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={100}
        outerRadius={140}
        fill="#8884d8"
        label
      >
        {data.map((entry) => (
          <Cell key={`cell-${entry.name}`} fill={entry.color} />
        ))}
      </Pie>
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
