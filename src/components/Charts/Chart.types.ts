import type { ReactNode } from 'react';

/** Single-series point for bar / line charts */
export interface ChartSeriesPoint {
  label: string;
  value: number;
}

/** Slice for pie / donut */
export interface ChartSlice {
  name: string;
  value: number;
  color?: string;
}

export interface ChartLayoutProps {
  /** Chart area height in px */
  height?: number;
  className?: string;
}

export interface ChartContainerProps extends ChartLayoutProps {
  children: ReactNode;
}

export interface BarChartProps extends ChartLayoutProps {
  data: ChartSeriesPoint[];
  /** Bar fill (default: brand blue) */
  color?: string;
}

export interface LineChartProps extends ChartLayoutProps {
  data: ChartSeriesPoint[];
  color?: string;
  /** Show area under line */
  showArea?: boolean;
}

export interface PieChartProps extends ChartLayoutProps {
  data: ChartSlice[];
  /** Outer label */
  showLabels?: boolean;
}

export interface DonutChartProps extends ChartLayoutProps {
  data: ChartSlice[];
  /** Inner radius as % of max radius (0–90 typical) */
  innerRadius?: number | `${number}%`;
  showLabels?: boolean;
}

export interface SparklineProps {
  data: number[];
  /** Stroke color */
  color?: string;
  height?: number;
  className?: string;
}
