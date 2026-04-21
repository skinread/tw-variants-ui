import { lightSemanticColors } from './semantic.js';

/**
 * Design tokens — single source of truth for JS consumers (tooling, docs, tests).
 * Color values come from `./semantic.js` (light / default theme).
 * CSS variables are injected in `src/tailwind-preset.js` as `--color-*` and `--vui-color-*`.
 */
export const tokens = {
  colors: { ...lightSemanticColors },
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

export { lightSemanticColors, darkSemanticColors } from './semantic.js';
