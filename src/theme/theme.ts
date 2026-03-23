/**
 * Theme definitions
 * Exports lightTheme, darkTheme, and the Theme type.
 * Consumed by ThemeProvider and styled-components DefaultTheme.
 */

import {
  lightColorTokens,
  darkColorTokens,
  spacing,
  typography,
  borderRadius,
  shadows,
  transitions,
} from '../tokens/semantic';

const sharedTokens = {
  spacing,
  typography,
  borderRadius,
  shadows,
  transitions,
} as const;

const _lightTheme = {
  mode: 'light' as const,
  colors: lightColorTokens,
  ...sharedTokens,
};

const _darkTheme = {
  mode: 'dark' as const,
  colors: darkColorTokens,
  ...sharedTokens,
};

export type Theme = {
  mode: 'light' | 'dark';
  colors: typeof lightColorTokens | typeof darkColorTokens;
  spacing: typeof sharedTokens.spacing;
  typography: typeof sharedTokens.typography;
  borderRadius: typeof sharedTokens.borderRadius;
  shadows: typeof sharedTokens.shadows;
  transitions: typeof sharedTokens.transitions;
};

export const lightTheme: Theme = _lightTheme;
export const darkTheme: Theme = _darkTheme;

export type ColorMode = 'light' | 'dark' | 'system';

// Extend styled-components DefaultTheme
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}
