export interface RichTextEditorProps {
  /** HTML content */
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  isDisabled?: boolean;
  /** Minimum height of the editable area (px) */
  minHeight?: number;
  className?: string;
  /** Show link button (uses window.prompt for URL) */
  showLinkButton?: boolean;
}
