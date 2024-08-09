import { tv, type VariantProps } from 'tailwind-variants';

export const toggleVariants = tv({
  slots: {
    container: 'join w-full',
    button:
      'btn bg-white border-2 flex-grow join-item text-lg font-normal sm:px-[74px] checked:font-semibold',
  },
  variants: {
    color: {
      primary: {
        button:
          'text-primary border-primary hover:border-primary [--my-bg-active:var(--vui-color-primary)]',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

export type ToggleVariants = VariantProps<typeof toggleVariants>;
export interface ToggleVariantsWithDocs {
  /**
   * Set visual toggle appearance
   * @default primary
   */
  color?: ToggleVariants['color'];
}
