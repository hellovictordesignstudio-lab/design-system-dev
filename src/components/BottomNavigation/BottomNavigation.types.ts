import type React from 'react';

export interface BottomNavigationItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  isDisabled?: boolean;
}

export interface BottomNavigationProps {
  items: BottomNavigationItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  'aria-label'?: string;
  className?: string;
}
