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
          'A token/tag input field. Users can type and press Enter, comma, or Tab to add tags. Backspace removes the last tag. Supports suggestions dropdown, max tags, and error states.',
      },
    },
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
