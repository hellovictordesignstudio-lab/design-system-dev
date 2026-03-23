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

export const darkColorTokens = {
  // Brand / Interactive
  'color-brand-primary':          colorPrimitives.blue[400],
  'color-brand-primary-hover':    colorPrimitives.blue[300],
  'color-brand-primary-active':   colorPrimitives.blue[200],
  'color-brand-primary-subtle':   colorPrimitives.blue[900],
  'color-brand-primary-muted':    colorPrimitives.blue[800],
  'color-brand-on-primary':       colorPrimitives.neutral[900],

  // Background
  'color-bg-canvas':              colorPrimitives.neutral[900],
  'color-bg-default':             colorPrimitives.neutral[800],
  'color-bg-subtle':              '#1A1D24',
  'color-bg-muted':               colorPrimitives.neutral[700],
  'color-bg-emphasized':          colorPrimitives.neutral[600],
  'color-bg-overlay':             colorPrimitives.neutral[800],
  'color-bg-inverse':             colorPrimitives.neutral[0],

  // Border
  'color-border-default':         colorPrimitives.neutral[700],
  'color-border-subtle':          colorPrimitives.neutral[800],
  'color-border-strong':          colorPrimitives.neutral[600],
  'color-border-focus':           colorPrimitives.blue[400],
  'color-border-inverse':         colorPrimitives.neutral[200],

  // Text
  'color-text-primary':           colorPrimitives.neutral[50],
  'color-text-secondary':         colorPrimitives.neutral[300],
  'color-text-tertiary':          colorPrimitives.neutral[400],
  'color-text-disabled':          colorPrimitives.neutral[600],
  'color-text-inverse':           colorPrimitives.neutral[900],
  'color-text-link':              colorPrimitives.blue[400],
  'color-text-link-hover':        colorPrimitives.blue[300],
  'color-text-on-brand':          colorPrimitives.neutral[900],

  // Feedback — Success
  'color-success-default':        colorPrimitives.green[300],
  'color-success-subtle':         '#0D2B1E',
  'color-success-text':           colorPrimitives.green[300],
  'color-success-border':         colorPrimitives.green[400],

  // Feedback — Error
  'color-error-default':          colorPrimitives.red[300],
  'color-error-subtle':           '#2B0D10',
  'color-error-text':             colorPrimitives.red[300],
  'color-error-border':           colorPrimitives.red[400],

  // Feedback — Warning
  'color-warning-default':        colorPrimitives.orange[300],
  'color-warning-subtle':         '#2B1A0D',
  'color-warning-text':           colorPrimitives.orange[300],
  'color-warning-border':         colorPrimitives.orange[400],
} as const;

// Re-export primitives for convenience
export { spacingPrimitives as spacing };
export { typographyPrimitives as typography };
export { borderRadiusPrimitives as borderRadius };
export { shadowPrimitives as shadows };
export { transitionPrimitives as transitions };
