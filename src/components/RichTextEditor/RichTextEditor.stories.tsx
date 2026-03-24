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
          'Editor WYSIWYG basado en **TipTap** (negrita, cursiva, títulos, listas, citas, enlaces, deshacer). El valor es HTML.',
      },
    },
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
            background: '#f8f9fc',
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
