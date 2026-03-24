import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
  Link2,
  Minus,
} from 'lucide-react';
import {
  EditorArea,
  EditorRoot,
  Toolbar,
  ToolbarBtn,
  ToolbarSep,
} from './RichTextEditor.styles';
import type { RichTextEditorProps } from './RichTextEditor.types';

export function RichTextEditor({
  value = '',
  onChange,
  placeholder = 'Escribe aquí…',
  isDisabled = false,
  minHeight = 200,
  className,
  showLinkButton = true,
}: RichTextEditorProps) {
  const editor = useEditor(
    {
      immediatelyRender: false,
      extensions: [
        StarterKit.configure({
          heading: { levels: [2, 3] },
          bulletList: { HTMLAttributes: { class: 'rte-list' } },
          orderedList: { HTMLAttributes: { class: 'rte-olist' } },
        }),
        Placeholder.configure({ placeholder }),
        Underline,
        Link.configure({
          openOnClick: false,
          HTMLAttributes: { class: 'rte-link' },
        }),
      ],
      content: value,
      editable: !isDisabled,
      onUpdate: ({ editor: ed }) => {
        onChange?.(ed.getHTML());
      },
    }
  );

  useEffect(() => {
    if (!editor || value === undefined) return;
    const cur = editor.getHTML();
    if (value !== cur) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  useEffect(() => {
    editor?.setEditable(!isDisabled);
  }, [isDisabled, editor]);

  function setLink() {
    if (!editor) return;
    const prev = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('URL del enlace', prev ?? 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }

  if (!editor) {
    return (
      <EditorRoot className={className} aria-busy="true">
        <div style={{ padding: 16, color: '#9ba5be', fontSize: 13 }}>Cargando editor…</div>
      </EditorRoot>
    );
  }

  return (
    <EditorRoot className={className}>
      <Toolbar role="toolbar" aria-label="Formato de texto">
        <ToolbarBtn
          type="button"
          $active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={isDisabled}
          aria-label="Negrita"
        >
          <Bold size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          type="button"
          $active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={isDisabled}
          aria-label="Cursiva"
        >
          <Italic size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          type="button"
          $active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={isDisabled}
          aria-label="Subrayado"
        >
          <UnderlineIcon size={16} />
        </ToolbarBtn>

        <ToolbarSep />

        <ToolbarBtn
          type="button"
          $active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          disabled={isDisabled}
          aria-label="Título 2"
        >
          <Heading2 size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          type="button"
          $active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          disabled={isDisabled}
          aria-label="Título 3"
        >
          <Heading3 size={16} />
        </ToolbarBtn>

        <ToolbarSep />

        <ToolbarBtn
          type="button"
          $active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={isDisabled}
          aria-label="Lista con viñetas"
        >
          <List size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          type="button"
          $active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={isDisabled}
          aria-label="Lista numerada"
        >
          <ListOrdered size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          type="button"
          $active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          disabled={isDisabled}
          aria-label="Cita"
        >
          <Quote size={16} />
        </ToolbarBtn>

        <ToolbarSep />

        <ToolbarBtn
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          disabled={isDisabled}
          aria-label="Línea horizontal"
        >
          <Minus size={16} />
        </ToolbarBtn>

        {showLinkButton && (
          <ToolbarBtn
            type="button"
            $active={editor.isActive('link')}
            onClick={setLink}
            disabled={isDisabled}
            aria-label="Enlace"
          >
            <Link2 size={16} />
          </ToolbarBtn>
        )}

        <ToolbarSep />

        <ToolbarBtn
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={isDisabled || !editor.can().undo()}
          aria-label="Deshacer"
        >
          <Undo2 size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={isDisabled || !editor.can().redo()}
          aria-label="Rehacer"
        >
          <Redo2 size={16} />
        </ToolbarBtn>
      </Toolbar>

      <EditorArea $minHeight={minHeight}>
        <EditorContent editor={editor} />
      </EditorArea>
    </EditorRoot>
  );
}
