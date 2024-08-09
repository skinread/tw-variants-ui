import { createThemes } from 'tw-colors';
import { themeAqua } from './aqua';
import { themeCustom } from './custom';
import { themeFantasy } from './fantasy';
import { themeGarden } from './garden';
import { themeRetro } from './retro';
import { themeSynthwave } from './synthwave';

/** @type {import('tailwindcss').Config['theme'].fontFamily} */
export const fontFamily = {
  sans: ['Roboto', 'Lato', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
};

/** @type {import('tailwindcss').Config['theme'].extend} */
export const defaultExtensions = {
  colors: {
    // spread any custom colour palette colours here
  },
};

/**
 * themes using tw-colors lib which provides convience and exposes
 * all values in name spaced css variables for universal compatibility
 */
export const themes = createThemes(
  {
    aqua: themeAqua.colors,
    custom: themeCustom.colors,
    fantasy: themeFantasy.colors,
    garden: themeGarden.colors,
    retro: themeRetro.colors,
    synthwave: themeSynthwave.colors,
  },
  {
    produceCssVariable: (tokenName) => `--vui-color-${tokenName}`,
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
  fantasy: mapThemeToDaisyUI(themeFantasy.config),
  garden: mapThemeToDaisyUI(themeGarden.config),
  retro: mapThemeToDaisyUI(themeRetro.config),
  synthwave: mapThemeToDaisyUI(themeSynthwave.config),
};
