import daisyui from 'daisyui';
import plugin from 'tailwindcss/plugin';
import { fontFamily, defaultExtensions } from './themes';
import { themeCustom, customVars } from './themes/custom';
import { themeDark } from './themes/dark';

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
        'cyberpunk',
        'luxury',
        'coffee',
        'retro',
        'synthwave',
        // Registered via addBase below — DaisyUI v5 only accepts string theme names here
        'custom',
      ],
    }),
    plugin(function ({ addBase }) {
      // Custom palette + layout vars ONLY on `[data-theme="custom"]`. Injecting the same
      // `--color-*` values on `:root` ran after DaisyUI and overwrote every built-in theme
      // (Retro, Synthwave, …) on the document root.
      const customThemeVars = {};
      Object.entries(themeCustom.colors).forEach(([key, value]) => {
        customThemeVars[`--color-${key}`] = value;
        customThemeVars[`--vui-color-${key}`] = value;
      });
      Object.entries(customVars).forEach(([key, value]) => {
        customThemeVars[key] = value;
      });
      const darkThemeVars = {};
      Object.entries(themeDark.colors).forEach(([key, value]) => {
        darkThemeVars[`--color-${key}`] = value;
        darkThemeVars[`--vui-color-${key}`] = value;
      });
      Object.entries(customVars).forEach(([key, value]) => {
        darkThemeVars[key] = value;
      });
      addBase({
        '[data-theme="custom"]': {
          ...themeCustom.config,
          ...customThemeVars,
        },
        '[data-theme="dark"]': {
          ...themeDark.config,
          ...darkThemeVars,
        },
        '@media (prefers-color-scheme: dark)': {
          ':root:not([data-theme])': {
            ...themeDark.config,
            ...darkThemeVars,
          },
        },
      });

      // Map legacy `--vui-color-*` to DaisyUI’s `--color-*` for built-in themes (not duplicated on custom).
      const vuiAliases = {};
      for (const key of Object.keys(themeCustom.colors)) {
        vuiAliases[`--vui-color-${key}`] = `var(--color-${key})`;
      }
      addBase({
        '[data-theme]:not([data-theme="custom"]), :root:not([data-theme])': vuiAliases,
      });
    }),
  ],
};

export default preset;
