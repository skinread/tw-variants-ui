import { tv, type VariantProps } from 'tailwind-variants';

export const feedbackVariants = tv({
  slots: {
    container: 'alert p-4 border-0 border-l-[6px] rounded-md',
    icon: 'w-8 h-8',
    text: 'text-foreground [overflow-wrap:anywhere] pt-1',
  },
  variants: {
    color: {
      error: {
        container: 'alert-error bg-red-light-3 border-error',
        icon: 'fill-error',
      },
      info: {
        container: 'alert-info bg-blue-light-3 border-info',
        icon: 'fill-info',
      },
      success: {
        container: 'alert-success bg-green-light-3 border-success',
        icon: 'fill-success',
      },
      warning: {
        container: 'alert-warning bg-orange-light-3 border-warning',
        icon: 'fill-warning',
      },
    },
  },
  defaultVariants: {
    color: 'info',
  },
});

export type FeedbackVariants = VariantProps<typeof feedbackVariants>;
export interface FeedbackVariantsWithDocs {
  /**
   * Set visual feedback appearance by message type
   */
  color?: FeedbackVariants['color'];
}
