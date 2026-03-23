import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    '@storybook/addon-interactions',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  docs: {},

  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },

  viteFinal: async (config) => {
    return {
      ...config,
      base: '/design-system/',
      resolve: {
        ...config.resolve,
        alias: {
          ...((config.resolve?.alias as Record<string, string>) ?? {}),
          '@tokens': '/src/tokens',
          '@theme': '/src/theme',
          '@components': '/src/components',
          '@hooks': '/src/hooks',
          '@utils': '/src/utils',
        },
      },
    };
  },
};

export default config;
