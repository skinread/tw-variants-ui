import { customVars } from './custom';

/**
 * Dark semantic colours — mirrors the same key set as custom.js so that
 * all --vui-color-* vars remain defined when data-theme="dark" is active.
 */
const semanticColours = {
  background: '#111827',
  foreground: '#e5e7eb',
  subtle: '#9ca3af',
  link: '#34d399',

  neutral: '#374151',
  'neutral-focus': '#4b5563',
  'neutral-content': '#f3f4f6',

  primary: '#43E187',
  'primary-focus': '#2A8C54',
  'primary-content': '#111827',

  secondary: '#32A865',
  accent: '#6CF1A5',

  info: '#3b82f6',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  'warning-content': '#111827',
  'focus-ring': '#153ff9',
};

const colors = {
  ...semanticColours,
};

const config = {
  ...semanticColours,
  'base-100': semanticColours.background,
  'base-200': '#1f2937',
  'base-300': '#374151',
  'base-content': semanticColours.foreground,
  '--rounded-btn': '10px',
  '--btn-focus-scale': '1',
  '--border-btn': '1px',
  ...customVars,
};

export const themeDark = {
  colors,
  config,
};
