import React, { useMemo } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import styled from 'styled-components';
import type { SparklineProps } from './Chart.types';

const Wrap = styled.div<{ $height: number }>`
  width: 100%;
  height: ${({ $height }) => $height}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const BRAND = '#0055ff';

export function Sparkline({
  data,
  color = BRAND,
  height = 48,
  className,
}: SparklineProps) {
  const points = useMemo(
    () => data.map((value, i) => ({ i: String(i), value })),
    [data]
  );

  return (
    <Wrap $height={height} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={points} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <Tooltip
            cursor={false}
            contentStyle={{
              borderRadius: 8,
              border: '1px solid #e2e5ed',
              fontSize: 12,
            }}
            formatter={(v) => [v, '']}
            labelFormatter={() => ''}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive
          />
        </LineChart>
      </ResponsiveContainer>
    </Wrap>
  );
}
