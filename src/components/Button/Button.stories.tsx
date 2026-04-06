import type { Meta, StoryObj } from '@storybook/react';
import { Plus, Trash2, ArrowRight, Download } from 'lucide-react';
import { Button } from './Button';
import ButtonDocs from './Button.mdx';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      page: ButtonDocs,
      description: {
        component:
          'A button triggers an action or navigation. Supports variants, sizes, loading state, and leading or trailing icons.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual style (variant).',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Height and horizontal padding.',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows a spinner and disables the control.',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Fills the width of the container.',
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

// ── Docs: Principles ──────────────────────────────────────────────────────────

export const DocPrinciples: Story = {
  parameters: { docs: { story: { inline: true } } },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        alignItems: 'center',
        padding: 8,
      }}
    >
      <Button variant="primary">Primary action</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Tertiary</Button>
    </div>
  ),
};

// ── Docs: Anatomy ─────────────────────────────────────────────────────────────

export const DocAnatomy: Story = {
  render: () => (
    <div style={{ padding: 8 }}>
      <div
        style={{
          position: 'relative',
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--color-text-tertiary)',
          }}
        >
          Anatomy
        </div>
        <div
          style={{
            position: 'relative',
            padding: '20px 28px',
            borderRadius: 20,
            border: '1px dashed var(--color-border-strong)',
            background: 'var(--color-bg-subtle)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 10,
              fontWeight: 700,
              color: 'var(--color-text-tertiary)',
              whiteSpace: 'nowrap',
            }}
          >
            Leading icon (optional)
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 10,
              fontWeight: 700,
              color: 'var(--color-text-tertiary)',
              whiteSpace: 'nowrap',
            }}
          >
            Label
          </div>
          <Button leftIcon={<Plus size={16} />} rightIcon={<ArrowRight size={16} />} size="md">
            Continue
          </Button>
        </div>
        <p
          style={{
            margin: 0,
            maxWidth: 360,
            fontSize: 13,
            lineHeight: 1.55,
            color: 'var(--color-text-secondary)',
            textAlign: 'center',
          }}
        >
          Optional <code style={{ fontSize: 12 }}>leftIcon</code> /{' '}
          <code style={{ fontSize: 12 }}>rightIcon</code>; loading swaps content for a centered spinner.
        </p>
      </div>
    </div>
  ),
};

// ── Docs: Shape ───────────────────────────────────────────────────────────────

export const DocShape: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 8 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button size="sm" variant="secondary">
          Small pill
        </Button>
        <Button size="md" variant="secondary">
          Medium pill
        </Button>
        <Button size="lg" variant="secondary">
          Large pill
        </Button>
      </div>
      <p style={{ margin: 0, fontSize: 13, color: 'var(--color-text-secondary)', maxWidth: 420 }}>
        Corner radius is fully rounded so the control stays pill-shaped at every size; height and padding differ by{' '}
        <code style={{ fontSize: 12 }}>size</code>.
      </p>
    </div>
  ),
};

// ── Docs: Usage ───────────────────────────────────────────────────────────────

export const DocUsage: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 8 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="primary">Save changes</Button>
        <Button variant="ghost">Cancel</Button>
      </div>
      <p style={{ margin: 0, fontSize: 13, color: 'var(--color-text-secondary)', maxWidth: 440 }}>
        Use buttons for actions. For navigation to a new URL, prefer a link styled as needed so semantics and keyboard behavior stay correct.
      </p>
    </div>
  ),
};

// ── Docs: Hierarchy ───────────────────────────────────────────────────────────

export const DocHierarchy: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 8 }}>
      {(
        [
          ['primary', 'Primary — main outcome', 'Create workspace'],
          ['secondary', 'Secondary — alternate', 'Choose template'],
          ['ghost', 'Ghost — low emphasis', 'Learn more'],
        ] as const
      ).map(([variant, label, text]) => (
        <div key={variant} style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span
            style={{
              minWidth: 200,
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--color-text-tertiary)',
            }}
          >
            {label}
          </span>
          <Button variant={variant}>{text}</Button>
        </div>
      ))}
    </div>
  ),
};

// ── Docs: Do & don’t ──────────────────────────────────────────────────────────

export const DocDoDont: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        maxWidth: 720,
        padding: 8,
      }}
    >
      <div
        style={{
          borderRadius: 16,
          border: '1px solid color-mix(in srgb, var(--color-success-default) 35%, var(--color-border-default))',
          background: 'var(--color-bg-default)',
          padding: 16,
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', color: 'var(--color-success-text)', marginBottom: 12 }}>
          Do
        </div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          <li>Use a verb + object (“Add collaborator”).</li>
          <li>One primary button per card or modal footer.</li>
          <li>Use danger only for destructive commits.</li>
        </ul>
        <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button size="sm">Add collaborator</Button>
          <Button size="sm" variant="secondary">
            Cancel
          </Button>
        </div>
      </div>
      <div
        style={{
          borderRadius: 16,
          border: '1px solid color-mix(in srgb, var(--color-error-default) 40%, var(--color-border-default))',
          background: 'var(--color-bg-default)',
          padding: 16,
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', color: 'var(--color-error-text)', marginBottom: 12 }}>
          Don’t
        </div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          <li>Vague labels (“OK”, “Submit here”).</li>
          <li>Multiple primaries competing in one footer.</li>
          <li>Danger styling for non-destructive actions.</li>
        </ul>
        <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button size="sm" variant="primary">
            OK
          </Button>
          <Button size="sm" variant="danger">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  ),
};

// ── Docs: Destructive ─────────────────────────────────────────────────────────

export const DocDestructive: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 8 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="danger" leftIcon={<Trash2 size={16} />}>
          Delete report
        </Button>
        <Button variant="secondary">Keep</Button>
      </div>
    </div>
  ),
};

// ── Docs: Best practices ──────────────────────────────────────────────────────

export const DocBestPractices: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 8 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button>Save draft</Button>
        <Button variant="secondary" isLoading>
          Saving…
        </Button>
        <Button variant="ghost" disabled>
          Requires title
        </Button>
      </div>
    </div>
  ),
};

// ── Docs: Behavior ────────────────────────────────────────────────────────────

export const DocBehavior: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', padding: 8 }}>
      <Button>Default</Button>
      <Button isLoading>
        Loading
      </Button>
      <Button disabled>
        Disabled
      </Button>
    </div>
  ),
};

// ── Docs: Touch targets ───────────────────────────────────────────────────────

export const DocTouchTargets: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 8 }}>
      {(
        [
          ['sm', '32px', 'sm'] as const,
          ['md', '40px', 'md'] as const,
          ['lg', '48px', 'lg'] as const,
        ]
      ).map(([label, px, size]) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-tertiary)', width: 120 }}>
            {label} · {px}
          </span>
          <div style={{ position: 'relative', display: 'inline-flex' }}>
            <span
              style={{
                position: 'absolute',
                left: -6,
                right: -6,
                top: -6,
                bottom: -6,
                borderRadius: 9999,
                border: '1px dashed var(--color-border-strong)',
                pointerEvents: 'none',
              }}
              aria-hidden
            />
            <Button size={size}>Tap target</Button>
          </div>
        </div>
      ))}
      <p style={{ margin: 0, fontSize: 12, color: 'var(--color-text-tertiary)', maxWidth: 480 }}>
        Dashed ring is for documentation only (optional extra hit area). Prefer md/lg for touch-first layouts.
      </p>
    </div>
  ),
};

// ── Docs: Width ───────────────────────────────────────────────────────────────

export const DocWidth: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', padding: 8 }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--color-text-tertiary)', marginBottom: 8 }}>Intrinsic</div>
        <Button variant="primary">Short</Button>
      </div>
      <div style={{ width: 280 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--color-text-tertiary)', marginBottom: 8 }}>fullWidth</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Button fullWidth variant="primary">
            Primary in column
          </Button>
          <Button fullWidth variant="secondary">
            Secondary
          </Button>
        </div>
      </div>
    </div>
  ),
};

// ── Docs: Breakpoints ─────────────────────────────────────────────────────────

export const DocBreakpoints: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 8 }}>
      <div
        style={{
          maxWidth: 280,
          padding: 16,
          borderRadius: 16,
          border: '1px solid var(--color-border-default)',
          background: 'var(--color-bg-default)',
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--color-text-tertiary)', marginBottom: 10 }}>Narrow container</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Button fullWidth>
            Continue
          </Button>
          <Button fullWidth variant="ghost">
            Back
          </Button>
        </div>
      </div>
      <div
        style={{
          maxWidth: 480,
          padding: 16,
          borderRadius: 16,
          border: '1px solid var(--color-border-default)',
          background: 'var(--color-bg-default)',
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--color-text-tertiary)', marginBottom: 10 }}>Wide container</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <Button variant="ghost">Back</Button>
          <Button>Continue</Button>
        </div>
      </div>
    </div>
  ),
};

// ── Docs: Wide ────────────────────────────────────────────────────────────────

export const DocWide: Story = {
  render: () => (
    <div
      style={{
        maxWidth: 400,
        margin: '0 auto',
        padding: 24,
        borderRadius: 20,
        border: '1px solid var(--color-border-default)',
        background: 'var(--color-bg-default)',
        boxShadow: '0 12px 40px rgba(12, 13, 16, 0.06)',
      }}
    >
      <p style={{ margin: '0 0 16px', fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
        Full-width actions align to card edges in narrow layouts.
      </p>
      <Button fullWidth variant="primary" leftIcon={<Plus size={18} />}>
        Create project
      </Button>
      <div style={{ height: 8 }} />
      <Button fullWidth variant="secondary">
        Import from file
      </Button>
    </div>
  ),
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button>Default</Button>
      <Button isLoading>Loading</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};

// ── With Icons ────────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button leftIcon={<Plus size={16} />}>Add item</Button>
      <Button variant="secondary" rightIcon={<ArrowRight size={16} />}>
        Continue
      </Button>
      <Button variant="ghost" leftIcon={<Download size={16} />}>
        Download
      </Button>
      <Button variant="danger" leftIcon={<Trash2 size={16} />}>
        Delete
      </Button>
    </div>
  ),
};

// ── Full Width ────────────────────────────────────────────────────────────────

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Button fullWidth>Full width primary</Button>
      <Button fullWidth variant="secondary">
        Full width secondary
      </Button>
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div
      data-theme="dark"
      style={{
        background: 'var(--color-bg-canvas)',
        padding: 24,
        borderRadius: 12,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        alignItems: 'center',
      }}
    >
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button isLoading>Loading</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};
