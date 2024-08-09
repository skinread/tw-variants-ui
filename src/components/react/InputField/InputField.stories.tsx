import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within, userEvent } from '@storybook/test';

import { InputField } from './InputField';
import { Icon } from '../Icon/Icon';
import { Modal } from '../Modal/Modal';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'React/Input Field',
  component: InputField,
  tags: ['autodocs'],
  args: {
    label: 'Enter text',
    name: undefined,
    placeholder: 'Type in here',
    feedbackContent: undefined,
    infoContent: undefined,
    descriptionContent: undefined,
    hasError: undefined,
    localise: undefined,
    id: undefined,
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  argTypes: {
    feedbackContent: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    feedbackContent: 'Optional useful context content here',
    name: 'demo-text-field',
  },
};

export const InvalidText: Story = {
  args: {
    hasError: true,
    feedbackContent: 'Helpful error message content here',
    name: 'demo-invalid-text-field',
  },
};

/**
 * The input field also has a passthrough slot for supplemental content in the top-right corner. This simple demo is just a tooltip. The implementation of the modal overlay is coming soon.
 */
export const AdditionalContent: Story = {
  args: {
    ...Text.args,
    name: 'demo-text-info-field',
    infoContent: (
      <>
        <button
          aria-label="this is a simple tooltip example but any interactivity can be used"
          onClick={() => (document.getElementById('info-modal') as HTMLDialogElement).showModal()}
        >
          <Icon name="info" className="fill-foreground" width={16} />
        </button>
        <Modal id="info-modal" title="Additional information">
          <p>The informative modal content appears here.</p>
          <p>Press ESC key or click outside to close</p>
        </Modal>
      </>
    ),
    descriptionContent: (
      <p className="text-subtle">
        Additional content that helps the user to understand the field and how to correctly populate
        information, provide examples and etc.
      </p>
    ),
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    label: 'Email address',
    name: 'demo-email-field',
    placeholder: 'name@server.com',
    inputMode: 'email',
    autoComplete: 'email',
  },
};

/**
 * Used for a login scenario. For setting password see the Passphrase component which includes strength indicator.
 */
export const Password: Story = {
  args: {
    type: 'password',
    label: 'Password',
    name: 'demo-password-field',
    autoComplete: 'current-password',
    autoCorrect: 'off',
    spellCheck: 'false',
  },
};

/**
 * Technical reference: `onChange` handler is required when the state is controlled
 */
export const ControlledInput: Story = {
  args: {
    ...Text.args,
    value: "can't type here",
    name: 'demo-text-field-controlled',
  },
};

/**
 * Technical reference: `type=number`.
 */
export const Number: Story = {
  args: {
    type: 'number',
    label: 'Add a number',
    name: 'demo-number-field',
    inputMode: 'numeric',
  },
};

/**
 * Technical reference: `type=tel`.
 */
export const Telephone: Story = {
  args: {
    type: 'tel',
    label: 'Phone number',
    name: 'demo-tel-field',
    inputMode: 'tel',
    autoComplete: 'tel',
  },
};

export const Color: Story = {
  args: {
    type: 'color',
    label: 'Select a colour',
    name: 'demo-color-field',
  },
};

/**
 * Technical reference: browser native datepicker `type=date`
 */
export const Date: Story = {
  args: {
    type: 'date',
    label: 'Choose a date',
    name: 'demo-date-field',
    autoComplete: 'bday',
  },
};

// /**
//  * Example only. The disabled state has not been fully implemented, waiting for modern use cases to be indentified
//  */
// export const Disabled: Story = {
//   args: {
//     label: "Can't fill me in",
//     name: 'demo-disabled-field',
//     disabled: true,
//   },
// };

/**
 * Open this story directly to observe automated test
 */
export const InteractionTest: Story = {
  args: {
    name: 'interaction-test',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByRole('textbox');

    await step('Initial state', async () => {
      await expect(field).toHaveAttribute('name', args.name);
      await expect(field).toHaveAttribute('id', `input-field-${args.name}`);
      await expect(canvas.getByText(args.label)).toBeInTheDocument();
      await expect(field).toHaveValue('');
    });

    await step('Focus on field', async () => {
      await userEvent.click(field);
      await expect(args.onFocus).toHaveBeenCalled();
    });

    await step('Sample input', async () => {
      const content = 'hello';
      await userEvent.type(field, content);
      await expect(args.onChange).toHaveBeenCalledTimes(content.length);
    });

    await step('Tab out', async () => {
      await userEvent.keyboard('[Tab]');
      await expect(args.onBlur).toHaveBeenCalled();
    });
  },
};

export const FeedbackContentTest: Story = {
  args: {
    hasError: true,
    label: 'label text',
    name: 'feedback-content-test',
    feedbackContent: 'feedback content',
    infoContent: <i>info content</i>,
    descriptionContent: <p>description content</p>,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const feedback = canvas.getByText(args.feedbackContent as string);

    await expect(feedback).toBeInTheDocument();
    await expect(feedback.firstElementChild).toBeInTheDocument();
    await expect(canvas.getByText('info content')).toBeInTheDocument();
    await expect(canvas.getByText('description content')).toBeInTheDocument();
  },
};

export const PasswordToggleTest: Story = {
  args: {
    type: 'password',
    label: 'Password test',
    name: 'test-password-toggle',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByLabelText(args.label);

    await step('Initial state', async () => {
      const button = canvas.getByRole('button');
      await expect(field).toHaveAttribute('type', 'password');
      await expect(button).toHaveAccessibleName('show password');
    });

    await step('Toggle show/hide', async () => {
      let button = canvas.getByRole('button');
      await userEvent.click(button);
      await expect(field).toHaveAttribute('type', 'text');
      await expect(canvas.getByRole('button')).toHaveAccessibleName('hide password');

      button = canvas.getByRole('button');
      await userEvent.click(button);
      await expect(field).toHaveAttribute('type', 'password');
    });

    await step('Keyboard interaction', async () => {
      await userEvent.keyboard('[Tab][Enter]');
      await expect(field).toHaveFocus();
    });
  },
};
