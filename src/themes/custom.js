import { lightSemanticColors } from '../tokens/semantic.js';

const semanticColours = lightSemanticColors;

/** DaisyUI theme colour map (custom preset) */
const colors = {
  ...semanticColours,
};

export const customVars = {
  // DaisyUI v4 name kept for our own component classes that still use it
  '--rounded-field': '10px',
  // DaisyUI v5 equivalents applied to :root so the custom theme has the right
  // radius/sizing values; built-in themes (synthwave, retro …) override these
  // on their own [data-theme] selector.
  '--radius-selector': '10px',
  '--radius-field': '10px',
  '--radius-box': '12px',
  '--size-selector': '0.25rem',
  '--size-field': '0.25rem',
  '--border': '1px',
  '--depth': '1',
  '--noise': '0',
  // component-level custom variables
  '--vui-radio-size': '1.75rem',
  '--vui-checkbox-size': '1.75rem',
};

/**
 * DaisyUI complex customised theme overrides
 */
const config = {
  ...semanticColours,
  // '--rounded-box': '1rem', // border radius rounded-box utility class, used in card and other large boxes
  '--rounded-btn': '10px', // border radius rounded-btn utility class, used in buttons and similar element
  // '--rounded-badge': '1.9rem', // border radius rounded-badge utility class, used in badges and similar
  // '--animation-btn': '0.25s', // duration of animation when you click on button
  // '--animation-input': '0.2s', // duration of animation for inputs like checkbox, toggle, radio, etc
  '--btn-focus-scale': '1', // scale transform of button when you focus on it
  '--border-btn': '1px', // border width of buttons
  // '--tab-border': '1px', // border width of tabs
  // '--tab-radius': '0.5rem', // border radius of tabs,
  ...customVars,
  // _____ STYLE OVERRIDES _____
  '.link': {
    color: 'var(--vui-color-link)',
  },
  '.divider:before, .divider:after': {
    'background-color': 'var(--vui-color-foreground)',
    height: '1px',
  },
  '.btn, .btn-primary, .btn-secondary, .btn-neutral': {
    'outline-color': 'var(--vui-color-focus-ring)',
  },
  '.input-primary:not(.input-error), .checkbox-primary:not(:checked,  .checkbox-error), .radio-primary:not(.radio-error), .select-primary:not(.select-error), .textarea-primary:not(.textarea-error)':
    {
      'border-color': 'var(--vui-color-foreground)',
    },
  '.alert': {
    'grid-auto-flow': 'column',
    'grid-template-columns': 'auto minmax(auto,1fr)',
    'align-items': 'start',
    'justify-items': 'start',
    'text-align': 'start',
  },
  '.progress::-moz-progress-bar': {
    'border-radius': 0,
  },
  '.progress-warning::-moz-progress-bar': {
    'background-color': 'var(--vui-color-warning-content)',
  },
  // must be repeated as individual selector due to webkit bug https://nicolasbouliane.com/blog/webkit-progress-value
  '.progress::-webkit-progress-value': {
    'border-radius': 0,
  },
  '.progress-warning::-webkit-progress-value': {
    'background-color': 'var(--vui-color-warning-content)',
  },
  '.join-item.btn:hover': {
    'background-color': 'inherit',
  },
  '.join-item.btn:is(:checked):hover': {
    'background-color': 'var(--my-bg-active)',
  },
};

export const themeCustom = {
  colors,
  config,
};
