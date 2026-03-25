import type { Meta, StoryObj } from '@storybook/react';
import {
  BarChart,
  DonutChart,
  LineChart,
  PieChart,
  Sparkline,
  Charts,
} from './index';

const series = [
  { label: 'Ene', value: 420 },
  { label: 'Feb', value: 380 },
  { label: 'Mar', value: 510 },
  { label: 'Abr', value: 470 },
  { label: 'May', value: 620 },
];

const slices = [
  { name: 'Web', value: 45 },
  { name: 'Móvil', value: 30 },
  { name: 'Otro', value: 25 },
];

const meta: Meta = {
  title: 'Components/Charts',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Chart primitives built on Recharts: Bar, Line, Pie, Donut, and Sparkline. The **Charts** namespace re-exports the same components by name.',
      },
    },
  },
};

export default meta;

export const Bar: StoryObj = {
  render: () => <BarChart data={series} height={280} />,
};

export const Line: StoryObj = {
  render: () => <LineChart data={series} height={280} showArea />,
};

export const Pie: StoryObj = {
  render: () => <PieChart data={slices} height={300} />,
};

export const Donut: StoryObj = {
  render: () => <DonutChart data={slices} height={300} innerRadius="55%" />,
};

export const SparklineStory: StoryObj = {
  name: 'Sparkline',
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <p style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--color-text-tertiary)' }}>Tendencia 7 días</p>
      <Sparkline data={[12, 14, 11, 18, 16, 22, 20]} height={56} />
    </div>
  ),
};

export const NamespaceCharts: StoryObj = {
  name: 'Charts namespace',
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Charts.Bar data={series} height={220} />
      <Charts.Sparkline data={[3, 5, 4, 7, 6, 9, 8]} color="var(--color-success-default)" />
    </div>
  ),
};
