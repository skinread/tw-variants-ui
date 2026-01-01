import { create, type ThemeVars } from 'storybook/theming';

const brand = {
  brandTitle: 'Tailwind Variants UI',
  // brandUrl: '',
  // brandImage: '',
  brandTarget: '_self',
};

/**
 * Storybook skin for light mode. This is not a component story theme.
 */
export const lightStorybook: ThemeVars = create({
  base: 'light',
  ...brand,
});

/**
 * Storybook skin for dark mode. This is not a component story theme.
 */
export const darkStorybook: ThemeVars = create({
  base: 'dark',
  ...brand,
});
