import { customVars } from './custom';

/**
 * DaisyUI "Fantasy" example theme
 */
const colors = {
  primary: '#6d0b74',
  'primary-focus': '#410745',
  'primary-content': '#ffffff',

  secondary: '#007ebd',
  'secondary-focus': '#005c8a',
  'secondary-content': '#ffffff',

  accent: '#f8860d',
  'accent-focus': '#cb6c06',
  'accent-content': '#ffffff',

  neutral: '#1e2734',
  'neutral-focus': '#111827',
  'neutral-content': '#ffffff',

  'base-100': '#ffffff',
  'base-200': '#f9fafb',
  'base-300': '#ced3d9',
  'base-content': '#1e2734',

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

export const themeFantasy = {
  colors,
  config,
};
