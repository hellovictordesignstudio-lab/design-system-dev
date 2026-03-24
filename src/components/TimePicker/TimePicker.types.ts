export type TimePickerSize = 'sm' | 'md' | 'lg';

export interface TimePickerProps {
  /** Minutes since midnight (0–1439). */
  value?: number;
  onChange: (minutesSinceMidnight: number) => void;
  label?: string;
  helperText?: string;
  errorText?: string;
  hasError?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  size?: TimePickerSize;
  id?: string;
  /** Use 12-hour clock with AM/PM */
  use12Hour?: boolean;
  minuteStep?: 1 | 5 | 10 | 15 | 30;
}
