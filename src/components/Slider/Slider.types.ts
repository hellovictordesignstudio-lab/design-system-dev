export type SliderSize = 'sm' | 'md' | 'lg';
export type SliderOrientation = 'horizontal' | 'vertical';

export interface SliderProps {
  label?: string;
  helperText?: string;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  size?: SliderSize;
  orientation?: SliderOrientation;
  isDisabled?: boolean;
  showValue?: boolean;
  showMinMax?: boolean;
  formatValue?: (value: number) => string;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  id?: string;
}
