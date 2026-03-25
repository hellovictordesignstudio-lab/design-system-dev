import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RichTextEditor } from './RichTextEditor';

const meta: Meta<typeof RichTextEditor> = {
  title: 'Components/RichTextEditor',
  component: RichTextEditor,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'WYSIWYG rich text editor built on TipTap (bold, italic, headings, lists, block quotes, links, undo). The value is HTML.',
      },
    },
  },
  argTypes: {
    value: { control: 'text', description: 'HTML string content.' },
    onChange: { control: false, description: 'Called when HTML changes.' },
    placeholder: { control: 'text', description: 'Placeholder in the empty editor.' },
    isDisabled: { control: 'boolean', description: 'Disables editing.' },
    minHeight: { control: 'number', description: 'Minimum height of the editable area in pixels.' },
    className: { control: 'text', description: 'Optional class on the root element.' },
    showLinkButton: { control: 'boolean', description: 'Shows link insert (uses `window.prompt` for URL).' },
  },
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

export const Playground: Story = {
  render: () => {
    const [html, setHtml] = useState('<p>Escribe algo <strong>enriquecido</strong>.</p>');
    return (
      <div style={{ maxWidth: 720 }}>
        <RichTextEditor value={html} onChange={setHtml} minHeight={220} />
        <pre
          style={{
            marginTop: 16,
            padding: 12,
            borderRadius: 10,
            background: 'var(--color-bg-subtle)',
            fontSize: 11,
            overflow: 'auto',
            maxHeight: 160,
          }}
        >
          {html}
        </pre>
      </div>
    );
  },
};

export const Vacio: Story = {
  name: 'Vacío',
  args: {
    value: '',
    placeholder: 'Empieza a escribir…',
    minHeight: 180,
  },
};
