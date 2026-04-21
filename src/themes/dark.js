import { customVars } from './custom';
import { darkSemanticColors } from '../tokens/semantic.js';

const semanticColours = darkSemanticColors;

const colors = {
  ...semanticColours,
  // DaisyUI v5 layered surface colours for this theme's page backgrounds
  'base-100': semanticColours.background,
  'base-200': '#1f2937',
  'base-300': '#374151',
  'base-content': semanticColours.foreground,
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
