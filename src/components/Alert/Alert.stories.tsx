import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An alert presents a short, important message. Choose **info**, **success**, **warning**, or **error** to match the situation.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'error', 'warning'],
      description: 'Tone and icon treatment.',
    },
    title: { control: 'text', description: 'Heading line.' },
    children: { control: 'text', description: 'Body content.' },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'This is an informational alert message.',
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '560px' }}>
      <Alert variant="info" title="Did you know?">
        You can customize tokens and themes to match your brand.
      </Alert>
      <Alert variant="success" title="Successfully saved">
        Your changes have been saved and will take effect immediately.
      </Alert>
      <Alert variant="warning" title="Deprecation notice">
        This API will be removed in v2.0. Please migrate to the new endpoint.
      </Alert>
      <Alert variant="error" title="Something went wrong">
        We couldn't process your request. Please try again later.
      </Alert>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Width follows the container. Use max-width or grid to control layout on large screens.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ maxWidth: 360 }}>
        <Alert variant="info" title="Narrow (360px)">
          Short content in a constrained column.
        </Alert>
      </div>
      <div style={{ maxWidth: 560 }}>
        <Alert variant="info" title="Medium (560px)">
          Default documentation width for readable line length.
        </Alert>
      </div>
      <div style={{ maxWidth: '100%' }}>
        <Alert variant="info" title="Full width">
          Stretches to fill the parent container.
        </Alert>
      </div>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 560 }}>
      <Alert variant="success" title="Dismissible" onClose={() => {}}>
        Includes a close button for transient messages.
      </Alert>
      <Alert variant="warning" title="No action">
        Static alert without dismiss or extra actions.
      </Alert>
      <Alert variant="error" title="Long content">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <p key={i} style={{ margin: i ? '8px 0 0' : 0 }}>
              This paragraph demonstrates multi-line body copy inside an alert. Use for validation or
              error details.
            </p>
          ))}
      </Alert>
    </div>
  ),
};

// ── Dismissible ───────────────────────────────────────────────────────────────

export const Dismissible: Story = {
  render: () => (
    <div style={{ maxWidth: '560px' }}>
      <Alert
        variant="success"
        title="Profile updated"
        onClose={() => alert('Closed!')}
      >
        Your profile information has been updated successfully.
      </Alert>
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div
      data-theme="dark"
      style={{ background: 'var(--color-bg-canvas)', padding: 24, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 560 }}
    >
      <Alert variant="info" title="Information">
        Neutral message on dark background.
      </Alert>
      <Alert variant="success" title="Saved">
        Changes saved successfully.
      </Alert>
      <Alert variant="warning" title="Warning">
        Please review before continuing.
      </Alert>
      <Alert variant="error" title="Error">
        Request failed. Try again.
      </Alert>
    </div>
  ),
};
