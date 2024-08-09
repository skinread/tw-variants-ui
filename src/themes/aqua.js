import { customVars } from './custom';

/**
 * DaisyUI "Aqua" example theme
 */
const colors = {
  primary: '#3de2ff',
  'primary-focus': '#0adaff',
  'primary-content': '#000000',

  secondary: '#936db0',
  'secondary-focus': '#7d549c',
  'secondary-content': '#ffffff',

  accent: '#ffe999',
  'accent-focus': '#ffde66',
  'accent-content': '#ffffff',

  neutral: '#132690',
  'neutral-focus': '#18277b',
  'neutral-content': '#ffffff',

  'base-100': '#0c25b6',
  'base-200': '#132690',
  'base-300': '#18277b',
  'base-content': '#ffffff',

  info: '#1c92f2',
  success: '#009485',
  warning: '#ff9900',
  error: '#ff5724',
};

const config = {
  ...colors,
  ...customVars,
  '--rounded-box': '1rem',
  '--rounded-btn': '.5rem',
  '--rounded-badge': '1.9rem',

  '--animation-btn': '.25s',
  '--animation-input': '.2s',

  '--btn-text-case': 'uppercase',
  '--navbar-padding': '.5rem',
  '--border-btn': '1px',
};

export const themeAqua = {
  colors,
  config,
};
