import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TagInput } from './TagInput';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { darkTheme } from '../../theme/theme';

const meta: Meta<typeof TagInput> = {
  title: 'Components/TagInput',
  component: TagInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A field for entering tags. Add a tag with Enter, comma, or Tab; remove the last tag with Backspace. Supports suggestions, a maximum count, and error states.',
      },
    },
  },
  argTypes: {
    placeholder: { control: 'text', description: 'Placeholder in the input area.' },
    label: { control: 'text', description: 'Label above the field.' },
    helperText: { control: 'text', description: 'Hint below the field.' },
    hasError: { control: 'boolean', description: 'Applies error styling.' },
    errorText: { control: 'text', description: 'Error text; applies error styling.' },
    isDisabled: { control: 'boolean', description: 'Disables editing.' },
    maxTags: { control: 'number', description: 'Maximum number of tags.' },
    allowDuplicates: { control: 'boolean', description: 'Allows the same tag more than once.' },
    value: { control: 'object', description: 'Controlled list of tags.' },
    onChange: { control: false, description: 'Called when the tag list changes.' },
    suggestions: { control: 'object', description: 'Optional strings for the suggestion list.' },
  },
};

export default meta;
type Story = StoryObj<typeof TagInput>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [tags, setTags] = useState(['design', 'system']);
    return (
      <div style={{ maxWidth: '480px' }}>
        <TagInput
          label="Topics"
          value={tags}
          onChange={setTags}
          placeholder="Add a topic..."
          helperText="Press Enter, comma, or Tab to add a tag."
        />
      </div>
    );
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => {
    const [a, setA] = useState(['alpha']);
    const [b, setB] = useState<string[]>([]);
    const suggestions = ['React', 'Vue', 'Svelte'];
    return (
      <div style={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <TagInput label="Free tags" value={a} onChange={setA} placeholder="Type and press Enter…" />
        <TagInput
          label="With suggestions"
          value={b}
          onChange={setB}
          suggestions={suggestions}
          placeholder="Pick or type…"
        />
      </div>
    );
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Input width follows the container.',
      },
    },
  },
  render: () => {
    const [tags, setTags] = useState(['one', 'two']);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ maxWidth: 280 }}>
          <TagInput label="Narrow" value={tags} onChange={setTags} />
        </div>
        <div style={{ maxWidth: 520 }}>
          <TagInput label="Wide" value={tags} onChange={setTags} />
        </div>
      </div>
    );
  },
};

// ── WithSuggestions ───────────────────────────────────────────────────────────

export const WithSuggestions: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>([]);
    const allSuggestions = [
      'React', 'TypeScript', 'styled-components', 'Storybook',
      'Figma', 'Design Tokens', 'Accessibility', 'Dark Mode',
      'Animation', 'CSS Variables', 'Next.js', 'Vite',
    ];
    return (
      <div style={{ maxWidth: '480px' }}>
        <TagInput
          label="Technologies"
          value={tags}
          onChange={setTags}
          placeholder="Search technologies..."
          suggestions={allSuggestions}
          helperText="Type to filter suggestions."
        />
      </div>
    );
  },
};

// ── MaxTags ───────────────────────────────────────────────────────────────────

export const MaxTags: Story = {
  render: () => {
    const [tags, setTags] = useState(['React', 'TypeScript', 'CSS']);
    return (
      <div style={{ maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <TagInput
          label="Skills (max 5)"
          value={tags}
          onChange={setTags}
          placeholder="Add a skill..."
          maxTags={5}
          helperText={`${tags.length} / 5 tags added`}
        />
        <TagInput
          label="At limit (max 3)"
          value={['one', 'two', 'three']}
          onChange={() => {}}
          maxTags={3}
        />
      </div>
    );
  },
};

// ── States ────────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div style={{ maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <TagInput
        label="Default"
        value={['hello', 'world']}
        onChange={() => {}}
        placeholder="Add a tag..."
        helperText="Helper text goes here"
      />
      <TagInput
        label="Error state"
        value={['hello']}
        onChange={() => {}}
        hasError
        errorText="Duplicate tags are not allowed."
      />
      <TagInput
        label="Disabled"
        value={['react', 'vue', 'svelte']}
        onChange={() => {}}
        isDisabled
        helperText="This field is read-only."
      />
    </div>
  ),
};

// ── DarkMode ──────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => {
    const [tags, setTags] = useState(['design', 'system', 'react']);
    return (
      <ThemeProvider defaultColorMode="dark">
        <div
          style={{
            padding: '32px',
            backgroundColor: darkTheme.colors['color-bg-canvas'],
            borderRadius: '12px',
            maxWidth: '480px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <TagInput
            label="Tags"
            value={tags}
            onChange={setTags}
            placeholder="Add a tag..."
            suggestions={['typescript', 'vue', 'svelte', 'next.js', 'vite']}
            helperText="Press Enter to add a tag."
          />
          <TagInput
            label="Error"
            value={['invalid']}
            onChange={() => {}}
            hasError
            errorText="This tag is not allowed."
          />
        </div>
      </ThemeProvider>
    );
  },
};
