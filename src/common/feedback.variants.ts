import { tv, type VariantProps } from './tv';

export const feedbackVariants = tv({
  slots: {
    container: 'alert p-4 border-0 border-l-[6px] rounded-md',
    icon: 'w-8 h-8',
    text: 'text-foreground [overflow-wrap:anywhere] pt-1',
  },
  variants: {
    color: {
      error: {
        container: 'alert-error bg-error/15 border-error',
        icon: 'fill-error',
      },
      info: {
        container: 'alert-info bg-info/20 border-info',
        icon: 'fill-info',
      },
      success: {
        container: 'alert-success bg-success/20 border-success',
        icon: 'fill-success',
      },
      warning: {
        container: 'alert-warning bg-warning/15 border-warning',
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
