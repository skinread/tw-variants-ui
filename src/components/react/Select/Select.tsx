import { forwardRef, useRef } from 'react';
import { inputVariants, validityFromProps } from '@common';
import { type CommonFieldProps } from '@components/react';
import { FieldFeedback } from '../InputField/FieldFeedback';

type SelectPropsFiltered = Omit<React.ComponentPropsWithoutRef<'select'>, 'name' | 'localise'>;

export interface SelectProps extends CommonFieldProps, SelectPropsFiltered {
  /**
   * Array of labels and values as choices `{ label: "Option 1", value: "1"}`
   */
  options: {
    label: string;
    value: string;
  }[];
  /**
   * Place an optional zero-state entry in the input as a helpful text prompt
   */
  placeholder?: string;
  /**
   * Preselect an initial value in the select box
   */
  defaultValue?: SelectPropsFiltered['defaultValue'];
}

/**
 * Styled select box populated with an array. React `ref` enabled. Also exposes intrinsic `<select>` attributes.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function VuiSelect(props, ref) {
  const {
    defaultValue = '',
    descriptionContent,
    feedbackContent,
    hasError,
    id: idProp,
    infoContent,
    label,
    options,
    placeholder,
    ...elemAttrs
  } = props;
  const {
    wrapper: wrapperStyle,
    label: labelStyle,
    labelText: labelTextStyle,
    input: inputStyle,
    descriptionWrapper: descriptionWrapperStyle,
  } = inputVariants({ type: 'select', validity: validityFromProps({ hasError }) });

  const id = useRef(idProp ?? `select-box-${props.name}`);
  const idFeedback = `${id.current}-feedback`;
  const idDescription = `${id.current}-description`;

  const Description = () => {
    if (!descriptionContent) return null;

    return (
      <div className={descriptionWrapperStyle()} id={idDescription}>
        {descriptionContent}
      </div>
    );
  };

  return (
    <div className={wrapperStyle()}>
      <label className={labelStyle()} htmlFor={id.current}>
        <span className={labelTextStyle()}>{label}</span>
        {infoContent && <span>{infoContent}</span>}
      </label>
      <select
        id={id.current}
        className={inputStyle()}
        defaultValue={defaultValue}
        aria-labelledby={feedbackContent ? idFeedback : undefined}
        aria-describedby={descriptionContent ? idDescription : undefined}
        {...elemAttrs}
        ref={ref}
      >
        {placeholder && (
          <option value="" disabled className="text-red-700">
            {placeholder}
          </option>
        )}
        {options.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldFeedback
        feedbackContent={feedbackContent}
        idFeedback={idFeedback}
        hasError={hasError}
      />
      <Description />
    </div>
  );
});
