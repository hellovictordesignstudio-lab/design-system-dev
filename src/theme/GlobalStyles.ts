/**
 * Global Styles
 * - Imports Nunito Sans from Google Fonts
 * - Sets CSS custom properties from semantic tokens (light + dark) so nested
 *   [data-theme='dark'] and html[data-theme='dark'] always resolve correct --color-*
 * - Provides smooth color-mode transitions
 * - CSS resets and base styles
 */

import { createGlobalStyle } from 'styled-components';
import { darkColorTokens, lightColorTokens } from '../tokens/semantic';

function cssVarsFromTokens(tokens: Record<string, string>): string {
  return Object.entries(tokens)
    .map(([key, value]) => `    --${key}: ${value};`)
    .join('\n');
}

const lightCssVars = cssVarsFromTokens(lightColorTokens as Record<string, string>);
const darkCssVars = cssVarsFromTokens(darkColorTokens as Record<string, string>);

export const GlobalStyles = createGlobalStyle`
  /* ── Google Fonts ─────────────────────────────────────────────────────────── */
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,400;0,6..12,600;0,6..12,700;0,6..12,800;1,6..12,400;1,6..12,600&display=swap');

  /* ── CSS Custom Properties (semantic tokens; not tied to SC theme object) ─ */
  :root,
  html[data-theme='light'],
  [data-theme='light'] {
${lightCssVars}
    --color-bg-primary:             var(--color-bg-default);
    --color-bg-tertiary:            var(--color-bg-muted);
  }

  html[data-theme='dark'],
  [data-theme='dark'] {
${darkCssVars}
    --color-bg-primary:             var(--color-bg-default);
    --color-bg-tertiary:            var(--color-bg-muted);
    color-scheme: dark;
  }

  html[data-theme='light'],
  html:not([data-theme='dark']) {
    color-scheme: light;
  }

  /* ── Color Mode Transition ───────────────────────────────────────────────── */
  *,
  *::before,
  *::after {
    transition:
      background-color 200ms cubic-bezier(0.4, 0, 0.2, 1),
      border-color     200ms cubic-bezier(0.4, 0, 0.2, 1),
      color            200ms cubic-bezier(0.4, 0, 0.2, 1),
      fill             200ms cubic-bezier(0.4, 0, 0.2, 1),
      stroke           200ms cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow       200ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Disable transitions for elements that should not animate */
  [data-no-transition] *,
  [data-no-transition] {
    transition: none !important;
  }

  /* ── CSS Reset ───────────────────────────────────────────────────────────── */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.sans};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    color: var(--color-text-primary);
    background-color: var(--color-bg-canvas);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  a {
    color: var(--color-text-link);
    text-decoration: none;

    &:hover {
      color: var(--color-text-link-hover);
      text-decoration: underline;
    }
  }

  :focus-visible {
    outline: 2px solid var(--color-border-focus);
    outline-offset: 2px;
  }

  ::selection {
    background-color: var(--color-brand-primary-subtle);
    color: var(--color-text-primary);
  }

  #root {
    isolation: isolate;
  }
`;
