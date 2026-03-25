import React, { useEffect, useMemo, useState } from 'react';
import { DocsContainer, type DocsContainerProps } from '@storybook/blocks';
import { vdsDocsDark, vdsDocsLight } from './vds-docs-theme';

type DocsContextMaybeGlobals = {
  globals?: { colorMode?: string };
};

function readAppearanceFromHtml(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'light';
  const t = document.documentElement.getAttribute('data-theme');
  return t === 'dark' ? 'dark' : 'light';
}

function readSystemAppearance(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Toolbar globals are available on the docs context object (not via preview hooks).
 * ThemeProvider also mirrors the resolved appearance on `html[data-theme]`.
 */
function readAppearance(props: DocsContainerProps): 'light' | 'dark' {
  const cm = (props.context as DocsContextMaybeGlobals | undefined)?.globals?.colorMode;
  if (cm === 'dark' || cm === 'light') return cm;
  if (cm === 'system') return readSystemAppearance();
  return readAppearanceFromHtml();
}

/**
 * Storybook preview hooks (`useGlobals`, etc.) only work inside decorators and story functions.
 * Docs containers sit outside that boundary — use `context.globals` + `html[data-theme]` instead.
 */
export function VdsDocsContainer(props: DocsContainerProps) {
  const [appearance, setAppearance] = useState<'light' | 'dark'>(() => readAppearance(props));

  useEffect(() => {
    setAppearance(readAppearance(props));
    const el = document.documentElement;
    const sync = () => setAppearance(readAppearance(props));
    const mo = new MutationObserver(sync);
    mo.observe(el, { attributes: true, attributeFilter: ['data-theme'] });
    return () => mo.disconnect();
  }, [props.context]);

  const theme = useMemo(
    () => (appearance === 'dark' ? vdsDocsDark : vdsDocsLight),
    [appearance]
  );

  return <DocsContainer {...props} theme={theme} />;
}
