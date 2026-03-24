import type { Meta, StoryObj } from '@storybook/react';
import { PricingTable } from './PricingTable';

const meta: Meta<typeof PricingTable> = {
  title: 'Components/PricingTable',
  component: PricingTable,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Responsive pricing grid with highlighted plan, feature rows, and CTAs.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PricingTable>;

const twoPlans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For individuals getting started.',
    price: '$0',
    period: '/month',
    features: [
      { label: '3 projects', included: true },
      { label: 'Community support', included: true },
      { label: 'SSO', included: false },
    ],
    ctaLabel: 'Start free',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For growing teams that need more.',
    price: '$29',
    period: '/month',
    isHighlighted: true,
    badge: 'Popular',
    features: [
      { label: 'Unlimited projects', included: true },
      { label: 'Priority support', included: true },
      { label: 'SSO', included: true },
    ],
    ctaLabel: 'Upgrade',
  },
];

const threePlans = [
  ...twoPlans,
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Security and scale for large orgs.',
    price: 'Let’s talk',
    period: '',
    features: [
      { label: 'Dedicated support', included: true },
      { label: 'Custom SLA', included: true },
      { label: 'On-prem option', included: true },
    ],
    ctaLabel: 'Contact sales',
  },
];

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    title: 'Choose your plan',
    plans: twoPlans,
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: '#6b7694' }}>Two columns</p>
        <PricingTable title="Simple comparison" plans={twoPlans} />
      </div>
      <div>
        <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: '#6b7694' }}>Three columns</p>
        <PricingTable title="Scale with your team" plans={threePlans} />
      </div>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The table is full-width; constrain the parent for narrow marketing pages.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <PricingTable title="Narrow" plans={twoPlans} />
      </div>
      <div style={{ maxWidth: '100%' }}>
        <PricingTable title="Full width" plans={twoPlans} />
      </div>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ margin: 0, fontSize: 13, color: '#6b7694' }}>
        Highlight one plan with <code>isHighlighted</code> and <code>badge</code>; wire CTAs to checkout or contact flows.
      </p>
      <PricingTable title="Highlighted Pro" plans={twoPlans} />
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div data-theme="dark" style={{ background: '#0c0d10', padding: 24, borderRadius: 12 }}>
      <PricingTable title="Plans" plans={twoPlans} />
    </div>
  ),
};
