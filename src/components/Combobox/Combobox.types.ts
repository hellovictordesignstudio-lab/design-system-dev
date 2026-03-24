import type { ReactNode } from 'react';

export type ComboboxSize = 'sm' | 'md' | 'lg';

export interface ComboboxOption {
  value: string;
  label: string;
  icon?: ReactNode;
  isDisabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  inputValue?: string;
  onChange?: (value: string) => void;
  onInputChange?: (text: string) => void;
  /** When true, `onChange` may receive a value not present in `options`. */
  allowFreeText?: boolean;
  placeholder?: string;
  label?: string;
  helperText?: string;
  errorText?: string;
  hasError?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  size?: ComboboxSize;
  id?: string;
  /** Empty state when filter yields no results */
  emptyText?: string;
}
