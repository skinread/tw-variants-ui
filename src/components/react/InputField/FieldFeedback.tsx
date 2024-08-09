import { isValidElement } from 'react';
import { Icon } from '@components/react';
import { inputVariants, validityFromProps } from '@common';

interface FieldFeedbackProps {
  feedbackContent?: React.ReactNode;
  idFeedback?: string;
  hasError?: boolean;
}

export const FieldFeedback = ({ feedbackContent, idFeedback, hasError }: FieldFeedbackProps) => {
  if (!feedbackContent) return null;

  const hasIcon = hasError && !isValidElement(feedbackContent);
  const { feedback: feedbackStyle, feedbackIcon: feedbackIconStyle } = inputVariants({
    validity: validityFromProps({ hasError }),
  });

  return (
    <label className={feedbackStyle({ class: [hasIcon && 'flex'] })} id={idFeedback}>
      {hasIcon && (
        <div className="-mt-0.5">
          <Icon name="exclamation" className={feedbackIconStyle()} />
        </div>
      )}
      {feedbackContent}
    </label>
  );
};
