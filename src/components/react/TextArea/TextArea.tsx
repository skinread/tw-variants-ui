import { forwardRef, useRef } from 'react';
import { inputVariants, validityFromProps } from '@common';
import { type CommonFieldProps } from '@components/react';

type TextAreaPropsFiltered = Omit<React.ComponentPropsWithoutRef<'textarea'>, 'name'>;

export interface TextAreaProps
  extends Pick<CommonFieldProps, 'label' | 'name' | 'hasError' | 'id'>,
    TextAreaPropsFiltered {
  /**
   * The placeholder text will appear in the field while it is empty to help instruct the user
   */
  placeholder?: string;
}

/**
 * Styled text area input field. React `ref` enabled.
 * Also exposes intrinsic `<textarea>` attributes.
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function VuiTextArea(props, ref) {
    const { hasError, id: idProp, label, ...elemAttrs } = props;
    const {
      wrapper: wrapperStyle,
      label: labelStyle,
      labelText: labelTextStyle,
      input: inputStyle,
    } = inputVariants({ type: 'textarea', validity: validityFromProps({ hasError }) });
    const id = useRef(idProp ?? `text-area-${props.name}`);

    return (
      <div className={wrapperStyle()}>
        <label className={labelStyle()} htmlFor={id.current}>
          <span className={labelTextStyle()}>{label}</span>
        </label>
        <textarea id={id.current} className={inputStyle()} {...elemAttrs} ref={ref}></textarea>
      </div>
    );
  }
);
