# Tailwind Variants UI

<!-- ![Version](https://img.shields.io/github/package-json/v/skinread/tw-variants-ui/main) -->

[![CI Tests](https://github.com/skinread/tw-variants-ui/actions/workflows/test.yml/badge.svg)](https://github.com/skinread/tw-variants-ui/actions/workflows/test.yml)
[![Deploy Storybook Site](https://github.com/skinread/tw-variants-ui/actions/workflows/storybook.yml/badge.svg)](https://github.com/skinread/tw-variants-ui/actions/workflows/storybook.yml)
[![Publish Component Library](https://github.com/skinread/tw-variants-ui/actions/workflows/publish.yml/badge.svg)](https://github.com/skinread/tw-variants-ui/actions/workflows/publish.yml)

A collection of useful React components for building consitent frontend experiences, styled in a typesafe and almost entirely framework-angnostic way via Tailwind.

- `tailwind-variants` provides the organisation structure for components and generate the props
- `daisyui` is the base component styles and these provider

## Storybook playground

[Tailwind Variants UI]()

## Installation

**Consumers**

Scaffold a project using Vite and install tailwind and necessary dependencies in your project and use the preset.

### Tailwind Installation

The components are styled using Tailwind CSS. Tailwind has been created to be used at build time, so it is a dependency to have Tailwind installed in the consuming application.

_Skip over Tailwind steps if you are using the stand-alone CSS option._

#### Initialise Tailwind and plugins

```bash
npm install -D tailwindcss postcss autoprefixer daisyui tw-colors
npx tailwindcss init -p
```

This will add the `tailwind.config.js` to your root foolder.

#### Use preset

In your `tailwind.config.js` simply drop in the preset.

```js
import twVUI from 'tw-variants-ui/tailwind-preset';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [twVUI],
  .
  .
  .
};

```

You can extend all the usual Tailwind config following on from the preset, for reference see [Tailwind Docs](https://tailwindcss.com/docs/guides/vite)

#### Vite

Ensure the main css file has Tailwind directives and is being loaded in to your application. Vite should take care of the rest.

#### Directives

Ensure the standard Tailwind directives are added to the application stylesheet.

## React Components

Once all installation steps are complete you simply import the components into your React application and configure the props:

```js
import { Button } from 'tw-varants-ui';

const MyComponent = () => {
  return (
    <Button color="primary" fullWidth>
      Click Me!
    </Button>
  );
};
```

## Development

### Local development

To develop locally Storybook is used. You will need to start up the tests in watch mode as well as Storybook itself. They need to run separately so use two terminal windows:

```bash
npm run storybook:test
```

```bash
npm run dev
```

This will start Storybook on a new browser tab. You can then browse through the components and see how they look and work.

To make changes to the components, you will need to edit the files in the `src` directory. Once you have made your changes, save the files and Storybook will automatically reload.

### Overview of scripts

The following npm scripts are available for developing locally:

- `generate:component`: Template out a new component. React only for now.
- `format`: Prettify source code.
- `lint`: Lint source code with eslint.
- `dev`: Start Storybook locally.
- `dev:test`: Runs Storybook test suite in watch mode for local development (_requires Storybook to be running_).
- `build`: Outputs components, themes and compiled css to dist folder for publishing.
- `release`: Kick off the Release-It process in interactive mode.
- `test`: Test coverage by building and serving Storybook
- `storybook:upgrade`: Run Storybook upgrade script.
- `check-deps`: Interactive upgrade analysis for all dependencies.
