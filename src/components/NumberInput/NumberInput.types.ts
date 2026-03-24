import { InputHTMLAttributes } from 'react';

export type NumberInputSize = 'sm' | 'md' | 'lg';

export interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  size?: NumberInputSize;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  prefix?: string;
  suffix?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  hasError?: boolean;
  /** Hide the +/- stepper buttons */
  noControls?: boolean;
  onChange?: (value: number | undefined) => void;
}
