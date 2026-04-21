import daisyui from 'daisyui';
import plugin from 'tailwindcss/plugin';
import { fontFamily, defaultExtensions } from './themes';
import { themeCustom, customVars } from './themes/custom';

/** @type {import('tailwindcss').Config} */
const preset = {
  content: ['./src/**/*.{html,md,mdx,mjs,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      ...defaultExtensions,
      fontFamily,
    },
  },
  plugins: [
    // DaisyUI v5
    daisyui({
      themes: [
        'light --default',
        'dark --prefersdark',
        'aqua',
        'fantasy',
        'garden',
        'retro',
        'synthwave',
        // Registered via addBase below — DaisyUI v5 only accepts string theme names here
        'custom',
      ],
    }),
    plugin(function ({ addBase }) {
      const rootVars = {};
      Object.entries(themeCustom.colors).forEach(([key, value]) => {
        rootVars[`--color-${key}`] = value;
        rootVars[`--vui-color-${key}`] = value;
      });
      Object.entries(customVars).forEach(([key, value]) => {
        rootVars[key] = value;
      });
      addBase({ ':root': rootVars });
      addBase({ '[data-theme="custom"]': themeCustom.config });
    }),
  ],
};

export default preset;
