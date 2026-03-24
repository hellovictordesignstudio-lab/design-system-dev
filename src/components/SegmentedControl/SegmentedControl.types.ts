import { ReactNode } from 'react';

export type SegmentedControlSize = 'sm' | 'md' | 'lg';

export interface SegmentOption {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
  isDisabled?: boolean;
}

export interface SegmentedControlProps {
  options: SegmentOption[];
  value?: string;
  defaultValue?: string;
  size?: SegmentedControlSize;
  fullWidth?: boolean;
  isDisabled?: boolean;
  onChange?: (value: string) => void;
  'aria-label'?: string;
}
