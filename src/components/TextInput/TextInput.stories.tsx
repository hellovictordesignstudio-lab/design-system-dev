import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Search, Mail, Lock, Eye, Globe, AtSign } from 'lucide-react';
import { TextInput } from './TextInput';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { darkTheme } from '../../theme/theme';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A flexible text input with support for labels, icons, prefix/suffix addons, validation states, and multiple sizes.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Height and font-size of the input',
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    errorText: { control: 'text' },
    prefix: { control: 'text' },
    suffix: { control: 'text' },
    isDisabled: { control: 'boolean' },
    isReadOnly: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    hasError: { control: 'boolean' },
    hasSuccess: { control: 'boolean' },
    value: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    helperText: 'We will never share your email.',
    size: 'md',
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '360px' }}>
      <TextInput label="Default" placeholder="Default input" helperText="Helper text" />
      <TextInput
        label="With error"
        placeholder="Invalid input"
        hasError
        errorText="This field is required."
        value="bad@"
      />
      <TextInput
        label="With success"
        placeholder="Valid input"
        hasSuccess
        helperText="Looks great!"
        value="victor@example.com"
      />
      <TextInput
        label="Read only"
        isReadOnly
        value="read-only value"
        helperText="This field cannot be edited."
      />
      <TextInput
        label="Disabled"
        isDisabled
        placeholder="Cannot interact"
        helperText="This field is disabled."
      />
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '360px' }}>
      <TextInput size="sm" label="Small (32px)" placeholder="Small input" />
      <TextInput size="md" label="Medium (40px)" placeholder="Medium input" />
      <TextInput size="lg" label="Large (48px)" placeholder="Large input" />
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '360px' }}>
      <TextInput label="Default" placeholder="Focus me to see the ring" />
      <TextInput
        label="Required"
        placeholder="This field is required"
        isRequired
        helperText="Required fields are marked with an asterisk."
      />
      <TextInput
        label="Error state"
        hasError
        value="invalid input"
        errorText="Please enter a valid email address."
      />
      <TextInput
        label="Success state"
        hasSuccess
        value="victor@example.com"
        helperText="Email address is valid."
      />
      <TextInput label="Read only" isReadOnly value="Cannot be changed" />
      <TextInput label="Disabled" isDisabled placeholder="Not interactive" />
    </div>
  ),
};

// ── With Icons ────────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '360px' }}>
      <TextInput
        label="Search"
        placeholder="Search anything…"
        leftIcon={<Search size={16} />}
      />
      <TextInput
        label="Email"
        placeholder="you@example.com"
        leftIcon={<Mail size={16} />}
        rightIcon={<Eye size={16} />}
      />
      <TextInput
        label="Password"
        placeholder="Enter password"
        leftIcon={<Lock size={16} />}
        rightIcon={<Eye size={16} />}
      />
      <TextInput
        label="Username (error)"
        placeholder="Enter username"
        leftIcon={<AtSign size={16} />}
        hasError
        value="x"
        errorText="Username must be at least 3 characters."
      />
      <TextInput
        label="Website (success)"
        placeholder="https://example.com"
        leftIcon={<Globe size={16} />}
        hasSuccess
        value="https://example.com"
        helperText="URL looks valid."
      />
    </div>
  ),
};

// ── Prefix / Suffix ───────────────────────────────────────────────────────────

export const PrefixSuffix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '360px' }}>
      <TextInput label="Website" prefix="https://" placeholder="example.com" />
      <TextInput label="Price" suffix="USD" placeholder="0.00" />
      <TextInput label="Domain" prefix="www." suffix=".com" placeholder="yoursite" />
      <TextInput
        label="Username"
        prefix="@"
        placeholder="handle"
        helperText="Your public handle on our platform."
      />
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider defaultColorMode="dark">
      <div
        style={{
          padding: '32px',
          backgroundColor: darkTheme.colors['color-bg-canvas'],
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          maxWidth: '360px',
          borderRadius: '12px',
        }}
      >
        <TextInput label="Default" placeholder="Focus me to see the ring" helperText="Helper text below" />
        <TextInput
          label="With left icon"
          placeholder="Search…"
          leftIcon={<Search size={16} />}
        />
        <TextInput
          label="Error state"
          hasError
          value="bad input"
          errorText="Something went wrong."
        />
        <TextInput
          label="Success state"
          hasSuccess
          value="valid@example.com"
          helperText="All good!"
        />
        <TextInput label="With prefix" prefix="https://" placeholder="example.com" />
        <TextInput label="Disabled" isDisabled placeholder="Not interactive" />
      </div>
    </ThemeProvider>
  ),
};
