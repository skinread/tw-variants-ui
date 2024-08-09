module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:storybook/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['jsx-a11y', 'react-refresh', 'unicorn'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['dist', 'postcss.config.js', 'tailwind.config.js'],
  rules: {
    'prettier/prettier': 'warn',
    'no-duplicate-imports': 'error',
    'no-template-curly-in-string': 'error',
    'no-use-before-define': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
  },
  overrides: [
    {
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      files: ['plopfile.js', './.storybook/*.{js,jsx,ts,tsx}'],
    },
    {
      rules: {
        '@typescript-eslint/no-unsafe-call': 'off',
      },
      files: ['**/*.stories.{jsx,tsx}'],
    },
  ],
};
