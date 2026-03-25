import { BarChart } from './BarChart';
import { DonutChart } from './DonutChart';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';
import { Sparkline } from './Sparkline';

/**
 * Namespace of chart primitives (Bar, Line, Pie, Donut, Sparkline).
 * Each component is also exported by name from the VDS Design System package (`@design-system/core`).
 */
export const Charts = {
  Bar: BarChart,
  Line: LineChart,
  Pie: PieChart,
  Donut: DonutChart,
  Sparkline,
};
