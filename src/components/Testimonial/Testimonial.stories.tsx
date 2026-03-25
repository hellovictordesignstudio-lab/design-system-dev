import type { Meta, StoryObj } from '@storybook/react';
import { Testimonial, ReviewBlock } from './Testimonial';

const meta: Meta<typeof Testimonial> = {
  title: 'Components/Testimonial',
  component: Testimonial,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A testimonial presents a quote and author line. **ReviewBlock** is an alias of **Testimonial**.',
      },
    },
  },
  argTypes: {
    quote: { control: 'text', description: 'Main quote text.' },
    author: { control: 'text', description: 'Author name.' },
    role: { control: 'text', description: 'Author role or title.' },
    rating: { control: { type: 'number', min: 0, max: 5, step: 0.5 }, description: 'Optional star rating (0–5).' },
  },
};

export default meta;
type Story = StoryObj<typeof Testimonial>;

const quote =
  'The design system shipped our product UI in half the time. Components feel cohesive and accessible out of the box.';

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    quote,
    author: 'Alex Rivera',
    role: 'Product Designer · Acme',
    rating: 5,
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 520 }}>
      <Testimonial quote={quote} author="Alex Rivera" role="Product Designer · Acme" rating={5} />
      <Testimonial
        quote="Great API surface and Storybook coverage."
        author="Jamie Chen"
        role="Engineering Lead"
      />
      <ReviewBlock
        quote="We adopted tokens in a week."
        author="Sam Okonkwo"
        role="Design Ops"
        rating={4}
        logo={<span style={{ fontSize: 12, fontWeight: 800, color: 'var(--color-brand-primary)' }}>ACME</span>}
      />
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Control width with the parent container; the card grows with quote length.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ maxWidth: 320 }}>
        <Testimonial quote="Short." author="A. Nonymous" rating={5} />
      </div>
      <div style={{ maxWidth: 480 }}>
        <Testimonial quote={quote} author="Alex Rivera" role="Designer" rating={5} />
      </div>
      <div style={{ maxWidth: 640 }}>
        <Testimonial quote={quote} author="Alex Rivera" role="Designer" rating={5} />
      </div>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 520 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>With rating</p>
        <Testimonial quote={quote} author="Alex Rivera" role="Designer" rating={5} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Without rating</p>
        <Testimonial quote={quote} author="Alex Rivera" role="Designer" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Partial rating</p>
        <Testimonial quote="Solid foundation." author="R. Lee" role="PM" rating={3.5} />
      </div>
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div data-theme="dark" style={{ background: 'var(--color-bg-canvas)', padding: 24, borderRadius: 12, maxWidth: 520 }}>
      <Testimonial quote={quote} author="Alex Rivera" role="Product Designer" rating={5} />
    </div>
  ),
};
