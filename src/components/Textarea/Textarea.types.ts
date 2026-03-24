import { TextareaHTMLAttributes, ReactNode } from 'react';

export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  size?: TextareaSize;
  resize?: TextareaResize;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  hasError?: boolean;
  hasSuccess?: boolean;
  showCount?: boolean;
  maxLength?: number;
  /** Auto-grow to fit content */
  autoResize?: boolean;
}
