/**
 * useColorMode hook
 * Manages color mode state with localStorage persistence.
 * Resolves 'system' to 'light' or 'dark' based on prefers-color-scheme.
 */

import { useState, useEffect, useCallback } from 'react';
import type { ColorMode } from './theme';

const STORAGE_KEY = 'ds-color-mode';

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveMode(mode: ColorMode): 'light' | 'dark' {
  return mode === 'system' ? getSystemTheme() : mode;
}

function readStoredMode(): ColorMode {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch {
    // ignore
  }
  return 'system';
}

export function useColorMode() {
  const [colorMode, setColorModeState] = useState<ColorMode>(readStoredMode);
  const [resolvedMode, setResolvedMode] = useState<'light' | 'dark'>(() =>
    resolveMode(readStoredMode())
  );

  // Keep resolvedMode in sync when colorMode or system preference changes
  useEffect(() => {
    const update = () => {
      const resolved = resolveMode(colorMode);
      setResolvedMode(resolved);
      // Apply data-theme to <html> for CSS variable switching
      document.documentElement.setAttribute('data-theme', resolved);
    };

    update();

    if (colorMode === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    }
  }, [colorMode]);

  const setColorMode = useCallback((mode: ColorMode) => {
    setColorModeState(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // ignore
    }
  }, []);

  return { colorMode, resolvedMode, setColorMode };
}
