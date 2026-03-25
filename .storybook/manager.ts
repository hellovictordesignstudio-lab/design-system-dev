import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';
import { GLOBALS_UPDATED } from 'storybook/internal/core-events';

const shared = {
  brandTitle: 'VDS Design System',
  brandUrl: 'https://hellovictordesignstudio-lab.github.io/design-system-dev/',
  brandTarget: '_self' as const,
  appBorderRadius: 10,
  fontBase: '"Nunito Sans", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  fontCode: '"JetBrains Mono", ui-monospace, monospace',
  inputBorderRadius: 8,
};

/**
 * Light shell — Apple-like: warm canvas, clear hierarchy (not flat white everywhere).
 */
const vdsLight = create({
  ...shared,
  base: 'light',
  colorPrimary: '#0055FF',
  colorSecondary: '#0044CC',
  appBg: '#F5F6F8',
  appContentBg: '#FFFFFF',
  appPreviewBg: '#FAFBFF',
  appBorderColor: '#E8ECF5',
  textColor: '#0C0D10',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#6B7694',
  barTextColor: '#4E5A6E',
  barHoverColor: '#0055FF',
  barSelectedColor: '#0055FF',
  barBg: '#FFFFFF',
  inputBg: '#F8F9FC',
  inputBorder: '#DDE1EA',
  inputTextColor: '#0C0D10',
});

/**
 * Dark shell — Apple HIG: layered surfaces, no pure black alone; readable labels.
 */
const vdsDark = create({
  ...shared,
  base: 'dark',
  colorPrimary: '#0A84FF',
  colorSecondary: '#66B0FF',
  appBg: '#0C0D10',
  appContentBg: '#1C1D22',
  appPreviewBg: '#1C1D22',
  appBorderColor: 'rgba(255, 255, 255, 0.12)',
  textColor: '#F5F5F7',
  textInverseColor: '#0C0D10',
  textMutedColor: '#98989D',
  barTextColor: '#C7C7CC',
  barHoverColor: '#0A84FF',
  barSelectedColor: '#0A84FF',
  barBg: '#242830',
  inputBg: '#2E323A',
  inputBorder: 'rgba(255, 255, 255, 0.12)',
  inputTextColor: '#F5F5F7',
});

const sbConfig = { sidebar: { showRoots: true } };

function resolveShellTheme(colorMode: string | undefined) {
  if (colorMode === 'dark') return vdsDark;
  if (colorMode === 'light') return vdsLight;
  if (colorMode === 'system' && typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? vdsDark : vdsLight;
  }
  return vdsLight;
}

/** Read colorMode from Storybook URL (?globals=colorMode:dark) */
function colorModeFromUrl(): string | undefined {
  try {
    const qs = new URLSearchParams(window.location.search);
    const globals = qs.get('globals');
    if (!globals) return undefined;
    for (const segment of globals.split(';')) {
      const idx = segment.indexOf(':');
      if (idx === -1) continue;
      const key = segment.slice(0, idx);
      const value = segment.slice(idx + 1);
      if (key === 'colorMode') return value;
    }
  } catch {
    /* ignore */
  }
  return undefined;
}

function applyManagerTheme(mode: string | undefined) {
  addons.setConfig({
    theme: resolveShellTheme(mode),
    ...sbConfig,
  });
}

const initialMode = colorModeFromUrl() ?? 'light';
applyManagerTheme(initialMode);

addons.register('vds-shell-theme', () => {
  const channel = addons.getChannel();
  channel.on(
    GLOBALS_UPDATED,
    (payload: { globals?: { colorMode?: string }; initialGlobals?: { colorMode?: string } }) => {
      const mode = payload?.globals?.colorMode ?? payload?.initialGlobals?.colorMode;
      applyManagerTheme(mode);
    }
  );
});
