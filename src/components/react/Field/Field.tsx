import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { Icon } from '../Icon/Icon';
import { inputVariants, validityFromProps } from '@common';
import { FieldFeedback } from '../InputField/FieldFeedback';

const localeDefault = {
  passwordReveal: 'show password',
  passwordHide: 'hide password',
};

type ElementProps = Omit<React.ComponentPropsWithRef<'input'>, 'name'>;

/**
 * Shared props that should be consistent across types of form field elements.
 * `label` is optional on `Field.Input` when using the compound API with `Field.Label`.
 */
export interface CommonFieldProps {
  label?: string;
  name: string;
  feedbackContent?: React.ReactNode;
  infoContent?: React.ReactNode;
  descriptionContent?: React.ReactNode;
  id?: string;
  hasError?: boolean;
  localise?: typeof localeDefault;
}

/** Props for `Field.Input` (compound) or full `InputField`-style usage */
export type FieldInputProps = Partial<CommonFieldProps> &
  ElementProps & {
    placeholder?: ElementProps['placeholder'];
  };

interface FieldContextValue {
  name: string;
  fieldId: string;
  idFeedback: string;
  idDescription: string;
  hasError?: boolean;
  hasFeedbackSlot: boolean;
  setHasFeedbackSlot: (v: boolean) => void;
  hasDescriptionSlot: boolean;
  setHasDescriptionSlot: (v: boolean) => void;
}

const FieldContext = createContext<FieldContextValue | null>(null);

function useFieldContext() {
  const ctx = useContext(FieldContext);
  if (!ctx) throw new Error('Field subcomponents must be used inside <Field>');
  return ctx;
}

function assignRef<T>(ref: React.Ref<T> | undefined, node: T | null) {
  if (!ref) return;
  if (typeof ref === 'function') ref(node);
  else (ref as React.MutableRefObject<T | null>).current = node;
}

const FIELD_INPUT_META = [
  'descriptionContent',
  'feedbackContent',
  'label',
  'infoContent',
  'hasError',
  'id',
] as const;

function stripFieldMeta(props: FieldInputProps) {
  const next = { ...props } as Record<string, unknown>;
  for (const k of FIELD_INPUT_META) {
    delete next[k];
  }
  return next as Omit<FieldInputProps, (typeof FIELD_INPUT_META)[number]>;
}

export interface FieldRootProps {
  name: string;
  id?: string;
  hasError?: boolean;
  children: ReactNode;
}

function FieldRoot({ name, id: idProp, hasError, children }: FieldRootProps) {
  const id = useRef(idProp ?? `input-field-${name}`);
  const [hasFeedbackSlot, setHasFeedbackSlot] = useState(false);
  const [hasDescriptionSlot, setHasDescriptionSlot] = useState(false);

  const ctx: FieldContextValue = {
    name,
    fieldId: id.current,
    idFeedback: `${id.current}-feedback`,
    idDescription: `${id.current}-description`,
    hasError,
    hasFeedbackSlot,
    setHasFeedbackSlot,
    hasDescriptionSlot,
    setHasDescriptionSlot,
  };

  const { wrapper: wrapperStyle } = inputVariants({
    validity: validityFromProps({ hasError }),
  });

  return (
    <FieldContext.Provider value={ctx}>
      <div className={wrapperStyle()}>{children}</div>
    </FieldContext.Provider>
  );
}

export interface FieldLabelProps {
  children: ReactNode;
  infoContent?: ReactNode;
}

function FieldLabel({ children, infoContent }: FieldLabelProps) {
  const { fieldId, hasError } = useFieldContext();
  const { label: labelStyle, labelText: labelTextStyle } = inputVariants({
    validity: validityFromProps({ hasError }),
  });

  return (
    <label className={labelStyle()} htmlFor={fieldId}>
      <span className={labelTextStyle()}>{children}</span>
      {infoContent && <span>{infoContent}</span>}
    </label>
  );
}

function FieldInput(props: FieldInputProps) {
  const ctx = useFieldContext();
  const cleaned = stripFieldMeta(props);
  const { ref, localise, type = 'text', name: nameProp, ...elemAttrs } = cleaned;
  const name = nameProp ?? ctx.name;
  const { input: inputStyle } = inputVariants({
    validity: validityFromProps({ hasError: ctx.hasError }),
  });

  const locale = {
    ...localeDefault,
    ...localise,
  };

  const fieldRef = useRef<HTMLInputElement>(null);
  const setInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      fieldRef.current = node;
      assignRef(ref, node);
    },
    [ref]
  );

  const isPassword = useRef(type === 'password');
  const [revealPassword, setRevealPassword] = useState(false);
  const getCurrentType = () => {
    if (isPassword.current && revealPassword) return 'text';
    return type;
  };

  const toggleRevealPassword = () => {
    setRevealPassword(!revealPassword);
    setTimeout(() => {
      fieldRef.current?.focus();
      fieldRef.current?.setSelectionRange(99, 99);
    });
  };

  const RevealButton = () => (
    <button
      className="-ml-11"
      aria-label={revealPassword ? locale.passwordHide : locale.passwordReveal}
      onClick={toggleRevealPassword}
      type="button"
    >
      <Icon name={revealPassword ? 'eye' : 'eye-crossed'} width={28} />
    </button>
  );

  return (
    <div className="flex">
      <input
        type={getCurrentType()}
        id={ctx.fieldId}
        name={name}
        className={inputStyle({ class: 'w-full', hasToggle: isPassword.current })}
        aria-labelledby={ctx.hasFeedbackSlot ? ctx.idFeedback : undefined}
        aria-describedby={ctx.hasDescriptionSlot ? ctx.idDescription : undefined}
        {...elemAttrs}
        ref={setInputRef}
      />
      {isPassword.current && <RevealButton />}
    </div>
  );
}

FieldInput.displayName = 'Field.Input';

function FieldFeedbackSlot({ children }: { children: ReactNode }) {
  const { setHasFeedbackSlot, idFeedback, hasError } = useFieldContext();

  useLayoutEffect(() => {
    setHasFeedbackSlot(Boolean(children));
    return () => {
      setHasFeedbackSlot(false);
    };
  }, [children, setHasFeedbackSlot]);

  if (children == null || children === false) return null;

  return <FieldFeedback feedbackContent={children} idFeedback={idFeedback} hasError={hasError} />;
}

FieldFeedbackSlot.displayName = 'Field.Feedback';

function FieldDescriptionSlot({ children }: { children: ReactNode }) {
  const { setHasDescriptionSlot, idDescription, hasError } = useFieldContext();
  const { descriptionWrapper: descriptionWrapperStyle } = inputVariants({
    validity: validityFromProps({ hasError }),
  });

  useLayoutEffect(() => {
    setHasDescriptionSlot(Boolean(children));
    return () => {
      setHasDescriptionSlot(false);
    };
  }, [children, setHasDescriptionSlot]);

  if (children == null || children === false) return null;

  return (
    <div className={descriptionWrapperStyle()} id={idDescription}>
      {children}
    </div>
  );
}

FieldDescriptionSlot.displayName = 'Field.Description';

export const Field = Object.assign(FieldRoot, {
  Label: FieldLabel,
  Input: FieldInput,
  Feedback: FieldFeedbackSlot,
  Description: FieldDescriptionSlot,
});
