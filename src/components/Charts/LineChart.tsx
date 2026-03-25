import React from 'react';
import {
  Area,
  CartesianGrid,
  Line,
  LineChart as ReLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartContainer } from './ChartContainer';
import { chartGridStroke, chartTooltipBorder, lineBrandColor } from './chartTokens';
import type { LineChartProps } from './Chart.types';

export function LineChart({
  data,
  height,
  color = lineBrandColor,
  showArea = true,
  className,
}: LineChartProps) {
  return (
    <ChartContainer height={height} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <ReLineChart data={data} margin={{ top: 12, right: 12, left: -8, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} vertical={false} />
          <XAxis dataKey="label" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} width={40} />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: `1px solid ${chartTooltipBorder}`,
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            }}
          />
          {showArea && (
            <Area
              type="monotone"
              dataKey="value"
              stroke="none"
              fill={color}
              fillOpacity={0.12}
            />
          )}
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2.5}
            dot={{ r: 4, fill: color, strokeWidth: 2, stroke: 'var(--color-bg-canvas)' }}
            activeDot={{ r: 6 }}
          />
        </ReLineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
