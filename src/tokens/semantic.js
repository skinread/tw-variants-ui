/**
 * Semantic color palettes — single source for tokens, DaisyUI theme files, and docs.
 * Keys match DaisyUI / preset `--color-*` and `--vui-color-*` injection.
 */

export const lightSemanticColors = {
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
};

/**
 * Dark theme semantic colours — same key set as light so `--vui-color-*` resolve per `data-theme`.
 */
export const darkSemanticColors = {
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
