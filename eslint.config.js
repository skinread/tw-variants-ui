import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import storybook from 'eslint-plugin-storybook';
import unicorn from 'eslint-plugin-unicorn';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'storybook-static/**',
      'coverage/**',
      'eslint.config.js',
      'postcss.config.js',
      'tailwind.config.js',
      'generator/**',
      'src/tailwind-preset.js',
      'src/themes/*.js',
      'src/tokens/*.js',
    ],
  },

  // Base JS rules for all files
  js.configs.recommended,

  // Full type-checked TypeScript rules for source files
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    plugins: {
      'react-refresh': reactRefresh,
      unicorn,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-duplicate-imports': 'error',
      'no-template-curly-in-string': 'error',
      'no-use-before-define': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },

  // Storybook config files — TypeScript parser, no type-checking
  {
    files: ['.storybook/**/*.{ts,tsx}'],
    extends: [...tseslint.configs.recommended],
  },

  // React and a11y for all JSX/TSX files
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  jsxA11y.flatConfigs.recommended,

  // react-hooks: manual flat config registration (v5 configs still use legacy format)
  {
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // Global settings (react version for jsx plugin)
  {
    settings: { react: { version: 'detect' } },
  },

  // Storybook story rules
  ...storybook.configs['flat/recommended'],

  // Story files — relax unsafe-call (Storybook args can be untyped)
  {
    files: ['**/*.stories.{tsx,jsx}'],
    rules: {
      '@typescript-eslint/no-unsafe-call': 'off',
    },
  },

  // Prettier last — overrides conflicting formatting rules
  prettierRecommended,
);
