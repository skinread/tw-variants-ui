import { tv, type VariantProps } from 'tailwind-variants';

/**
 * Standard button variant styles
 */
export const buttonVariants = tv({
  base: ['btn', 'no-animation', 'text-base', 'h-auto', 'min-h-fit', 'px-2', 'py-2'],
  variants: {
    color: {
      primary: [
        'btn-primary focus:bg-primary-focus focus:border-primary-focus hover:bg-primary-focus',
        'disabled:opacity-40 disabled:bg-primary disabled:text-white',
      ],
      secondary: [
        'btn-outline text-primary border-primary',
        'hover:bg-primary/10 hover:border-primary hover:text-primary',
        'focus:bg-primary/10 active:bg-primary/30',
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
