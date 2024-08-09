import { forwardRef, useRef, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { autocompleteVariants, validityFromProps } from '@common';
import { type InputFieldProps } from '@components/react';
import { FieldFeedback } from '../InputField/FieldFeedback';

export interface AutocompleteProps
  extends Omit<InputFieldProps, 'type' | 'localise' | 'dir' | 'value'> {
  /**
   * Options data
   */
  options: {
    label: string;
    value: string;
  }[];
  /**
   * Custom callback with current value instead of event
   */
  onChangeValue?: (value: string) => void;
  /**
   * Only use value for a controlled input scenario
   */
  value?: InputFieldProps['value'] | null;
}
// we extract the options from the interface because Storybook Autodocs doesn't expand into nested types
type ArrayType<T> = T extends (infer U)[] ? U : never;
export type Options = AutocompleteProps['options'];
export type Option = ArrayType<Options>;

/**
 * Simple implementation of an autocompletion combobox field. Start typing to filter options. React `ref` enabled.
 */
export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  function VuiAutocomplete(props, ref) {
    const {
      defaultValue,
      descriptionContent,
      disabled,
      feedbackContent,
      hasError,
      id: _id,
      infoContent,
      label,
      onChangeValue,
      options,
      value,
      ...elemAttrs
    } = props;
    const {
      wrapper: wrapperStyle,
      label: labelStyle,
      labelText: labelTextStyle,
      input: inputStyle,
      menu: menuStyle,
      item: itemStyle,
      descriptionWrapper: descriptionWrapperStyle,
    } = autocompleteVariants({ type: 'default', validity: validityFromProps({ hasError }) });

    const id = useRef(_id ?? `autocomplete-${props.name}`);
    const idFeedback = `${id.current}-feedback`;
    const idDescription = `${id.current}-description`;
    const [query, setQuery] = useState('');

    const getLabelFromValue = (value: string) => {
      const option = options.find((o) => o.value === value);
      return option?.label ?? '';
    };

    const filteredOptions = () => {
      if (!query.length) return options;

      const filtered = options.filter((item) => {
        // if query is 1 - 3 characters match only the start of the words or value
        if (query.length < 3)
          return (
            item.value.toLowerCase().startsWith(query.toLowerCase()) ||
            !!item.label
              .toLowerCase()
              .split(' ')
              .find((word) => word.startsWith(query.toLowerCase()))
          );
        // else match any characters
        return item.label.toLowerCase().includes(query.toLowerCase());
      });

      return filtered.length ? filtered : options;
    };

    const Description = () => {
      if (!descriptionContent) return null;
      return (
        <div className={descriptionWrapperStyle()} id={idDescription}>
          {descriptionContent}
        </div>
      );
    };

    return (
      <Combobox
        onChange={(value: string) => {
          setQuery(getLabelFromValue(value));
          onChangeValue?.(value);
        }}
        defaultValue={defaultValue}
        disabled={disabled}
        value={value}
        nullable
      >
        <div className={wrapperStyle()}>
          <Combobox.Label className={labelStyle()} htmlFor={id.current}>
            <span className={labelTextStyle()}>{label}</span>
            {infoContent && <span>{infoContent}</span>}
          </Combobox.Label>
          <div className="relative">
            {/**
             * // can be wrapped in the button component to auto-open the menu on focus
             * <Combobox.Button className="w-full">
             **/}
            <Combobox.Input
              className={inputStyle()}
              id={id.current}
              aria-labelledby={feedbackContent ? idFeedback : undefined}
              aria-describedby={descriptionContent ? idDescription : undefined}
              displayValue={(value: string) => getLabelFromValue(value)}
              onChange={(e) => {
                setQuery(e.currentTarget.value);
              }}
              {...elemAttrs}
              ref={ref}
            />
            {/* </Combobox.Button> */}
            <Combobox.Options className={menuStyle()}>
              {filteredOptions().map((option) => (
                <Combobox.Option
                  className={({ active }) => itemStyle({ class: active && 'bg-neutral-focus' })}
                  value={option.value}
                  key={option.value}
                >
                  {option.label}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </div>
          <FieldFeedback
            feedbackContent={feedbackContent}
            idFeedback={idFeedback}
            hasError={hasError}
          />
          <Description />
        </div>
      </Combobox>
    );
  }
);
