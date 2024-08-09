import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { lightStorybook, darkStorybook } from './storybook-theme';
import type { Preview } from '@storybook/react';

// inject the Tailwind styling
import '../src/styles/tailwind.css';

const preview: Preview = {
  decorators: [
    // use the @storybook/addon-themes to configure the component story themes
    withThemeByDataAttribute({
      themes: {
        Aqua: 'aqua',
        Custom: 'custom',
        Fantasy: 'fantasy',
        Garden: 'garden',
        Retro: 'retro',
        Synthwave: 'synthwave',
      },
      defaultTheme: 'Custom',
      attributeName: 'data-theme',
    }),
  ],
  parameters: {
    options: {
      storySort: {
        order: ['README', 'Design Tokens', 'Typography'],
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      default: 'neutral',
      values: [
        {
          name: 'neutral',
          value: 'hsl(var(--vui-color-background))',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // Use the darkMode plugin to better preset the Storybook theme
    // these themes are not applied to component stories
    darkMode: {
      dark: darkStorybook,
      light: lightStorybook,
    },
  },
};

export default preview;
