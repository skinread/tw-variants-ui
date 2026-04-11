import plugin from 'tailwindcss/plugin';
import { themeAqua } from './aqua';
import { themeCustom } from './custom';
import { themeDark } from './dark';
import { themeFantasy } from './fantasy';
import { themeGarden } from './garden';
import { themeRetro } from './retro';
import { themeSynthwave } from './synthwave';

/** @type {import('tailwindcss').Config['theme'].fontFamily} */
export const fontFamily = {
  sans: ['Roboto', 'Lato', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
};

export const defaultExtensions = {
  colors: {
    // spread any custom colour palette colours here
  },
};

const themeMap = {
  aqua: themeAqua.colors,
  custom: themeCustom.colors,
  dark: themeDark.colors,
  fantasy: themeFantasy.colors,
  garden: themeGarden.colors,
  retro: themeRetro.colors,
  synthwave: themeSynthwave.colors,
};

const options = {
  produceCssVariable: (tokenName) => `--vui-color-${tokenName}`,
};

const generateThemeColors = (themes, options) => {
  const colors = {};
  const firstTheme = Object.values(themes)[0];
  if (!firstTheme) return colors;

  for (const key of Object.keys(firstTheme)) {
    colors[key] = `var(${options.produceCssVariable(key)})`;
  }
  return colors;
};

/**
 * themes using custom plugin to provide convenience and expose
 * all values in name spaced css variables for universal compatibility
 */
export const themes = plugin(
  function ({ addBase }) {
    Object.entries(themeMap).forEach(([themeName, themeColors]) => {
      const cssVars = {};
      Object.entries(themeColors).forEach(([key, value]) => {
        const varName = options.produceCssVariable(key);
        cssVars[varName] = value;

        // Map everything to standard Tailwind v4 / DaisyUI v5 tokens
        // logic: DaisyUI v5 uses --color-* for components
        cssVars[`--color-${key}`] = value;
      });

      addBase({
        [`[data-theme="${themeName}"]`]: cssVars,
      });
    });
  },
  {
    theme: {
      extend: {
        colors: generateThemeColors(themeMap, options),
      },
    },
  }
);

/**
 * map the DaisyUI colours to our semantic names
 * @param {Record<string, unknown>} theme a theme object
 */
function mapThemeToDaisyUI(theme) {
  return {
    // daisyUI doesn't fail gracefully when a required color is missing
    // these are random primary/secondary/accent/neutral fallback
    primary: 'blue',
    secondary: 'green',
    accent: 'red',
    neutral: 'beige',
    ...theme,
    'base-100': theme['base-100'] ?? theme['background'],
    'base-content': theme['base-content'] ?? theme['foreground'],
  };
}

/**
 * for now this maps themes to DaisyUI using the same theme naming so that
 * it works seamlessly with `data-theme` name
 */
export const daisyuiThemes = {
  aqua: mapThemeToDaisyUI(themeAqua.config),
  custom: mapThemeToDaisyUI(themeCustom.config),
  dark: mapThemeToDaisyUI(themeDark.config),
  fantasy: mapThemeToDaisyUI(themeFantasy.config),
  garden: mapThemeToDaisyUI(themeGarden.config),
  retro: mapThemeToDaisyUI(themeRetro.config),
  synthwave: mapThemeToDaisyUI(themeSynthwave.config),
};
