import { tv, type VariantProps } from 'tailwind-variants';

/**
 * Standard button variant styles
 */
export const buttonVariants = tv({
  base: ['btn', 'text-base', 'h-auto', 'min-h-fit', 'px-2', 'py-2'],
  variants: {
    color: {
      primary: ['btn-primary', 'disabled:opacity-40 disabled:bg-primary disabled:text-white'],
      secondary: [
        'active:bg-primary/30',
        'disabled:opacity-40 disabled:border-primary disabled:text-primary disabled:bg-white',
      ],
    },
    fullWidth: {
      true: 'btn-block',
    },
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
export interface ButtonVariantsWithDocs {
  /**
   * Set visual button appearance
   * @default primary
   */
  color?: ButtonVariants['color'];
  /**
   * Button expands to full width
   * @default false
   */
  fullWidth?: ButtonVariants['fullWidth'];
  /**
   * Button disabled state
   * @default false
   */
}
