# Changelog

All notable changes to this project will be documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `src/tokens/semantic.js` — shared light/dark semantic palettes consumed by `src/tokens/index.js`, `src/themes/custom.js`, and `src/themes/dark.js`
- `src/components/react/Field/Field.tsx` — compound field API: `Field`, `Field.Label`, `Field.Input`, `Field.Feedback`, `Field.Description`
- `Button` — optional `render` element for styled links or other roots; optional `isExternal` for anchors (replaces `ButtonLink`)
- `src/themes/dark.js` — dark semantic palette aligned with token keys
- `src/common/modal.variants.ts` — `modalVariants` with named slots for `dialog`, `box`, `header`, `closeButton`, `body`, `title`, `backdrop`, `backdropButton`
- `src/common/tv.ts` — configured `tailwind-variants` instance with `tailwind-merge` integration; re-exported from `src/common/index.ts`
- `./tokens` sub-path export in `package.json` (`dist/tokens/index.js`)
- `copy:themes` script copies `src/tokens/*` → `dist/tokens/`

### Changed
- **Breaking:** removed `ButtonLink` — use `<Button render={<a href="…" />}>` (or a router `Link`) instead
- `src/tailwind-preset.js` — DaisyUI `themes` list uses only string theme names; `custom` theme variables and component overrides applied via `addBase` on `[data-theme="custom"]` (DaisyUI v5 `themeOption.split` compatibility); `:root` still injects `--color-*` and `--vui-color-*` from the custom palette
- React components use the React 19 `ref`-as-prop pattern (no `forwardRef`); removed `react-merge-refs` dependency
- `src/tokens/index.js` — imports colours from `semantic.js`; typography and spacing unchanged in shape
- All `src/common/*.variants.ts` files — import `tv` from `./tv` (local wrapper) instead of `tailwind-variants` directly
- `src/components/react/Button/Button.tsx` — `className` merged via `buttonVariants` `class` slot; supports `ref`, `render`, `isExternal`
- `src/components/react/Modal/Modal.tsx` — uses `modalVariants` slots instead of inline class strings
- `InputField` — implemented with the `Field` compound components (same public props)

### Removed
- `src/components/react/ButtonLink/`
- `react-merge-refs` dependency

### Fixed
- `var(--vui-color-*)` at `:root` for the default custom palette; Storybook and pages without `data-theme` still resolve semantic colours

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
- Components: Autocomplete, Button, Checkbox, Feedback, Icon, InputField, Modal, RadioButtons, Select, TextArea
- Shared variant system via `tailwind-variants` in `src/common/`
- Multi-theme support via `src/themes/` with six DaisyUI-compatible themes
- Storybook with MDX documentation pages
- Plop-based component generator
