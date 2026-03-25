import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useToast } from './useToast';
import { Toast } from './Toast';
import { Button } from '../Button';
import { ThemeProvider } from '../../theme/ThemeProvider';
import type { ToastPosition } from './Toast.types';
import type { ToastItem } from './Toast.types';

// Stories are authored against ToastProvider (added in preview.tsx decorator).
// The component registered here is a placeholder so Storybook shows docs.
const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Portal-based notifications. Wrap the app with `<ToastProvider>`, then call `useToast()` to enqueue messages. Supports four variants, four positions, auto-dismiss with hover pause, and a progress bar.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ── Playground ────────────────────────────────────────────────────────────────

function PlaygroundDemo() {
  const toast = useToast();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '480px' }}>
      <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
        Click the buttons below to fire toasts. Hover a toast to pause its timer.
        The progress bar at the bottom shows remaining time.
      </p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button onClick={() => toast.success('Changes saved successfully!')}>
          Success
        </Button>
        <Button variant="danger" onClick={() => toast.error('Failed to save changes.')}>
          Error
        </Button>
        <Button variant="secondary" onClick={() => toast.warning('Your session expires soon.')}>
          Warning
        </Button>
        <Button variant="ghost" onClick={() => toast.info('A new version is available.')}>
          Info
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            toast.success('File uploaded.', { duration: 0, title: 'Upload complete' })
          }
        >
          Persistent (duration=0)
        </Button>
        <Button variant="ghost" size="sm" onClick={() => toast.dismissAll()}>
          Dismiss all
        </Button>
      </div>
    </div>
  );
}

export const Playground: Story = {
  render: () => <PlaygroundDemo />,
};

// ── All Variants ──────────────────────────────────────────────────────────────

function AllVariantsDemo() {
  const toast = useToast();
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button
        leftIcon={<CheckCircle size={16} />}
        onClick={() => toast.success('Operation completed successfully.')}
      >
        Success
      </Button>
      <Button
        variant="danger"
        leftIcon={<AlertCircle size={16} />}
        onClick={() => toast.error('An unexpected error occurred.')}
      >
        Error
      </Button>
      <Button
        variant="secondary"
        leftIcon={<AlertTriangle size={16} />}
        onClick={() => toast.warning('This action may have side effects.')}
      >
        Warning
      </Button>
      <Button
        variant="ghost"
        leftIcon={<Info size={16} />}
        onClick={() => toast.info('Your profile was last updated 3 days ago.')}
      >
        Info
      </Button>
    </div>
  );
}

export const Variants: Story = {
  render: () => <AllVariantsDemo />,
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Toast width is capped; long messages wrap. Fire from a narrow vs wide page layout.',
      },
    },
  },
  render: () => <PlaygroundDemo />,
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
      <p style={{ margin: 0, fontSize: 13, color: 'var(--color-text-tertiary)' }}>
        Use the buttons — includes persistent toast (duration 0) and dismiss-all.
      </p>
      <PlaygroundDemo />
    </div>
  ),
};

// ── Positions ─────────────────────────────────────────────────────────────────

const POSITIONS: { pos: ToastPosition; label: string }[] = [
  { pos: 'top-right',     label: 'Top right (default)' },
  { pos: 'top-center',    label: 'Top center' },
  { pos: 'bottom-right',  label: 'Bottom right' },
  { pos: 'bottom-center', label: 'Bottom center' },
];

function PositionsDemo() {
  const toast = useToast();
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {POSITIONS.map(({ pos, label }) => (
        <Button
          key={pos}
          variant="secondary"
          size="sm"
          onClick={() =>
            toast.info(`Appearing at ${pos}`, { position: pos, duration: 3000 })
          }
        >
          {label}
        </Button>
      ))}
    </div>
  );
}

export const Positions: Story = {
  render: () => <PositionsDemo />,
};

// ── With Title ────────────────────────────────────────────────────────────────

function WithTitleDemo() {
  const toast = useToast();
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button
        onClick={() =>
          toast.success('Your changes have been saved to the cloud.', {
            title: 'Saved successfully',
          })
        }
      >
        Success with title
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          toast.error('The server returned a 500 Internal Server Error.', {
            title: 'Request failed',
            duration: 0,
          })
        }
      >
        Persistent error
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.warning('You are approaching your storage limit (90% used).', {
            title: 'Storage warning',
          })
        }
      >
        Warning with title
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          toast.info('Version 2.4.0 is now available. Refresh to update.', {
            title: 'Update available',
          })
        }
      >
        Info with title
      </Button>
    </div>
  );
}

export const WithTitle: Story = {
  render: () => <WithTitleDemo />,
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────
// Renders Toast cards statically inside a dark ThemeProvider so dark-mode
// colors are visible without needing the portal system.

const mockToasts: ToastItem[] = [
  {
    id: 'dark-1', variant: 'success', message: 'Changes saved successfully.',
    title: 'Saved', duration: 4000, position: 'top-right', isExiting: false,
  },
  {
    id: 'dark-2', variant: 'error', message: 'Failed to connect to the server.',
    title: 'Connection error', duration: 0, position: 'top-right', isExiting: false,
  },
  {
    id: 'dark-3', variant: 'warning', message: 'Session expires in 5 minutes.',
    duration: 4000, position: 'top-right', isExiting: false,
  },
  {
    id: 'dark-4', variant: 'info', message: 'Version 2.4.0 is now available.',
    duration: 4000, position: 'top-right', isExiting: false,
  },
];

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider defaultColorMode="dark">
      <div
        style={{
          padding: '24px',
          backgroundColor: 'var(--color-bg-canvas)',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          maxWidth: '400px',
        }}
      >
        <p style={{ margin: '0 0 8px', fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
          Static preview — dark-mode token values applied to all variants
        </p>
        {mockToasts.map((t) => (
          <Toast key={t.id} toast={t} onDismiss={() => undefined} />
        ))}
      </div>
    </ThemeProvider>
  ),
};
