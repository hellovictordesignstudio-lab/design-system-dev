import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

// ── Custom Storybook Manager Theme ────────────────────────────────────────────

const brandTheme = create({
  base: 'light',

  // Brand
  brandTitle:    'Design System',
  brandUrl:      '/',
  brandTarget:   '_self',

  // Colors
  colorPrimary:  '#0055FF',
  colorSecondary:'#0055FF',

  // UI
  appBg:          '#F5F6F8',
  appContentBg:   '#FFFFFF',
  appPreviewBg:   '#FFFFFF',
  appBorderColor: '#D8DCE5',
  appBorderRadius:8,

  // Typography
  fontBase:       '"Nunito Sans", system-ui, sans-serif',
  fontCode:       '"JetBrains Mono", monospace',

  // Text
  textColor:      '#0C0D10',
  textInverseColor:'#FFFFFF',
  textMutedColor: '#6B7589',

  // Toolbar
  barTextColor:   '#4E5A6E',
  barHoverColor:  '#0055FF',
  barSelectedColor:'#0055FF',
  barBg:          '#FFFFFF',

  // Input
  inputBg:        '#FFFFFF',
  inputBorder:    '#D8DCE5',
  inputTextColor: '#0C0D10',
  inputBorderRadius:6,
});

addons.setConfig({
  theme: brandTheme,
  sidebar: {
    showRoots: true,
  },
});
