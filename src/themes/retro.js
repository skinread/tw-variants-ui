import { customVars } from './custom';

/**
 * DaisyUI "Retro" theme example
 */
const colors = {
  primary: '#ee9a95',
  'primary-focus': '#e76b65',
  'primary-content': '#252223',

  secondary: '#a4cbb4',
  'secondary-focus': '#85b79a',
  'secondary-content': '#252223',

  accent: '#ebdc99',
  'accent-focus': '#e1cb6b',
  'accent-content': '#252223',

  neutral: '#7c725a',
  'neutral-focus': '#423d33',
  'neutral-content': '#e4d8b4',

  'base-100': '#e4d8b4',
  'base-200': '#d2c59d',
  'base-300': '#c6b386',
  'base-content': '#252223',

  info: '#1c92f2',
  success: '#009485',
  warning: '#ff9900',
  error: '#ff5724',
};

const config = {
  ...colors,
  ...customVars,
  '--rounded-box': '.4rem',
  '--rounded-btn': '.4rem',
  '--rounded-badge': '.4rem',

  '--animation-btn': '.25s',
  '--animation-input': '.2s',

  '--btn-text-case': 'uppercase',
  '--navbar-padding': '.5rem',
  '--border-btn': '1px',
};

export const themeRetro = {
  colors,
  config,
};
