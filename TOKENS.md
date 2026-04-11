# TOKENS and CSS VARIABLES (Phase 1–Phase 2 uplift)

Design tokens provide a single source of truth for colors, typography, spacing, and radii. This document captures current token shapes and how they map to CSS variables usable by Tailwind 4 + DaisyUI without wrapping DaisyUI.

Token surface
- colors: primary, secondary, surface, text, background, neutral, etc. Values are hex strings.
- fontFamily: a sane default stack compatible with the project.
- spacing: xs, s, m, l, xl mapped to CSS unit values.
- borderRadius: sm, md, lg for components.

CSS variable mapping (Tailwind 4)
- Core tokens exposed as CSS vars on the root, e.g. --color-primary, --color-secondary, --color-surface, --color-text.
- Tailwind config should map color utilities to var(--color-*) where appropriate, and DaisyUI can consume DaisyUI color tokens alongside these vars.

Current wiring (high-level)
- src/tokens/index.js exports tokens object with colors, fontFamily, spacing, borderRadius.
- src/tailwind-preset.js injects a small CSS var baseline into :root using tokens.* values, and also exposes CSS vars for DaisyUI token mapping.
- src/themes/* provide DaisyUI-friendly theme color maps; mapThemeToDaisyUI translates theme colors for DaisyUI tokens.

Usage patterns
- In components, reference tokens via CSS vars for custom styling where you want to unify theming outside of DaisyUI variants.
- For full design-system control, gradually move per-component styling to token-based values and reduce hard-coded colors.

Next steps (Phase 2 focus)
- Expand token surface (typography scales, more spacing, radii) and directly drive Tailwind utilities.
- Add design-system docs to Storybook (Tokens, Theming, API contracts).
- Introduce a minimal ThemeProvider shim that toggles CSS vars or data-theme while relying on DaisyUI as provider.
