import { forwardRef, useRef } from 'react';
import { inputVariants, validityFromProps } from '@common';
import { type CommonFieldProps } from '@components/react';
import { FieldFeedback } from '../InputField/FieldFeedback';

type ComponentProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'name'>;

type CommonFieldPropsFiltered = Pick<CommonFieldProps, 'name' | 'hasError' | 'feedbackContent'>;

export interface CheckboxProps extends CommonFieldPropsFiltered, ComponentProps {
  /**
   * Associate a descriptive label with this form element, required for accessibility. Usually a plain string, but also handles JSX content for links, etc.
   */
  label: React.ReactNode;
  /**
   * Pass the `checked` prop for the input to be controlled by React, this will require an `onClick` event handler
   */
  checked?: ComponentProps['checked'];
}

/**
 * Styled checkbox input field. React `ref` enabled. Also exposes intrinsic `<input>` attributes.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function VuiCheckbox(props, ref) {
    const { feedbackContent, hasError, id: idProp, label, ...elemAttrs } = props;
    const {
      wrapper: wrapperStyle,
      label: labelStyle,
      labelText: labelTextStyle,
      input: inputStyle,
    } = inputVariants({ type: 'checkbox', validity: validityFromProps({ hasError }) });

    const id = useRef(idProp ?? `checkbox-${props.name}`);
    const idFeedback = `${id.current}-feedback`;

    return (
      <div className={wrapperStyle()}>
        <div className="flex">
          <label className={labelStyle()}>
            <input type="checkbox" className={inputStyle()} {...elemAttrs} ref={ref} />
            <span className={labelTextStyle()}>{label}</span>
          </label>
        </div>
        <FieldFeedback
          feedbackContent={feedbackContent}
          idFeedback={idFeedback}
          hasError={hasError}
        />
      </div>
    );
  }
);
