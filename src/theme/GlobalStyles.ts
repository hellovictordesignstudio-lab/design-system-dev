/**
 * Global Styles
 * - Imports Nunito Sans from Google Fonts
 * - Sets CSS custom properties (variables) from the active theme
 * - Provides smooth color-mode transitions
 * - CSS resets and base styles
 */

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* ── Google Fonts ─────────────────────────────────────────────────────────── */
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,400;0,6..12,600;0,6..12,700;0,6..12,800;1,6..12,400;1,6..12,600&display=swap');

  /* ── CSS Custom Properties (theme variables) ─────────────────────────────── */
  :root,
  [data-theme='light'] {
    /* Colors */
    --color-brand-primary:          ${({ theme }) => theme.colors['color-brand-primary']};
    --color-brand-primary-hover:    ${({ theme }) => theme.colors['color-brand-primary-hover']};
    --color-brand-primary-active:   ${({ theme }) => theme.colors['color-brand-primary-active']};
    --color-brand-primary-subtle:   ${({ theme }) => theme.colors['color-brand-primary-subtle']};
    --color-brand-primary-muted:    ${({ theme }) => theme.colors['color-brand-primary-muted']};
    --color-brand-on-primary:       ${({ theme }) => theme.colors['color-brand-on-primary']};

    --color-bg-canvas:              ${({ theme }) => theme.colors['color-bg-canvas']};
    --color-bg-default:             ${({ theme }) => theme.colors['color-bg-default']};
    --color-bg-subtle:              ${({ theme }) => theme.colors['color-bg-subtle']};
    --color-bg-muted:               ${({ theme }) => theme.colors['color-bg-muted']};
    --color-bg-emphasized:          ${({ theme }) => theme.colors['color-bg-emphasized']};
    --color-bg-overlay:             ${({ theme }) => theme.colors['color-bg-overlay']};
    --color-bg-inverse:             ${({ theme }) => theme.colors['color-bg-inverse']};

    --color-border-default:         ${({ theme }) => theme.colors['color-border-default']};
    --color-border-subtle:          ${({ theme }) => theme.colors['color-border-subtle']};
    --color-border-strong:          ${({ theme }) => theme.colors['color-border-strong']};
    --color-border-focus:           ${({ theme }) => theme.colors['color-border-focus']};
    --color-border-inverse:         ${({ theme }) => theme.colors['color-border-inverse']};

    --color-text-primary:           ${({ theme }) => theme.colors['color-text-primary']};
    --color-text-secondary:         ${({ theme }) => theme.colors['color-text-secondary']};
    --color-text-tertiary:          ${({ theme }) => theme.colors['color-text-tertiary']};
    --color-text-disabled:          ${({ theme }) => theme.colors['color-text-disabled']};
    --color-text-inverse:           ${({ theme }) => theme.colors['color-text-inverse']};
    --color-text-link:              ${({ theme }) => theme.colors['color-text-link']};
    --color-text-link-hover:        ${({ theme }) => theme.colors['color-text-link-hover']};
    --color-text-on-brand:          ${({ theme }) => theme.colors['color-text-on-brand']};

    --color-success-default:        ${({ theme }) => theme.colors['color-success-default']};
    --color-success-subtle:         ${({ theme }) => theme.colors['color-success-subtle']};
    --color-success-text:           ${({ theme }) => theme.colors['color-success-text']};
    --color-success-border:         ${({ theme }) => theme.colors['color-success-border']};

    --color-error-default:          ${({ theme }) => theme.colors['color-error-default']};
    --color-error-subtle:           ${({ theme }) => theme.colors['color-error-subtle']};
    --color-error-text:             ${({ theme }) => theme.colors['color-error-text']};
    --color-error-border:           ${({ theme }) => theme.colors['color-error-border']};

    --color-warning-default:        ${({ theme }) => theme.colors['color-warning-default']};
    --color-warning-subtle:         ${({ theme }) => theme.colors['color-warning-subtle']};
    --color-warning-text:           ${({ theme }) => theme.colors['color-warning-text']};
    --color-warning-border:         ${({ theme }) => theme.colors['color-warning-border']};
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
    color: ${({ theme }) => theme.colors['color-text-primary']};
    background-color: ${({ theme }) => theme.colors['color-bg-canvas']};
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
    color: ${({ theme }) => theme.colors['color-text-link']};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.colors['color-text-link-hover']};
      text-decoration: underline;
    }
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors['color-border-focus']};
    outline-offset: 2px;
  }

  ::selection {
    background-color: ${({ theme }) => theme.colors['color-brand-primary-subtle']};
    color: ${({ theme }) => theme.colors['color-text-primary']};
  }

  #root {
    isolation: isolate;
  }
`;
