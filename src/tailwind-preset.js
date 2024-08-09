import daisyui from 'daisyui';
import { daisyuiThemes, themes, fontFamily, defaultExtensions } from './themes';

/** @type {import('tailwindcss').Config} */
const preset = {
  content: ['./src/**/*.{html,md,mdx,mjs,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      ...defaultExtensions,
    },
    fontFamily,
  },
  plugins: [themes, daisyui],
  daisyui: {
    themes: [daisyuiThemes],
    darkTheme: false,
    // styled: false,
    // prefix: 'vui-',
  },
};

export default preset;
