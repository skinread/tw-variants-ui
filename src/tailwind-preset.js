import daisyui from 'daisyui';
import plugin from 'tailwindcss/plugin';
import { daisyuiThemes, themes, fontFamily, defaultExtensions } from './themes';
import { themeCustom, customVars } from './themes/custom';

/** @type {import('tailwindcss').Config} */
const preset = {
  content: ['./src/**/*.{html,md,mdx,mjs,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      ...defaultExtensions,
    },
    fontFamily,
  },
  plugins: [
    themes,
    daisyui,
    plugin(function ({ addBase }) {
      // Inject custom theme as the :root default so that --vui-color-* (public
      // consumer API) and --color-* (DaisyUI v5 alias) are always defined, even
      // when no data-theme attribute is present. Mirrors the same dual-write
      // pattern used by the theme plugin per [data-theme] selector.
      const rootVars = {};
      Object.entries(themeCustom.colors).forEach(([key, value]) => {
        rootVars[`--vui-color-${key}`] = value;
        rootVars[`--color-${key}`] = value;
      });
      Object.entries(customVars).forEach(([key, value]) => {
        rootVars[key] = value;
      });
      addBase({ ':root': rootVars });
    }),
  ],
  daisyui: {
    themes: [daisyuiThemes],
    darkTheme: 'dark',
    // styled: false,
    // prefix: 'vui-',
  },
};

export default preset;
