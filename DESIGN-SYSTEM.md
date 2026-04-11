# DESIGN SYSTEM for tw-variants-ui (Phase 1 & Phase 2 uplift)

This document captures design-system fundamentals and the uplift plan focusing on tokens, theming, consistency, and packaging. It aligns with using DaisyUI v5 and Tailwind CSS 4 best practices.

## Design tokens and theming
- Introduce a tokens module that exports color, typography, and spacing scales (colors.primary, colors.surface, typography.fontFamily, spacing, radii).
- Expose tokens via a single source (src/tokens/index.js) and map to Tailwind via CSS variables (e.g., --color-primary) used in colors like primary: 'var(--color-primary)'.
- Rely on DaisyUI as the theme provider; do not wrap with new wrappers. Use CSS variables to drive theming while DaisyUI handles component styling.
- Implement a minimal CSS-variable baseline in the Tailwind preset so that utilities refer to CSS vars (e.g., colors.primary -> var(--color-primary)).

## Architecture and data flow
- Source of truth: tokens (src/tokens/index.js / tokens.json later). Components consume tokens via variant compositions in src/common and the Button example (src/common/button.variants.ts).
- Theming: Tailwind preset (src/tailwind-preset.js) defines color tokens via CSS vars and leverages DaisyUI themes (src/themes).
- Generator: New components wired via generator/plopfile.js, updating the component barrel (src/components/react/index.ts).

## Consistency and naming
- Keep component API surface consistent: props, defaults, and docs; align tests with token-driven variants.
- Centralize color/typography/spacing decisions in tokens so all components can share the same design language.

## Publishing and packaging (Phase 2 focus)
- Consider a future monorepo approach with workspaces for core tokens, components, and themes, but keep current single package until the plan stabilizes.
- Enforce conventional commits and maintain a CHANGELOG; ensure explicit exports in package.json.

## Testing and accessibility
- Expand tests to cover token-to-class mappings and basic theme behavior; ensure color contrast and keyboard interactions satisfy WCAG baselines.
- Maintain Storybook docs for tokens and Theme usage.

## Quick win recommendations (Phase 1)
- Add tokens module (src/tokens/index.js) and a minimal token CSS baseline in Tailwind preset.
- Create a DESIGN-SYSTEM.md page and a DESIGN token docs page in Storybook.
- Update AGENTS.md with token-based theming guidance.

Phase 2 milestones (high-level)
- Public API governance, standardized tokens usage, improved exports, accessibility tests, and documentation.
- Prepare packaging strategy (workspaces or clear exports) and CI gates for publishing.
