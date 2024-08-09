import { customVars } from './custom';

/**
 * DaisyUI "Synthwave" theme example
 */
const colors = {
  primary: '#e679c0',
  'primary-focus': '#e04dac',
  'primary-content': '#201047',

  secondary: '#54c5f2',
  'secondary-focus': '#88d7f7',
  'secondary-content': '#201047',

  accent: '#f3cc30',
  'accent-focus': '#f6d860',
  'accent-content': '#201047',

  neutral: '#20134e',
  'neutral-focus': '#140a2e',
  'neutral-content': '#f9f7fd',

  'base-100': '#2c1a65',
  'base-200': '#20134e',
  'base-300': '#140a2e',
  'base-content': '#f9f7fd',

  info: '#4fbff3',
  success: '#71ead2',
  warning: '#f3cc30',
  error: '#e13d53',
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

export const themeSynthwave = {
  colors,
  config,
};
