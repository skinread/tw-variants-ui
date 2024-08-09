import { create } from '@storybook/theming/create';

const brand = {
  brandTitle: 'Tailwind Variants UI',
  // brandUrl: '',
  // brandImage: '',
  brandTarget: '_self',
};

/**
 * Storybook skin for light mode. This is not a component story theme.
 */
export const lightStorybook = create({
  base: 'light',
  ...brand,
});

/**
 * Storybook skin for dark mode. This is not a component story theme.
 */
export const darkStorybook = create({
  base: 'dark',
  ...brand,
});
