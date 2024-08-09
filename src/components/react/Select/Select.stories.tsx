import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { Select } from './Select';

const meta = {
  title: 'React/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    label: 'Favourite fruit',
    options: [
      { label: 'Apple', value: 'a' },
      { label: 'Banana', value: 'b' },
      { label: 'Cherries', value: 'c' },
      { label: 'Dragon Fruit', value: 'd' },
      { label: 'Grapefruit', value: 'g' },
      { label: 'Kiwi', value: 'k' },
      { label: 'Mango', value: 'm' },
      { label: 'Orange', value: 'o' },
      { label: 'Raspberries', value: 'r' },
    ],
    name: 'demo-select-box',
    placeholder: 'Choose a fruit',
  },
  argTypes: {
    onChange: {
      action: 'changed',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const DefaultValue: Story = {
  args: {
    name: 'demo-select-box-default',
    defaultValue: 'js',
  },
};

export const Invalid: Story = {
  args: {
    name: 'demo-select-box-invalid',
    feedbackContent: 'Make sure you choose one',
    hasError: true,
  },
};

export const InteractionTest: Story = {
  args: {
    name: 'interaction-test',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');
    const options = canvas.getAllByRole('option');

    await step('Initial state', async () => {
      await expect(options).toHaveLength(args.options.length + 1);
      await expect(select).toHaveTextContent(args.placeholder!);
    });

    await step('Selection', async () => {
      for (const idx of [2, 1, 0]) {
        await userEvent.selectOptions(select, args.options[idx]!.value);
        await expect(args.onChange).toHaveBeenCalled();
        // await expect((options[idx] as HTMLOptionElement).selected).toBe(true);
        await expect(select).toHaveValue(args.options[idx]?.value);
      }
    });

    // Testing Libary doesn't support keyboard navigation yet
    // ref https://github.com/testing-library/user-event/issues/786
    // await step('Keyboard navigation', async () => {
    //   await userEvent.click(select);
    //   await userEvent.keyboard('[ArrowDown][ArrowDown][Enter]');
    // });
  },
};
