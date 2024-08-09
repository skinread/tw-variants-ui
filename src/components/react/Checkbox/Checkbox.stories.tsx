import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';

import { Checkbox } from './Checkbox';

const meta = {
  title: 'React/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    label: 'Yes I agree',
    name: 'demo-checkbox',
    checked: undefined,
    hasError: undefined,
    onChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const LabelWithLink: Story = {
  args: {
    label: (
      <>
        Yes I agree to the{' '}
        <a href="#link" className="link">
          terms and conditions
        </a>
      </>
    ),
    name: 'demo-label-link-checkbox',
  },
};

export const Invalid: Story = {
  args: {
    ...LabelWithLink.args,
    name: 'demo-checkbox-invalid',
    feedbackContent: 'You must agree',
    hasError: true,
  },
};

/**
 * Technical reference: `onChange` handler required when the state is controlled and the `checked` prop should be derived from state
 */
export const ControlledChecked: Story = {
  args: {
    label: 'Can\'t click me. Toggle me in React using the "checked" prop',
    name: 'demo-controlled-checkbox',
    checked: true,
  },
};

/** An storybook story with an interaction test for a input checkbox component */
export const InteractionTest: Story = {
  args: {
    ...LabelWithLink.args,
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('checkbox');
    const label = input.parentElement;

    await step('Initial state', async () => {
      await expect(label).toHaveTextContent('Yes I agree');
      await expect(input).not.toBeChecked();
      await expect(input).toHaveAttribute('name', args.name);
    });

    await step('Checked state', async () => {
      await userEvent.click(label ?? input, { delay: 100 });
      await expect(args.onChange).toHaveBeenCalled();
      await expect(input).toBeChecked();
    });

    await step('Keyboard interaction', async () => {
      await userEvent.keyboard('[Space]', { delay: 100 });
      await expect(args.onChange).toHaveBeenCalled();
      await expect(input).not.toBeChecked();
    });

    await step('Link in label', async () => {
      const link = canvas.getByRole('link');
      await expect(link).toHaveTextContent('terms and conditions');
      await expect(link).toHaveAttribute('href', '#link');
    });
  },
};
