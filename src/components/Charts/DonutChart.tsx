import React from 'react';
import { Cell, Pie, PieChart as RePieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer } from './ChartContainer';
import { chartTooltipBorder, defaultSeriesColors } from './chartTokens';
import type { DonutChartProps } from './Chart.types';

const DEFAULT_COLORS = [...defaultSeriesColors];

export function DonutChart({
  data,
  height,
  innerRadius = '58%',
  showLabels = true,
  className,
}: DonutChartProps) {
  return (
    <ChartContainer height={height} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RePieChart>
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: `1px solid ${chartTooltipBorder}`,
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            }}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius="80%"
            paddingAngle={2}
            label={showLabels ? ({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%` : false}
          >
            {data.map((entry, i) => (
              <Cell key={entry.name} fill={entry.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]} />
            ))}
          </Pie>
        </RePieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
