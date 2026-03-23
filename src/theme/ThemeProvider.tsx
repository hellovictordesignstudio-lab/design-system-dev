/**
 * ThemeProvider
 * Wraps the app with styled-components ThemeProvider and color mode context.
 * Exposes useTheme hook for consuming components.
 */

import React, { createContext, useContext, useMemo } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { useColorMode } from './useColorMode';
import { GlobalStyles } from './GlobalStyles';
import type { ColorMode, Theme } from './theme';

interface ThemeContextValue {
  theme: Theme;
  colorMode: ColorMode;
  resolvedMode: 'light' | 'dark';
  setColorMode: (mode: ColorMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
  /** Override the initial color mode (useful for Storybook) */
  defaultColorMode?: ColorMode;
}

export function ThemeProvider({ children, defaultColorMode }: ThemeProviderProps) {
  const { colorMode, resolvedMode, setColorMode } = useColorMode();

  // Allow Storybook/tests to override via prop on first render
  const effectiveResolved = defaultColorMode
    ? defaultColorMode === 'system'
      ? resolvedMode
      : defaultColorMode
    : resolvedMode;

  const theme = effectiveResolved === 'dark' ? darkTheme : lightTheme;

  const contextValue = useMemo<ThemeContextValue>(
    () => ({ theme, colorMode: defaultColorMode ?? colorMode, resolvedMode: effectiveResolved as 'light' | 'dark', setColorMode }),
    [theme, colorMode, effectiveResolved, setColorMode, defaultColorMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <SCThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </SCThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
