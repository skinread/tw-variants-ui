import { forwardRef } from 'react';
import { inputVariants, validityFromProps } from '@common';
import { type CommonFieldProps } from '@components/react';

type RadioButtonsPropsFiltered = Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'name' | 'value' | 'defaultChecked'
>;

type CommonFieldPropsFiltered = Pick<CommonFieldProps, 'name' | 'hasError' | 'id'>;

export interface RadioButtonsProps extends CommonFieldPropsFiltered, RadioButtonsPropsFiltered {
  /**
   * Array of labels and values `{ label: "Option 1", value: "1"}`
   */
  options: {
    label: string;
    value: string;
  }[];
  /**
   * Indicate by the value which item in the options array to preselect
   */
  defaultChecked?: string;
}

/**
 * (Work in progress) Styled radio button group expecting 2 or more options.
 * React `ref` enabled. Also exposes intrinsic `<input>` attributes.
 */
export const RadioButtons = forwardRef<HTMLInputElement, RadioButtonsProps>(
  function VuiRadioButtons(props, ref) {
    const { defaultChecked, hasError, options, ...elemAttrs } = props;
    const {
      wrapper: wrapperStyle,
      label: labelStyle,
      input: inputStyle,
      labelText: labelTextStyle,
    } = inputVariants({ type: 'radio', validity: validityFromProps({ hasError }) });

    return options.map((radio, idx) => (
      <div className={wrapperStyle()} key={idx}>
        <label className={labelStyle()}>
          <input
            type="radio"
            value={radio.value}
            defaultChecked={defaultChecked === radio.value ? true : undefined}
            className={inputStyle()}
            {...elemAttrs}
            ref={ref}
          />
          <span className={labelTextStyle()}>{radio.label}</span>
        </label>
      </div>
    ));
  }
);
