import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { Autocomplete, type Option } from './Autocomplete';

const fruits = [
  {
    label: 'Apple',
    value: 'a',
  },
  {
    label: 'Banana',
    value: 'b',
  },
  {
    label: 'Cherries',
    value: 'c',
  },
  {
    label: 'Dragon Fruit',
    value: 'e',
  },
  {
    label: 'Grapefruit',
    value: 'g',
  },
  {
    label: 'Mango',
    value: 'm',
  },
  {
    label: 'Orange',
    value: 'o',
  },
  {
    label: 'Kiwi',
    value: 'k',
  },
  {
    label: 'Rasperries',
    value: 'r',
  },
];

const meta = {
  title: 'React/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fruit: Story = {
  args: {
    label: 'Fruit',
    options: fruits,
    name: 'demo-fruit-field',
    placeholder: 'Start typing',
  },
};

export const Invalid: Story = {
  args: {
    ...Fruit.args,
    hasError: true,
    feedbackContent: 'Fruit is required',
  },
};

/**
 * Open this story directly to observe automated test
 */
export const InteractionTest: Story = {
  args: Fruit.args,
  decorators: [
    (Story) => (
      <form>
        <Story />
      </form>
    ),
  ],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText<HTMLInputElement>(args.label, { selector: 'input' });

    async function doSelectOption(input: HTMLInputElement, option: Option) {
      const { label, value } = option;
      await userEvent.type(input, value, { delay: 50 });
      await userEvent.keyboard('[ArrowDown][Enter]', { delay: 50 });
      await expect(input).toHaveValue(label);
    }

    let option = args.options[1];
    await step(`Select ${option?.label}`, async () => {
      await doSelectOption(input, option!);
    });

    await step('Clear field', async () => {
      await userEvent.clear(input);
      await expect(input).toHaveValue('');
    });

    option = args.options[0];
    await step(`Select ${option?.label}`, async () => {
      await doSelectOption(input, option!);
    });
  },
};
