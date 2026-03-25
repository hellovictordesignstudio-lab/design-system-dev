/**
 * Chart colors — semantic tokens so charts follow the design system.
 * Inline SVG / Recharts accept CSS `var(...)` where noted.
 */
import { lightColorTokens } from '../../tokens/semantic';

const L = lightColorTokens;

/** Brand blue RGB for chart overlays (matches `color-brand-primary` in light). */
const brandRgb = '0, 85, 255';

export const chartGridStroke = 'var(--color-border-default)';
export const chartTooltipBorder = 'var(--color-border-default)';

export const defaultSeriesColors = [
  L['color-brand-primary'],
  L['color-brand-primary-hover'],
  L['color-success-default'],
  L['color-warning-default'],
  L['color-error-default'],
  L['color-brand-primary-active'],
] as const;

export const lineBrandColor = L['color-brand-primary'];

/** Tooltip hover band — semi-transparent brand (no raw hex in chart components). */
export const chartCursorFill = `rgba(${brandRgb}, 0.06)`;
