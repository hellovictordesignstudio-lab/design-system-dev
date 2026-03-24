import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';
import {
  Grid, List, LayoutGrid, AlignLeft, AlignCenter, AlignRight,
  Bold, Italic, Underline, ChevronLeft, ChevronRight,
  Plus, Minus, Copy, Trash2, Pencil,
} from 'lucide-react';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/Actions/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Groups related actions into a cohesive unit. Supports attached and detached modes, all variants, sizes, and both orientations.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'destructive'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
    isAttached: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    gap: { control: { type: 'range', min: 0, max: 24, step: 2 }, if: { arg: 'isAttached', eq: false } },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Playground: Story = {
  args: { variant: 'secondary', size: 'md', orientation: 'horizontal', isAttached: true, isDisabled: false, fullWidth: false },
  render: (args) => (
    <ButtonGroup {...args} aria-label="View options">
      <ButtonGroup.Item isActive><Grid size={16} />Grid</ButtonGroup.Item>
      <ButtonGroup.Item><List size={16} />List</ButtonGroup.Item>
      <ButtonGroup.Item><LayoutGrid size={16} />Compact</ButtonGroup.Item>
    </ButtonGroup>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {(['primary', 'secondary', 'ghost', 'destructive'] as const).map((variant) => (
        <div key={variant} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'capitalize', width: 100, color: 'var(--color-text-secondary)', fontFamily: 'Nunito Sans, sans-serif' }}>
            {variant}
          </span>
          <ButtonGroup variant={variant} aria-label={`${variant} group`}>
            <ButtonGroup.Item isActive>First</ButtonGroup.Item>
            <ButtonGroup.Item>Second</ButtonGroup.Item>
            <ButtonGroup.Item>Third</ButtonGroup.Item>
          </ButtonGroup>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', width: 28, color: 'var(--color-text-secondary)', fontFamily: 'Nunito Sans, sans-serif' }}>
            {size}
          </span>
          <ButtonGroup size={size} aria-label={`${size} group`}>
            <ButtonGroup.Item isActive>Active</ButtonGroup.Item>
            <ButtonGroup.Item>Option</ButtonGroup.Item>
            <ButtonGroup.Item>Option</ButtonGroup.Item>
          </ButtonGroup>
        </div>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <ButtonGroup aria-label="Text alignment">
        <ButtonGroup.Item isActive aria-label="Align left"><AlignLeft /></ButtonGroup.Item>
        <ButtonGroup.Item aria-label="Align center"><AlignCenter /></ButtonGroup.Item>
        <ButtonGroup.Item aria-label="Align right"><AlignRight /></ButtonGroup.Item>
      </ButtonGroup>

      <ButtonGroup variant="ghost" aria-label="Text formatting">
        <ButtonGroup.Item isActive aria-label="Bold"><Bold /></ButtonGroup.Item>
        <ButtonGroup.Item aria-label="Italic"><Italic /></ButtonGroup.Item>
        <ButtonGroup.Item aria-label="Underline"><Underline /></ButtonGroup.Item>
      </ButtonGroup>

      <ButtonGroup variant="secondary" aria-label="Pagination">
        <ButtonGroup.Item leftIcon={<ChevronLeft />}>Prev</ButtonGroup.Item>
        <ButtonGroup.Item isActive>1</ButtonGroup.Item>
        <ButtonGroup.Item>2</ButtonGroup.Item>
        <ButtonGroup.Item>3</ButtonGroup.Item>
        <ButtonGroup.Item rightIcon={<ChevronRight />}>Next</ButtonGroup.Item>
      </ButtonGroup>
    </div>
  ),
};

export const Detached: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ButtonGroup isAttached={false} gap={8} aria-label="Edit actions">
        <ButtonGroup.Item leftIcon={<Pencil size={16} />}>Edit</ButtonGroup.Item>
        <ButtonGroup.Item leftIcon={<Copy size={16} />}>Duplicate</ButtonGroup.Item>
        <ButtonGroup.Item leftIcon={<Trash2 size={16} />}>Delete</ButtonGroup.Item>
      </ButtonGroup>

      <ButtonGroup isAttached={false} gap={6} variant="ghost" aria-label="Counter">
        <ButtonGroup.Item aria-label="Decrease"><Minus size={16} /></ButtonGroup.Item>
        <ButtonGroup.Item isActive>5</ButtonGroup.Item>
        <ButtonGroup.Item aria-label="Increase"><Plus size={16} /></ButtonGroup.Item>
      </ButtonGroup>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
      <ButtonGroup orientation="vertical" aria-label="Vertical secondary">
        <ButtonGroup.Item isActive>Overview</ButtonGroup.Item>
        <ButtonGroup.Item>Analytics</ButtonGroup.Item>
        <ButtonGroup.Item>Settings</ButtonGroup.Item>
      </ButtonGroup>

      <ButtonGroup orientation="vertical" variant="ghost" aria-label="Vertical ghost">
        <ButtonGroup.Item isActive>Overview</ButtonGroup.Item>
        <ButtonGroup.Item>Analytics</ButtonGroup.Item>
        <ButtonGroup.Item>Settings</ButtonGroup.Item>
      </ButtonGroup>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: 480 }}>
      <ButtonGroup fullWidth aria-label="Billing period">
        <ButtonGroup.Item isActive>Monthly</ButtonGroup.Item>
        <ButtonGroup.Item>Quarterly</ButtonGroup.Item>
        <ButtonGroup.Item>Annual</ButtonGroup.Item>
      </ButtonGroup>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ButtonGroup aria-label="Normal">
        <ButtonGroup.Item isActive>Active</ButtonGroup.Item>
        <ButtonGroup.Item>Default</ButtonGroup.Item>
        <ButtonGroup.Item>Default</ButtonGroup.Item>
      </ButtonGroup>

      <ButtonGroup isDisabled aria-label="All disabled">
        <ButtonGroup.Item isActive>Active</ButtonGroup.Item>
        <ButtonGroup.Item>Disabled</ButtonGroup.Item>
        <ButtonGroup.Item>Disabled</ButtonGroup.Item>
      </ButtonGroup>

      <ButtonGroup aria-label="Mixed disabled">
        <ButtonGroup.Item isActive>Active</ButtonGroup.Item>
        <ButtonGroup.Item>Normal</ButtonGroup.Item>
        <ButtonGroup.Item isDisabled>Disabled</ButtonGroup.Item>
      </ButtonGroup>
    </div>
  ),
};

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div data-theme="dark" style={{ background: 'var(--color-bg-primary, #0C0D10)', padding: 32, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['secondary', 'primary', 'ghost'] as const).map((variant) => (
        <ButtonGroup key={variant} variant={variant} aria-label={`dark ${variant}`}>
          <ButtonGroup.Item isActive>Active</ButtonGroup.Item>
          <ButtonGroup.Item>Option</ButtonGroup.Item>
          <ButtonGroup.Item>Option</ButtonGroup.Item>
        </ButtonGroup>
      ))}
    </div>
  ),
};
