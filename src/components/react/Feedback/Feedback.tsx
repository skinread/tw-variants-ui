import { feedbackVariants, type FeedbackVariantsWithDocs } from '@common';
import { Icon, type FeedbackIcons } from '@components/react';

export interface FeedbackProps extends FeedbackVariantsWithDocs {
  /**
   * The feedback message content passthrough. Prefer text string or string array to JSX children
   */
  children: React.ReactNode | string[];
  /**
   * Icon to display
   */
  iconName?: FeedbackIcons;
  /**
   * Please remember to add an aria live attribute if the feedback is dynamically rendered
   */
  'aria-live'?: React.HTMLAttributes<HTMLDivElement>['aria-live'];
}

/**
 * Feedback component for consistent alert messages. If the feedback is shown conditionally,
 * please use the `aria-live` attribute to ensure screen readers announce the message.
 */
export const Feedback = (props: FeedbackProps) => {
  const { children, color, iconName = 'exclamation' } = props;
  const {
    container: containerStyle,
    icon: iconStyle,
    text: textStyle,
  } = feedbackVariants({ color });

  const Message = () => {
    if (typeof children === 'string') return <p>{children}</p>;
    // just a little custom logic to handle arrays of strings
    if (Array.isArray(children) && children.every((child) => typeof child === 'string')) {
      return children.map((text) => <p key={text.substring(0, 2)}>{text}</p>);
    }

    return children;
  };

  return (
    <div className={containerStyle()}>
      <Icon name={iconName} className={iconStyle()} />
      <div className={textStyle()}>
        <Message />
      </div>
    </div>
  );
};
