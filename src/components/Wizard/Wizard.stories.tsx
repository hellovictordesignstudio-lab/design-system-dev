import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Wizard, WizardStepper } from './index';

const meta: Meta<typeof Wizard> = {
  title: 'Components/Wizard',
  component: Wizard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Layout for multi-step flows. Combine **WizardStepper** (alias of **Stepper**) with **Wizard.Panel** for step content.',
      },
    },
  },
  argTypes: {
    activeStep: { control: 'number', description: 'Zero-based index of the visible step.' },
    children: { control: false, description: 'Stepper and **Wizard.Panel** children.' },
  },
};

export default meta;
type Story = StoryObj<typeof Wizard>;

function WizardDemo({ orientation }: { orientation: 'horizontal' | 'vertical' }) {
  const [step, setStep] = useState(0);
  return (
    <div style={{ maxWidth: orientation === 'vertical' ? 480 : 560 }}>
      <Wizard activeStep={step}>
        <WizardStepper activeStep={step} orientation={orientation}>
          <WizardStepper.Step label="Account" description="Create login" />
          <WizardStepper.Step label="Plan" />
          <WizardStepper.Step label="Review" />
        </WizardStepper>

        <Wizard.Panel stepIndex={0}>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--color-text-secondary)' }}>Step 1 — account fields go here.</p>
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <Button onClick={() => setStep(1)}>Next</Button>
          </div>
        </Wizard.Panel>

        <Wizard.Panel stepIndex={1}>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--color-text-secondary)' }}>Step 2 — choose a plan.</p>
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <Button variant="ghost" onClick={() => setStep(0)}>
              Back
            </Button>
            <Button onClick={() => setStep(2)}>Next</Button>
          </div>
        </Wizard.Panel>

        <Wizard.Panel stepIndex={2}>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--color-text-secondary)' }}>Step 3 — confirm and submit.</p>
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <Button variant="ghost" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button>Submit</Button>
          </div>
        </Wizard.Panel>
      </Wizard>
    </div>
  );
}

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => <WizardDemo orientation="horizontal" />,
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Horizontal stepper</p>
        <WizardDemo orientation="horizontal" />
      </div>
      <div>
        <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Vertical stepper</p>
        <WizardDemo orientation="vertical" />
      </div>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Wizard content width is controlled by the parent; try narrow modals vs full-page layouts.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ maxWidth: 360, border: '1px solid var(--color-border-default)', borderRadius: 12, padding: 16 }}>
        <WizardDemo orientation="horizontal" />
      </div>
      <div style={{ maxWidth: 640, border: '1px solid var(--color-border-default)', borderRadius: 12, padding: 16 }}>
        <WizardDemo orientation="horizontal" />
      </div>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--color-text-tertiary)' }}>
        Active step is driven by <code>activeStep</code> and <code>Wizard.Panel</code> index. Use Next/Back buttons
        or your own routing.
      </p>
      <WizardDemo orientation="horizontal" />
    </div>
  ),
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div data-theme="dark" style={{ background: 'var(--color-bg-canvas)', padding: 24, borderRadius: 12 }}>
      <WizardDemo orientation="horizontal" />
    </div>
  ),
};
