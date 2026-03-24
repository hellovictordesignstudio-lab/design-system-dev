import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Info } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Tooltip shows contextual info on hover/focus. Renders in a portal to avoid overflow clipping. Supports all four placements and a configurable delay.',
      },
    },
  },
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    delay: { control: { type: 'number', min: 0, max: 1000 } },
    isDisabled: { control: 'boolean' },
    maxWidth: { control: { type: 'number', min: 80, max: 400 } },
    content: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => (
    <div style={{ padding: '80px', display: 'flex', justifyContent: 'center' }}>
      <Tooltip {...args}>
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
  args: {
    content: 'This is a helpful tooltip',
    placement: 'top',
    delay: 300,
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, padding: 60, flexWrap: 'wrap', justifyContent: 'center' }}>
      <Tooltip content="Short tip" delay={0}>
        <Button size="sm">Short</Button>
      </Tooltip>
      <Tooltip
        content="This tooltip has more text so you can see wrapping when maxWidth is set."
        delay={0}
        maxWidth={200}
      >
        <Button size="sm">Long content</Button>
      </Tooltip>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tooltip width is capped; adjust `maxWidth` for dense vs wide hints.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 16, padding: 60, flexWrap: 'wrap' }}>
      <Tooltip content="Narrow" maxWidth={120} delay={0}>
        <Button size="sm">maxWidth 120</Button>
      </Tooltip>
      <Tooltip content="Wider default panel for longer help text." maxWidth={320} delay={0}>
        <Button size="sm">maxWidth 320</Button>
      </Tooltip>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, padding: 60, flexWrap: 'wrap', alignItems: 'center' }}>
      <Tooltip content="Enabled" delay={0}>
        <Button size="sm">Hover</Button>
      </Tooltip>
      <Tooltip content="Should not show" isDisabled delay={0}>
        <Button size="sm" disabled>
          Disabled trigger
        </Button>
      </Tooltip>
    </div>
  ),
};

// ── Placements ────────────────────────────────────────────────────────────────

export const Placements: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)',
        gap: '12px',
        padding: '60px',
        justifyItems: 'center',
        alignItems: 'center',
        width: 'fit-content',
      }}
    >
      <span />
      <Tooltip content="Top tooltip" placement="top" delay={0}>
        <Button size="sm">Top</Button>
      </Tooltip>
      <span />
      <Tooltip content="Left tooltip" placement="left" delay={0}>
        <Button size="sm">Left</Button>
      </Tooltip>
      <span />
      <Tooltip content="Right tooltip" placement="right" delay={0}>
        <Button size="sm">Right</Button>
      </Tooltip>
      <span />
      <Tooltip content="Bottom tooltip" placement="bottom" delay={0}>
        <Button size="sm">Bottom</Button>
      </Tooltip>
      <span />
    </div>
  ),
};

// ── With Delay ────────────────────────────────────────────────────────────────

export const WithDelay: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', padding: '60px' }}>
      <Tooltip content="No delay" delay={0}>
        <Button variant="secondary" size="sm">0ms delay</Button>
      </Tooltip>
      <Tooltip content="Short delay (150ms)" delay={150}>
        <Button variant="secondary" size="sm">150ms delay</Button>
      </Tooltip>
      <Tooltip content="Default delay (300ms)" delay={300}>
        <Button variant="secondary" size="sm">300ms delay</Button>
      </Tooltip>
      <Tooltip content="Long delay (800ms)" delay={800}>
        <Button variant="secondary" size="sm">800ms delay</Button>
      </Tooltip>
    </div>
  ),
};

// ── With Rich Content ─────────────────────────────────────────────────────────

export const WithRichContent: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', padding: '80px', flexWrap: 'wrap' }}>
      <Tooltip
        placement="top"
        delay={0}
        maxWidth={260}
        content={
          <div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Pro tip</div>
            <div style={{ opacity: 0.85 }}>
              You can use Cmd+K to open the command palette anytime.
            </div>
          </div>
        }
      >
        <Button leftIcon={<Info size={16} />}>Rich tooltip</Button>
      </Tooltip>

      <Tooltip
        placement="bottom"
        delay={0}
        content="Keyboard shortcut: Ctrl+Shift+P"
      >
        <Button variant="ghost">Keyboard shortcut</Button>
      </Tooltip>

      <Tooltip
        placement="right"
        delay={0}
        isDisabled
        content="You'll never see this"
      >
        <Button variant="secondary">Disabled tooltip</Button>
      </Tooltip>
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div style={{ padding: '80px', display: 'flex', gap: '16px' }}>
      <Tooltip content="Top tooltip" placement="top" delay={0}>
        <Button>Hover top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" placement="bottom" delay={0}>
        <Button variant="secondary">Hover bottom</Button>
      </Tooltip>
    </div>
  ),
  parameters: { docs: { description: { story: 'Use the Dark Mode toolbar toggle to preview.' } } },
};
