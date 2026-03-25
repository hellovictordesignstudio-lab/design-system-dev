import React from 'react';
import styled from 'styled-components';
import type { ChartContainerProps } from './Chart.types';

const Box = styled.div<{ $height: number }>`
  width: 100%;
  height: ${({ $height }) => $height}px;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};

  .recharts-cartesian-axis-tick-value {
    fill: ${({ theme }) => theme.colors['color-text-tertiary']};
    font-size: 12px;
  }

  .recharts-legend-item-text {
    color: ${({ theme }) => theme.colors['color-text-secondary']} !important;
    font-size: 13px !important;
  }
`;

export function ChartContainer({ children, height = 280, className }: ChartContainerProps) {
  return (
    <Box $height={height} className={className}>
      {children}
    </Box>
  );
}
