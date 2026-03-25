import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { LangProvider } from '../../theme/LangContext';
import { darkTheme } from '../../theme/theme';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A drag-and-drop upload area with per-file progress and success or error states. Supports single or multiple files, size limits, and accepted MIME types. Sizes: **sm** (compact list), **md** (default), **lg** (tall drop zone).',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Layout density of the drop zone.' },
    maxSize: { control: 'number', description: 'Maximum file size in bytes per file.' },
    maxFiles: { control: 'number', description: 'Maximum number of files in one batch.' },
    multiple: { control: 'boolean', description: 'Allows selecting more than one file.' },
    isDisabled: { control: 'boolean', description: 'Disables drag, drop, and file picking.' },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    size: 'md',
    maxFiles: 3,
    multiple: true,
    accept: 'image/*,.pdf',
    maxSize: 5 * 1024 * 1024,
  },
  render: (args) => (
    <div style={{ maxWidth: '480px' }}>
      <FileUpload {...args} onUpload={(files) => console.log('Uploaded:', files)} />
    </div>
  ),
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div style={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Single file</p>
        <FileUpload multiple={false} accept="image/*" maxSize={5 * 1024 * 1024} onUpload={() => {}} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Multiple files</p>
        <FileUpload multiple maxFiles={5} accept="image/*,.pdf" maxSize={10 * 1024 * 1024} onUpload={() => {}} />
      </div>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size}>
          <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {size}
          </p>
          <FileUpload
            size={size}
            multiple
            accept="image/*,.pdf"
            maxSize={10 * 1024 * 1024}
            onUpload={(files) => console.log(files)}
          />
        </div>
      ))}
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Default</p>
        <FileUpload onUpload={() => {}} accept="image/*" maxSize={2 * 1024 * 1024} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Disabled</p>
        <FileUpload onUpload={() => {}} isDisabled />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Custom hint</p>
        <FileUpload onUpload={() => {}} hint="SVG, PNG, JPG — max 2MB" accept=".svg,.png,.jpg" />
      </div>
    </div>
  ),
};

// ── Languages ─────────────────────────────────────────────────────────────────

export const Languages: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '480px' }}>
      {(['en', 'es', 'fr'] as const).map((lang) => (
        <LangProvider key={lang} defaultLang={lang}>
          <div>
            <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>
              {lang.toUpperCase()}
            </p>
            <FileUpload
              onUpload={() => {}}
              accept="image/*,.pdf"
              maxSize={5 * 1024 * 1024}
            />
          </div>
        </LangProvider>
      ))}
    </div>
  ),
};

// ── DarkMode ──────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider defaultColorMode="dark">
      <div style={{ padding: '32px', backgroundColor: darkTheme.colors['color-bg-canvas'], borderRadius: '12px', maxWidth: '480px' }}>
        <FileUpload
          multiple
          maxFiles={3}
          accept="image/*,.pdf"
          maxSize={10 * 1024 * 1024}
          onUpload={(files) => console.log('Uploaded:', files)}
        />
      </div>
    </ThemeProvider>
  ),
};
