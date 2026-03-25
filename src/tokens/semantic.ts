/**
 * Semantic Tokens
 * Contextual aliases that map primitive values to their intended purpose.
 * These are the tokens components should consume.
 */

import { colorPrimitives, spacingPrimitives, typographyPrimitives, borderRadiusPrimitives, shadowPrimitives, transitionPrimitives } from './primitives';

// ─── Color Semantic Tokens ────────────────────────────────────────────────────

export const lightColorTokens = {
  // Brand / Interactive
  'color-brand-primary':          colorPrimitives.blue[500],
  'color-brand-primary-hover':    colorPrimitives.blue[600],
  'color-brand-primary-active':   colorPrimitives.blue[700],
  'color-brand-primary-subtle':   colorPrimitives.blue[50],
  'color-brand-primary-muted':    colorPrimitives.blue[100],
  'color-brand-on-primary':       colorPrimitives.neutral[0],

  // Background
  'color-bg-canvas':              colorPrimitives.neutral[0],
  'color-bg-default':             colorPrimitives.neutral[0],
  'color-bg-subtle':              colorPrimitives.neutral[50],
  'color-bg-muted':               colorPrimitives.neutral[100],
  'color-bg-emphasized':          colorPrimitives.neutral[200],
  'color-bg-overlay':             colorPrimitives.neutral[0],
  'color-bg-inverse':             colorPrimitives.neutral[900],

  // Border
  'color-border-default':         colorPrimitives.neutral[200],
  'color-border-subtle':          colorPrimitives.neutral[100],
  'color-border-strong':          colorPrimitives.neutral[300],
  'color-border-focus':           colorPrimitives.blue[500],
  'color-border-inverse':         colorPrimitives.neutral[700],

  // Text
  'color-text-primary':           colorPrimitives.neutral[900],
  'color-text-secondary':         colorPrimitives.neutral[600],
  'color-text-tertiary':          colorPrimitives.neutral[500],
  'color-text-disabled':          colorPrimitives.neutral[400],
  'color-text-inverse':           colorPrimitives.neutral[0],
  'color-text-link':              colorPrimitives.blue[500],
  'color-text-link-hover':        colorPrimitives.blue[600],
  'color-text-on-brand':          colorPrimitives.neutral[0],

  // Feedback — Success
  'color-success-default':        colorPrimitives.green[400],
  'color-success-subtle':         colorPrimitives.green[50],
  'color-success-text':           colorPrimitives.green[500],
  'color-success-border':         colorPrimitives.green[200],

  // Feedback — Error
  'color-error-default':          colorPrimitives.red[400],
  'color-error-subtle':           colorPrimitives.red[50],
  'color-error-text':             colorPrimitives.red[500],
  'color-error-border':           colorPrimitives.red[200],

  // Feedback — Warning
  'color-warning-default':        colorPrimitives.orange[400],
  'color-warning-subtle':         colorPrimitives.orange[50],
  'color-warning-text':           colorPrimitives.orange[500],
  'color-warning-border':         colorPrimitives.orange[200],
} as const;

/**
 * Dark appearance — aligned with Apple HIG Dark Mode:
 * - Layered backgrounds (elevation = slightly higher luminance, not only drop shadows)
 * - Avoid relying on pure black alone; base + elevated surfaces for hierarchy
 * - Separators as translucent light overlays (see rgba borders)
 * - Accent colours tuned for contrast on dark surfaces (closer to system “dark blue”)
 */
export const darkColorTokens = {
  // Brand / Interactive (slightly brighter / less saturated on dark UI)
  'color-brand-primary':          '#0A84FF',
  'color-brand-primary-hover':    '#409CFF',
  'color-brand-primary-active':   '#66B0FF',
  'color-brand-primary-subtle':   'rgba(10, 132, 255, 0.14)',
  'color-brand-primary-muted':    'rgba(10, 132, 255, 0.16)',
  'color-brand-on-primary':       '#FFFFFF',

  // Background — hierarchy: canvas (deepest) → default (elevated) → subtle/muted
  'color-bg-canvas':              '#0C0D10',
  'color-bg-default':             '#1C1D22',
  'color-bg-subtle':              '#242830',
  'color-bg-muted':               '#2E323A',
  'color-bg-emphasized':          '#3A4049',
  'color-bg-overlay':             '#1C1D22',
  'color-bg-inverse':             '#FFFFFF',

  // Border — hairline separators (nested cards / docs chrome; ~3–5% white max)
  'color-border-default':         'rgba(255, 255, 255, 0.05)',
  'color-border-subtle':          'rgba(255, 255, 255, 0.035)',
  'color-border-strong':          'rgba(255, 255, 255, 0.09)',
  'color-border-focus':           '#0A84FF',
  'color-border-inverse':         'rgba(0, 0, 0, 0.18)',

  // Text — primary off-white, secondary muted (not pure white for long reading)
  'color-text-primary':           '#F5F5F7',
  'color-text-secondary':         '#98989D',
  'color-text-tertiary':          '#6C6C70',
  'color-text-disabled':          '#48484A',
  'color-text-inverse':           '#0C0D10',
  'color-text-link':              '#0A84FF',
  'color-text-link-hover':        '#66B0FF',
  'color-text-on-brand':          '#0C0D10',

  // Feedback — Success
  'color-success-default':        '#32D74B',
  'color-success-subtle':         'rgba(50, 215, 75, 0.12)',
  'color-success-text':           '#8DFF9E',
  'color-success-border':         'rgba(50, 215, 75, 0.22)',

  // Feedback — Error
  'color-error-default':          '#FF453A',
  'color-error-subtle':           'rgba(255, 69, 58, 0.12)',
  'color-error-text':             '#FF9A94',
  'color-error-border':           'rgba(255, 69, 58, 0.26)',

  // Feedback — Warning
  'color-warning-default':        '#FF9F0A',
  'color-warning-subtle':         'rgba(255, 159, 10, 0.12)',
  'color-warning-text':           '#FFD60A',
  'color-warning-border':         'rgba(255, 159, 10, 0.26)',
} as const;

/** Dark UI: elevation via subtle luminance + soft ambient shadow (not strong light-mode drop shadows) */
export const darkShadows = {
  none: shadowPrimitives.none,
  xs:   '0 1px 0 rgba(255, 255, 255, 0.02)',
  sm:   '0 1px 0 rgba(255, 255, 255, 0.03), 0 4px 16px rgba(0, 0, 0, 0.45)',
  base: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.02)',
  md:   '0 10px 20px -5px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.02)',
  lg:   '0 20px 40px -8px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.02)',
  xl:   '0 24px 48px -12px rgba(0, 0, 0, 0.55)',
  inner:'inset 0 1px 2px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.02)',
} as const;

// Re-export primitives for convenience
export { spacingPrimitives as spacing };
export { typographyPrimitives as typography };
export { borderRadiusPrimitives as borderRadius };
export { shadowPrimitives as shadows };
export { transitionPrimitives as transitions };
