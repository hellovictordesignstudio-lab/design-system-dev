import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { User, CreditCard, CheckSquare } from 'lucide-react';
import { Stepper } from './Stepper';
import { Button } from '../Button';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { darkTheme } from '../../theme/theme';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A progress indicator for multi-step flows. Supports horizontal and vertical orientations, completed / active / upcoming / error states, and optional step descriptions.',
      },
    },
  },
  argTypes: {
    activeStep: { control: { type: 'number', min: 0, max: 3 } },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [step, setStep] = useState(1);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '600px' }}>
        <Stepper activeStep={step}>
          <Stepper.Step label="Account" description="Set up credentials" />
          <Stepper.Step label="Profile" description="Personal information" />
          <Stepper.Step label="Payment" description="Billing details" isOptional />
          <Stepper.Step label="Confirm" description="Review & submit" />
        </Stepper>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="ghost" size="sm" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>Back</Button>
          <Button size="sm" onClick={() => setStep((s) => Math.min(4, s + 1))} disabled={step === 4}>Next</Button>
        </div>
      </div>
    );
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 600 }}>
      <div>
        <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: '#6b7694' }}>Horizontal</p>
        <Stepper activeStep={1}>
          <Stepper.Step label="One" />
          <Stepper.Step label="Two" />
          <Stepper.Step label="Three" />
        </Stepper>
      </div>
      <div>
        <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: '#6b7694' }}>Vertical</p>
        <Stepper activeStep={1} orientation="vertical">
          <Stepper.Step label="One" description="First" />
          <Stepper.Step label="Two" description="Second" />
        </Stepper>
      </div>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Stepper stretches to the container; constrain max-width for checkout vs wide wizards.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ maxWidth: 400 }}>
        <Stepper activeStep={2}>
          <Stepper.Step label="A" />
          <Stepper.Step label="B" />
          <Stepper.Step label="C" />
        </Stepper>
      </div>
      <div style={{ maxWidth: 720 }}>
        <Stepper activeStep={2}>
          <Stepper.Step label="A" />
          <Stepper.Step label="B" />
          <Stepper.Step label="C" />
        </Stepper>
      </div>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <Stepper activeStep={1}>
        <Stepper.Step label="Done" />
        <Stepper.Step label="Active" />
        <Stepper.Step label="Todo" />
      </Stepper>
    </div>
  ),
};

// ── Horizontal ────────────────────────────────────────────────────────────────

export const Horizontal: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {[0, 1, 2, 3].map((active) => (
        <div key={active}>
          <p style={{ margin: '0 0 12px', fontSize: '12px', fontWeight: 600, color: '#9BA5BE' }}>
            activeStep={active}
          </p>
          <Stepper activeStep={active}>
            <Stepper.Step label="Account" />
            <Stepper.Step label="Profile" />
            <Stepper.Step label="Payment" isOptional />
            <Stepper.Step label="Confirm" />
          </Stepper>
        </div>
      ))}
    </div>
  ),
};

// ── Vertical ──────────────────────────────────────────────────────────────────

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {[0, 2].map((active) => (
        <div key={active}>
          <p style={{ margin: '0 0 12px', fontSize: '12px', fontWeight: 600, color: '#9BA5BE' }}>
            activeStep={active}
          </p>
          <Stepper activeStep={active} orientation="vertical">
            <Stepper.Step label="Account" description="Set up your credentials" />
            <Stepper.Step label="Profile" description="Your personal information" />
            <Stepper.Step label="Payment" description="Billing details" isOptional />
            <Stepper.Step label="Confirm" description="Review and submit" />
          </Stepper>
        </div>
      ))}
    </div>
  ),
};

// ── WithDescriptions ──────────────────────────────────────────────────────────

export const WithDescriptions: Story = {
  render: () => (
    <div style={{ maxWidth: '640px' }}>
      <Stepper activeStep={1}>
        <Stepper.Step
          label="Account setup"
          description="Create your username and password"
          icon={<User size={16} />}
        />
        <Stepper.Step
          label="Personal info"
          description="Tell us about yourself"
          icon={<User size={16} />}
        />
        <Stepper.Step
          label="Billing"
          description="Add a payment method"
          icon={<CreditCard size={16} />}
          isOptional
        />
        <Stepper.Step
          label="Done"
          description="Your account is ready"
          icon={<CheckSquare size={16} />}
        />
      </Stepper>
    </div>
  ),
};

// ── WithError ─────────────────────────────────────────────────────────────────

export const WithError: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '640px' }}>
      <div>
        <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#6B7694' }}>Horizontal with error on step 2</p>
        <Stepper activeStep={2}>
          <Stepper.Step label="Account" />
          <Stepper.Step label="Profile" />
          <Stepper.Step label="Payment" state="error" />
          <Stepper.Step label="Confirm" />
        </Stepper>
      </div>
      <div>
        <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#6B7694' }}>Vertical with error</p>
        <Stepper activeStep={2} orientation="vertical">
          <Stepper.Step label="Account" description="Done" />
          <Stepper.Step label="Profile" description="Done" />
          <Stepper.Step label="Payment" description="Validation failed" state="error" />
          <Stepper.Step label="Confirm" description="Pending" />
        </Stepper>
      </div>
    </div>
  ),
};

// ── DarkMode ──────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider defaultColorMode="dark">
      <div
        style={{
          padding: '32px',
          backgroundColor: darkTheme.colors['color-bg-canvas'],
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          maxWidth: '640px',
        }}
      >
        <Stepper activeStep={2}>
          <Stepper.Step label="Account" description="Completed" />
          <Stepper.Step label="Profile" description="Completed" />
          <Stepper.Step label="Payment" description="In progress" />
          <Stepper.Step label="Confirm" description="Pending" />
        </Stepper>
        <Stepper activeStep={1} orientation="vertical">
          <Stepper.Step label="Account" description="Completed" />
          <Stepper.Step label="Profile" description="In progress" />
          <Stepper.Step label="Payment" description="Pending" isOptional />
        </Stepper>
      </div>
    </ThemeProvider>
  ),
};
