import { tv, type VariantProps } from 'tailwind-variants';

export const progressVariants = tv({
  base: 'progress rounded-none',
  variants: {
    color: {
      accent: 'progress-accent',
      error: 'progress-error',
      info: 'progress-info',
      success: 'progress-success',
      warning: 'progress-warning',
    },
  },
});

export type ProgressVariants = VariantProps<typeof progressVariants>;
export interface ProgressVariantsWithDocs {
  /**
   * Sets a visual status colour
   */
  color?: ProgressVariants['color'];
}
