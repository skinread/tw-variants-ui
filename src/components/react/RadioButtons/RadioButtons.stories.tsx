import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { RadioButtons } from './RadioButtons';

const meta = {
  title: 'React/Radio Buttons',
  component: RadioButtons,
  tags: ['autodocs'],
  args: {
    options: [
      {
        label: 'Option one',
        value: '1',
      },
      {
        label: 'Option two',
        value: '2',
      },
      {
        label: 'Option three',
        value: '3',
      },
    ],
    name: 'demo-radio-buttons',
    hasError: undefined,
  },
  argTypes: {
    onChange: {
      action: 'changed',
    },
  },
} satisfies Meta<typeof RadioButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    defaultChecked: '1',
  },
};

export const InteractionTest: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('radio');

    await step('Initial state', async () => {
      await expect(inputs).toHaveLength(args.options.length);

      for (const [index, input] of inputs.entries()) {
        await expect(input.parentElement).toHaveTextContent(`${args.options[index]?.label}`);
        await expect(input).toHaveAttribute('name', args.name);
        await expect(input).toHaveAttribute('value', args.options[index]?.value);
        await expect(input).not.toBeChecked();
      }
    });

    await step('Checked state', async () => {
      for (const input of inputs) {
        await userEvent.click(input);
        await expect(args.onChange).toHaveBeenCalled();
        await expect(input).toBeChecked();
      }
    });

    await step('Keyboard interaction', async () => {
      await userEvent.keyboard('[ArrowLeft]');
      await expect(args.onChange).toHaveBeenCalled();
      await expect(inputs[0]).toBeChecked();
      await userEvent.keyboard('[ArrowLeft]');
      await expect(args.onChange).toHaveBeenCalled();
      await expect(inputs[1]).toBeChecked();
    });
  },
};
