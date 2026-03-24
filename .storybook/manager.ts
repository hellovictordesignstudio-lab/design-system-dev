import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const brandTheme = create({
  base: 'light',
  brandTitle: 'Design System',
  brandUrl:   '/',
  brandTarget:'_self',

  colorPrimary:   '#E8EEFF',
  colorSecondary: '#E8EEFF',

  appBg:          '#FFFFFF',
  appContentBg:   '#FFFFFF',
  appPreviewBg:   '#FFFFFF',
  appBorderColor: '#F0F0F0',
  appBorderRadius: 0,

  fontBase: '"Nunito Sans", system-ui, sans-serif',
  fontCode: '"JetBrains Mono", monospace',

  textColor:        '#1A1A1A',
  textInverseColor: '#FFFFFF',
  textMutedColor:   '#9BA5BE',

  barTextColor:    '#9BA5BE',
  barHoverColor:   '#0055FF',
  barSelectedColor:'#0055FF',
  barBg:           '#FFFFFF',

  inputBg:          '#F8F8F8',
  inputBorder:      '#E8E8E8',
  inputTextColor:   '#1A1A1A',
  inputBorderRadius: 6,
});

addons.setConfig({
  theme: brandTheme,
  sidebar: {
    showRoots: true,
  },
});