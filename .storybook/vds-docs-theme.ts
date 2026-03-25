/**
 * Storybook Docs UI theme (addon-docs / blocks) — drives Canvas toolbar, Controls table,
 * inputs, etc. Must stay aligned with src/tokens/semantic.ts (layered surfaces, contrast).
 */
import { create } from '@storybook/theming/create';

/** Light: soft canvas + slightly elevated content (Apple-like, not pure #fff everywhere) */
export const vdsDocsLight = create({
  base: 'light',
  brandTitle: 'VDS Design System',
  colorPrimary: '#0055ff',
  colorSecondary: '#6b7694',
  appBg: '#f5f6f8',
  appContentBg: '#ffffff',
  appPreviewBg: '#fafbff',
  appBorderColor: 'rgba(12, 13, 16, 0.08)',
  barBg: '#f0f2f6',
  barTextColor: '#1a1f35',
  barHoverColor: '#0055ff',
  barSelectedColor: '#0055ff',
  inputBg: '#ffffff',
  inputBorder: 'rgba(12, 13, 16, 0.12)',
  inputTextColor: '#0c0d10',
  textColor: '#0c0d10',
  textMutedColor: '#6b7694',
  textInverseColor: '#ffffff',
});

/** Dark: layered greys + translucent borders (Apple HIG–style dark UI) */
export const vdsDocsDark = create({
  base: 'dark',
  brandTitle: 'VDS Design System',
  colorPrimary: '#0a84ff',
  colorSecondary: '#98989d',
  appBg: '#0c0d10',
  appContentBg: '#1c1d22',
  appPreviewBg: '#242830',
  /* Hairline only — Storybook draws inset rings from this; keep ≤ ~4% white */
  appBorderColor: 'rgba(255, 255, 255, 0.034)',
  barBg: '#242830',
  barTextColor: '#f5f5f7',
  barHoverColor: '#66b0ff',
  barSelectedColor: '#0a84ff',
  buttonBg: '#1c1d22',
  buttonBorder: 'rgba(255, 255, 255, 0.05)',
  booleanBg: '#1c1d22',
  booleanSelectedBg: '#2e323a',
  inputBg: '#2e323a',
  inputBorder: 'rgba(255, 255, 255, 0.08)',
  inputTextColor: '#f5f5f7',
  textColor: '#f5f5f7',
  textMutedColor: '#98989d',
  textInverseColor: '#0c0d10',
});
