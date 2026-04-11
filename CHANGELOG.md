# Changelog

All notable changes to this project will be documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `src/themes/dark.js` — first-class dark theme wired into DaisyUI as `darkTheme: 'dark'`
- `src/common/modal.variants.ts` — `modalVariants` with named slots for `dialog`, `box`, `header`, `closeButton`, `body`, `title`, `backdrop`, `backdropButton`
- `src/common/tv.ts` — configured `tailwind-variants` instance with `tailwind-merge` integration; re-exported from `src/common/index.ts`
- `./tokens` sub-path export in `package.json` (`dist/tokens/index.js`)
- `copy:themes` script now copies `src/tokens/*` → `dist/tokens/`

### Changed
- `src/tailwind-preset.js` — `:root` block now writes both `--vui-color-*` (public API) and `--color-*` (DaisyUI v5 alias) for all custom theme color keys, plus component vars (`--rounded-field`, `--vui-radio-size`, `--vui-checkbox-size`); replaces the orphaned partial `--color-*` injection that left `var(--vui-color-*)` undefined when no `data-theme` was set
- `src/tokens/index.js` — color values aligned with `src/themes/custom.js` (previously diverged); typography scale and extended spacing/radii added
- All `src/common/*.variants.ts` files — import `tv` from `./tv` (local wrapper) instead of `tailwind-variants` directly
- `src/components/react/Button/Button.tsx` — `className` prop now correctly merged via `class` option passed to `buttonVariants`; stale warning comment removed
- `src/components/react/ButtonLink/ButtonLink.tsx` — same `className` fix as Button
- `src/components/react/Modal/Modal.tsx` — refactored to use `modalVariants` slots instead of inline class strings
- `src/themes/index.js` — `dark` theme added to `themeMap` and `daisyuiThemes`

### Fixed
- `var(--vui-color-*)` was undefined when no `data-theme` attribute was present on the page; now always resolves to the custom (default) theme values
- `className` prop on `Button` and `ButtonLink` previously replaced variant classes rather than merging with them

---

## [0.1.2] — 2025-xx-xx

### Added
- Phase 1: `src/tokens/index.js` — design tokens surface (colors, fontFamily, spacing, borderRadius)
- CSS variable baseline in `src/tailwind-preset.js` wired from tokens

### Changed
- DaisyUI remains the theme provider; no additional wrappers introduced

---

## [0.1.0] — Initial release

- React component library built on Tailwind CSS and DaisyUI
- Components: Autocomplete, Button, ButtonLink, Checkbox, Feedback, Icon, InputField, Modal, RadioButtons, Select, TextArea
- Shared variant system via `tailwind-variants` in `src/common/`
- Multi-theme support via `src/themes/` with six DaisyUI-compatible themes
- Storybook with MDX documentation pages
- Plop-based component generator
