import React from 'react';
import {
  Bar,
  BarChart as ReBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartContainer } from './ChartContainer';
import type { BarChartProps } from './Chart.types';

const BRAND = '#0055ff';

export function BarChart({ data, height, color = BRAND, className }: BarChartProps) {
  return (
    <ChartContainer height={height} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <ReBarChart data={data} margin={{ top: 12, right: 12, left: -8, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e5ed" vertical={false} />
          <XAxis dataKey="label" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} width={40} />
          <Tooltip
            cursor={{ fill: 'rgba(0, 85, 255, 0.06)' }}
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #e2e5ed',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            }}
          />
          <Bar dataKey="value" fill={color} radius={[10, 10, 4, 4]} maxBarSize={48} />
        </ReBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
