/**
 * Design tokens — single source of truth for JS consumers (tooling, docs, tests).
 * Color values mirror src/themes/custom.js (the default theme).
 * CSS var equivalents are injected by src/tailwind-preset.js as --vui-color-* and --color-*.
 */
export const tokens = {
  colors: {
    background: '#ffffff',
    foreground: '#222222',
    subtle: '#757575',
    link: '#195332',

    neutral: '#9AF5C1',
    'neutral-focus': '#3BC576',
    'neutral-content': '#222222',

    primary: '#43E187',
    'primary-focus': '#2A8C54',
    'primary-content': '#222222',

    secondary: '#32A865',
    accent: '#6CF1A5',

    info: '#234e9c',
    success: '#2A8C54',
    warning: '#ff9900',
    error: '#712314',
    'warning-content': '#ffffff',
    'focus-ring': '#153ff9',
  },
  fontFamily: ['Roboto', 'Lato', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
  spacing: {
    xs: '4px',
    s: '8px',
    m: '12px',
    l: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
  },
  borderRadius: {
    field: '10px',
    btn: '10px',
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  fontSize: {
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
  },
};
