import { tv, type VariantProps } from 'tailwind-variants';

export const inputVariants = tv({
  slots: {
    wrapper: 'form-control',
    label: 'label items-start px-0',
    labelText: 'label-text text-base',
    input: 'placeholder:text-subtle',
    feedback: 'block leading-5 mt-2 [&>label]:mt-0',
    feedbackIcon: 'w-6 h-6 mr-1.5 mb-0.5',
    descriptionWrapper: 'mt-3',
  },
  variants: {
    type: {
      default: {
        labelText: 'font-bold',
        input: 'input input-primary rounded-[--rounded-field]',
      },
      checkbox: {
        wrapper: 'block my-4',
        label: 'py-0',
        input:
          'checkbox checkbox-primary rounded-md w-[--vui-checkbox-size] h-[--vui-checkbox-size] rounded-[--rounded-field]',
        feedback: 'block mt-1',
      },
      radio: {
        wrapper: 'flex-row',
        input: 'radio radio-primary w-[--vui-radio-size] h-[--vui-radio-size]',
      },
      select: {
        labelText: 'font-bold',
        input:
          'select select-primary text-base min-h-fit rounded-[--rounded-field] [&:has(option[disabled]:default:checked)]:text-subtle',
      },
      textarea: {
        labelText: 'font-bold',
        input: 'textarea textarea-primary text-base rounded-[--rounded-field]',
      },
    },
    validity: {
      error: {
        input: 'border-2',
        feedback: 'text-error fill-error',
      },
      success: {
        feedback: 'text-success fill-success',
      },
      warning: {
        feedback: 'text-warning-content fill-warning-content',
      },
    },
    hasToggle: {
      true: {},
    },
  },
  defaultVariants: {
    type: 'default',
  },
  compoundVariants: [
    {
      // shared by text/numerical input and select fields
      type: ['default', 'select'],
      class: {
        input: 'h-[42px] px-3',
      },
    },
    {
      type: ['default'],
      hasToggle: true,
      class: {
        input: 'pr-12',
      },
    },
    {
      // shared by checkboxes and radio buttons
      type: ['checkbox', 'radio'],
      class: {
        label: 'cursor-pointer',
        labelText: 'ml-2.5',
        input: 'bg-white',
      },
    },
    // --- validity: error ---
    {
      type: 'default',
      validity: 'error',
      class: {
        input: 'input-error',
      },
    },
    {
      type: 'checkbox',
      validity: 'error',
      class: {
        input: 'checkbox-error',
      },
    },
    {
      type: 'radio',
      validity: 'error',
      class: {
        input: 'radio-error',
      },
    },
    {
      type: 'select',
      validity: 'error',
      class: {
        input: 'select-error',
      },
    },
    {
      type: 'textarea',
      validity: 'error',
      class: {
        input: 'textarea-error',
      },
    },
    // --- validity: success ---
    {
      type: 'default',
      validity: 'success',
      class: {
        input: 'input-success',
      },
    },
    {
      type: 'checkbox',
      validity: 'success',
      class: {
        input: 'checkbox-success',
      },
    },
    {
      type: 'radio',
      validity: 'success',
      class: {
        input: 'radio-success',
      },
    },
    {
      type: 'select',
      validity: 'success',
      class: {
        input: 'select-success',
      },
    },
    {
      type: 'textarea',
      validity: 'error',
      class: {
        input: 'textarea-success',
      },
    },
    // --- validity: warning ---
    {
      type: 'default',
      validity: 'warning',
      class: {
        input: 'input-warning',
      },
    },
    {
      type: 'checkbox',
      validity: 'warning',
      class: {
        input: 'checkbox-warning',
      },
    },
    {
      type: 'radio',
      validity: 'warning',
      class: {
        input: 'radio-warning',
      },
    },
    {
      type: 'select',
      validity: 'warning',
      class: {
        input: 'select-warning',
      },
    },
    {
      type: 'textarea',
      validity: 'error',
      class: {
        input: 'textarea-warning',
      },
    },
  ],
});

export type InputVariants = VariantProps<typeof inputVariants>;

/**
 * utility to calculate validity from helper props
 */
export function validityFromProps(props: {
  hasError?: boolean;
  hasSuccess?: boolean;
  hasWarning?: boolean;
  validity?: InputVariants['validity'];
}): InputVariants['validity'] {
  if (props.hasError) return 'error';
  if (props.hasSuccess) return 'success';
  if (props.hasWarning) return 'warning';

  return props.validity;
}

/**
 * Autocomplete combobox overrides and custom slots
 */
export const autocompleteVariants = tv({
  extend: inputVariants,
  slots: {
    input: 'w-full',
    menu: [
      'absolute max-h-60 w-full overflow-auto mt-1',
      'bg-background p-[1px] border-solid border-2 border-grey-200 rounded-btn',
    ],
    item: [
      'flex text-sm px-2 py-1 rounded-btn aria-selected:bg-primary/10',
      'hover:bg-neutral-focus hover:cursor-pointer',
    ],
  },
});
