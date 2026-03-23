export type ColorFormat = 'hex' | 'rgb' | 'hsl';
export type ColorPickerSize = 'sm' | 'md';

export interface ColorPickerProps {
  /** Current color value as hex string (e.g. "#0055FF") */
  value: string;
  /** Called with the new hex string on every change */
  onChange: (hex: string) => void;
  /** Display format in the input field (default: 'hex') */
  format?: ColorFormat;
  /** Preset swatch colors */
  presets?: string[];
  isDisabled?: boolean;
  /** Show the hex/rgb/hsl input field (default: true) */
  showInput?: boolean;
  size?: ColorPickerSize;
}

export interface HsvColor {
  h: number; // 0–360
  s: number; // 0–100
  v: number; // 0–100
}
