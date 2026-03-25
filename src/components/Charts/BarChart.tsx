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
import {
  chartCursorFill,
  chartGridStroke,
  chartTooltipBorder,
  lineBrandColor,
} from './chartTokens';
import type { BarChartProps } from './Chart.types';

export function BarChart({ data, height, color = lineBrandColor, className }: BarChartProps) {
  return (
    <ChartContainer height={height} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <ReBarChart data={data} margin={{ top: 12, right: 12, left: -8, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} vertical={false} />
          <XAxis dataKey="label" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} width={40} />
          <Tooltip
            cursor={{ fill: chartCursorFill }}
            contentStyle={{
              borderRadius: 12,
              border: `1px solid ${chartTooltipBorder}`,
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            }}
          />
          <Bar dataKey="value" fill={color} radius={[10, 10, 4, 4]} maxBarSize={48} />
        </ReBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
