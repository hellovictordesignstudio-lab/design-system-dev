import './storybook-docs.css';
import React from 'react';
import type { Preview, Decorator } from '@storybook/react';
import { ThemeProvider } from '../src/theme/ThemeProvider';
import { LangProvider } from '../src/theme/LangContext';
import { ToastProvider } from '../src/components/Toast/ToastProvider';
import type { ColorMode } from '../src/theme/theme';
import type { Language } from '../src/theme/i18n';

// ── Decorators ────────────────────────────────────────────────────────────────

const CANVAS_BG: Record<string, string> = {
  light: '#FFFFFF',
  dark:  '#0C0D10',
  system: '#FFFFFF',
};

const withProviders: Decorator = (Story, context) => {
  const colorMode = (context.globals.colorMode ?? 'light') as ColorMode;
  const lang = (context.globals.lang ?? 'en') as Language;
  const bg = CANVAS_BG[colorMode] ?? '#FFFFFF';

  return (
    <LangProvider defaultLang={lang}>
      <ThemeProvider defaultColorMode={colorMode}>
        <ToastProvider>
          <div
            style={{
              background: colorMode === 'dark' ? '#0C0D10' : '#FFFFFF',
              minHeight: '100%',
              padding: '1rem',
            }}
          >
            <Story />
          </div>
        </ToastProvider>
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
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark',  value: '#0C0D10' },
      ],
    },
    layout: 'fullscreen',
    docs: {
      toc: true,
      canvas: {
        className: undefined,
      },
      story: {
        inline: true,
      },
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
