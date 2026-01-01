import { defineConfig, mergeConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import path from 'node:path';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [
      storybookTest({
        configDir: path.join(import.meta.dirname, '.storybook'),
      }),
    ],
    test: {
      name: 'storybook',
      browser: {
        enabled: true,
        instances: [
          {
            browser: 'chromium',
          },
        ],
        provider: 'playwright',
        headless: true,
      },
      setupFiles: ['./.storybook/vitest.setup.ts'],
    },
  })
);
