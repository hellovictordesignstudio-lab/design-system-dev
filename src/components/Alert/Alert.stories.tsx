import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Alerts communicate feedback or status messages to users.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'error', 'warning'] },
    title: { control: 'text' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Playground: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'This is an informational alert message.',
  },
};

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
