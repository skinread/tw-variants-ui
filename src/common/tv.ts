import { createTV, type VariantProps } from 'tailwind-variants';

/**
 * Configured tailwind-variants instance with tailwind-merge enabled.
 * Import tv from here (not directly from 'tailwind-variants') so that
 * className overrides passed via the `class` prop are conflict-resolved
 * correctly by tailwind-merge.
 */
export const tv = createTV({
  twMergeConfig: {},
});

export type { VariantProps };
