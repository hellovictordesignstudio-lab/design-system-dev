import React from 'react';
import type { Preview, Decorator } from '@storybook/react';
import { ThemeProvider } from '../src/theme/ThemeProvider';
import { LangProvider } from '../src/theme/LangContext';
import type { ColorMode } from '../src/theme/theme';
import type { Language } from '../src/theme/i18n';

// ── Decorators ────────────────────────────────────────────────────────────────

const withProviders: Decorator = (Story, context) => {
  const colorMode = (context.globals.colorMode ?? 'light') as ColorMode;
  const lang = (context.globals.lang ?? 'en') as Language;

  return (
    <LangProvider defaultLang={lang}>
      <ThemeProvider defaultColorMode={colorMode}>
        <div
          style={{
            padding: '24px',
            minHeight: '100vh',
            backgroundColor: 'var(--color-bg-canvas)',
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    </LangProvider>
  );
};

// ── Global types (toolbar controls) ──────────────────────────────────────────

const preview: Preview = {
  globalTypes: {
    colorMode: {
      description: 'Color mode',
      toolbar: {
        title: 'Color Mode',
        icon: 'circlehollow',
        items: [
          { value: 'light',  title: 'Light',  icon: 'sun' },
          { value: 'dark',   title: 'Dark',   icon: 'moon' },
          { value: 'system', title: 'System', icon: 'browser' },
        ],
        dynamicTitle: true,
      },
    },
    lang: {
      description: 'Language',
      toolbar: {
        title: 'Language',
        icon: 'globe',
        items: [
          { value: 'en', title: 'English',  right: '🇺🇸' },
          { value: 'es', title: 'Español',  right: '🇪🇸' },
          { value: 'fr', title: 'Français', right: '🇫🇷' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    colorMode: 'light',
    lang: 'en',
  },

  decorators: [withProviders],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    layout: 'fullscreen',
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Tokens',
          ['Colors', 'Typography', 'Spacing'],
          'Components',
          '*',
        ],
      },
    },
  },
};

export default preview;
