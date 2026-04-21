import { Field, type CommonFieldProps, type FieldInputProps } from '../Field/Field';

type ElementProps = Omit<React.ComponentPropsWithRef<'input'>, 'name'>;

export interface InputFieldProps extends CommonFieldProps, ElementProps {
  label: string;
  placeholder?: ElementProps['placeholder'];
}

export type { CommonFieldProps, FieldInputProps };

/**
 * Styled input field for text, number, email, password, etc. React `ref` enabled. Also exposes intrinsic `<input>` attributes so
 * it's a good idea to check for attributes that add value but may not be listed in the component props, think about `maxLength`,
 * `autoComplete` [(MDN docs)](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete), `autoCapitalize`
 *
 * Implemented with the compound {@link Field} API — prefer `<Field>`, `<Field.Label>`, `<Field.Input>`, etc. for new code.
 */
export function InputField(props: InputFieldProps) {
  const {
    ref,
    label,
    feedbackContent,
    descriptionContent,
    infoContent,
    localise,
    name,
    hasError,
    id,
    type,
    ...elemAttrs
  } = props;

  return (
    <Field name={name} hasError={hasError} id={id}>
      <Field.Label infoContent={infoContent}>{label}</Field.Label>
      <Field.Input
        ref={ref}
        type={type}
        name={name}
        hasError={hasError}
        id={id}
        localise={localise}
        label={label}
        feedbackContent={feedbackContent}
        descriptionContent={descriptionContent}
        infoContent={infoContent}
        {...elemAttrs}
      />
      <Field.Feedback>{feedbackContent}</Field.Feedback>
      <Field.Description>{descriptionContent}</Field.Description>
    </Field>
  );
}
