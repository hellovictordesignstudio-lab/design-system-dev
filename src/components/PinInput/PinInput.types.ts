export type PinInputSize = 'sm' | 'md' | 'lg';
export type PinInputType = 'alphanumeric' | 'number';

export interface PinInputProps {
  label?: string;
  helperText?: string;
  errorText?: string;
  length?: number;
  size?: PinInputSize;
  type?: PinInputType;
  mask?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  hasError?: boolean;
  autoFocus?: boolean;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  id?: string;
}
