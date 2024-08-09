import { forwardRef, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';

import { Icon } from '@components/react';
import { inputVariants, validityFromProps } from '@common';
import { FieldFeedback } from './FieldFeedback';

const localeDefault = {
  passwordReveal: 'show password',
  passwordHide: 'hide password',
};

type ElementProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'name'>;

/**
 * Shared props that should be consistent across types of form field elements
 */
export interface CommonFieldProps {
  /**
   * Associate a descriptive label with this form element, required for accessibility
   */
  label: string;
  /**
   * The name property is not visible, but is expected for a form element to provide a key for the form data. It is also used as fallback to generate the field `id`
   */
  name: string;
  /**
   * Contextual feedback or helper text
   */
  feedbackContent?: React.ReactNode;
  /**
   * JSX slot to pass in info icon or other special content - appears in top-right corner
   */
  infoContent?: React.ReactNode;
  /**
   * JSX slot to pass in any longer descriptive content (self-styled) to associate with field
   */
  descriptionContent?: React.ReactNode;
  /**
   * An ID must be provided if a name is not set or the name is not unique within the page
   */
  id?: string;
  /**
   * Convenience prop to set validity to `error` and insert icon to feedback content
   */
  hasError?: boolean;
  /**
   * Override internal text for localisation, English defaults preset
   */
  localise?: typeof localeDefault;
}

export interface InputFieldProps extends CommonFieldProps, ElementProps {
  /**
   * The placeholder text will appear in the field while it is empty to help instruct the user
   */
  placeholder?: ElementProps['placeholder'];
}

/**
 * Styled input field for text, number, email, password, etc. React `ref` enabled. Also exposes intrinsic `<input>` attributes so
 * it's a good idea to check for attributes that add value but may not be listed in the component props, think about `maxLength`,
 * `autoComplete` [(MDN docs)](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete), `autoCapitalize`
 */
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function VuiInputField(props, ref) {
    const {
      descriptionContent,
      feedbackContent,
      hasError,
      id: idProp,
      infoContent,
      label,
      localise,
      type = 'text',
      ...elemAttrs
    } = props;
    const {
      wrapper: wrapperStyle,
      label: labelStyle,
      labelText: labelTextStyle,
      input: inputStyle,
      descriptionWrapper: descriptionWrapperStyle,
    } = inputVariants({ validity: validityFromProps({ hasError }) });

    const id = useRef(idProp ?? `input-field-${props.name}`);
    const idFeedback = `${id.current}-feedback`;
    const idDescription = `${id.current}-description`;
    const locale = {
      ...localeDefault,
      ...localise,
    };
    const fieldRef = useRef<HTMLInputElement>(null);

    // password-specific --
    const isPassword = useRef(type === 'password');
    const [revealPassword, setRevealPassword] = useState(false);
    const getCurrentType = () => {
      if (isPassword.current && revealPassword) return 'text';
      return type;
    };
    const toggleRevealPassword = () => {
      setRevealPassword(!revealPassword);

      // manage the focus and caret position after toggling visibility
      // doesn't require a useEffect hook since it's responding only to user interaction
      setTimeout(() => {
        fieldRef.current?.focus();
        fieldRef.current?.setSelectionRange(99, 99);
      });
    };
    const RevealButton = () => {
      return (
        <button
          className="-ml-11"
          aria-label={revealPassword ? locale.passwordHide : locale.passwordReveal}
          onClick={toggleRevealPassword}
          type="button"
        >
          <Icon name={revealPassword ? 'eye' : 'eye-crossed'} width={28} />
        </button>
      );
    };
    // --- end password-specific

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
        <div className="flex">
          <input
            type={getCurrentType()}
            id={id.current}
            className={inputStyle({ class: 'w-full', hasToggle: isPassword.current })}
            aria-labelledby={feedbackContent ? idFeedback : undefined}
            aria-describedby={descriptionContent ? idDescription : undefined}
            {...elemAttrs}
            ref={mergeRefs([fieldRef, ref])}
          />
          {isPassword.current && <RevealButton />}
        </div>
        <FieldFeedback
          feedbackContent={feedbackContent}
          idFeedback={idFeedback}
          hasError={hasError}
        />
        <Description />
      </div>
    );
  }
);
