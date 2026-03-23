/**
 * Primitive Tokens
 * Raw design values — the foundation of the token system.
 * Do not use these directly in components; use semantic tokens instead.
 */

export const colorPrimitives = {
  // Primary Blue Scale
  blue: {
    50:  '#E6EEFF',
    100: '#C0D2FF',
    200: '#99B5FF',
    300: '#6690FF',
    400: '#3370FF',
    500: '#0055FF', // Brand
    600: '#0044CC',
    700: '#003399',
    800: '#002266',
    900: '#001133',
  },

  // Neutral Scale
  neutral: {
    0:   '#FFFFFF',
    50:  '#F5F6F8',
    100: '#ECEEF2',
    200: '#D8DCE5',
    300: '#BEC4D0',
    400: '#9AA2B3',
    500: '#6B7589',
    600: '#4E5A6E',
    700: '#364050',
    800: '#212833',
    900: '#0C0D10',
  },

  // Success Green
  green: {
    50:  '#E6F5EE',
    100: '#C2E5D2',
    200: '#8DCFAD',
    300: '#52B882',
    400: '#0A8853', // Success
    500: '#076640',
  },

  // Error Red
  red: {
    50:  '#FCEAEC',
    100: '#F7C6CA',
    200: '#F09099',
    300: '#E55A67',
    400: '#D22232', // Error
    500: '#A81A27',
  },

  // Warning Orange
  orange: {
    50:  '#FEF2EB',
    100: '#FDDBC8',
    200: '#FABB96',
    300: '#F89462',
    400: '#F07332', // Warning
    500: '#C85820',
  },

  // Pure values
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export const spacingPrimitives = {
  0:   '0px',
  1:   '4px',
  2:   '8px',
  3:   '12px',
  4:   '16px',
  5:   '20px',
  6:   '24px',
  8:   '32px',
  10:  '40px',
  12:  '48px',
  16:  '64px',
  20:  '80px',
  24:  '96px',
} as const;

export const typographyPrimitives = {
  fontFamily: {
    sans:  '"Nunito Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono:  '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
  },
  fontSize: {
    xs:   '0.75rem',   // 12px
    sm:   '0.875rem',  // 14px
    base: '1rem',      // 16px
    lg:   '1.125rem',  // 18px
    xl:   '1.25rem',   // 20px
    '2xl':'1.5rem',    // 24px
    '3xl':'1.875rem',  // 30px
    '4xl':'2.25rem',   // 36px
    '5xl':'3rem',      // 48px
  },
  fontWeight: {
    regular:    400,
    semibold:   600,
    bold:       700,
    extrabold:  800,
  },
  lineHeight: {
    tight:  1.25,
    snug:   1.375,
    normal: 1.5,
    relaxed:1.625,
    loose:  2,
  },
  letterSpacing: {
    tight:  '-0.025em',
    normal: '0em',
    wide:   '0.025em',
    wider:  '0.05em',
    widest: '0.1em',
  },
} as const;

export const borderRadiusPrimitives = {
  none:  '0px',
  sm:    '4px',
  base:  '6px',
  md:    '8px',
  lg:    '12px',
  xl:    '16px',
  '2xl': '24px',
  full:  '9999px',
} as const;

export const shadowPrimitives = {
  none: 'none',
  xs:   '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm:   '0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10)',
  base: '0 4px 6px -1px rgba(0, 0, 0, 0.10), 0 2px 4px -2px rgba(0, 0, 0, 0.10)',
  md:   '0 10px 15px -3px rgba(0, 0, 0, 0.10), 0 4px 6px -4px rgba(0, 0, 0, 0.10)',
  lg:   '0 20px 25px -5px rgba(0, 0, 0, 0.10), 0 8px 10px -6px rgba(0, 0, 0, 0.10)',
  xl:   '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner:'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
} as const;

export const zIndexPrimitives = {
  hide:     -1,
  auto:     'auto',
  base:     0,
  raised:   1,
  dropdown: 1000,
  sticky:   1100,
  overlay:  1200,
  modal:    1300,
  popover:  1400,
  toast:    1500,
  tooltip:  1600,
} as const;

export const transitionPrimitives = {
  duration: {
    instant: '0ms',
    fast:    '100ms',
    base:    '200ms',
    slow:    '300ms',
    slower:  '500ms',
  },
  easing: {
    linear:    'linear',
    easeIn:    'cubic-bezier(0.4, 0, 1, 1)',
    easeOut:   'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring:    'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const;
