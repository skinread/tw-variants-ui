import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent } from '@storybook/test';

import { TextArea } from './TextArea';

const meta = {
  title: 'React/Text Area',
  component: TextArea,
  tags: ['autodocs'],
  args: {
    label: 'Tell me a story',
    name: 'demo-textarea-field',
    placeholder: 'Once upon a time...',
  },
  argTypes: {
    onChange: { action: 'change' },
    onFocus: { action: 'focus' },
    onBlur: { action: 'blur' },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const InteractionTest: Story = {
  args: {
    name: 'interaction-test',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByRole('textbox');

    await step('Initial state', async () => {
      await expect(field).toHaveAttribute('name', args.name);
      await expect(field).toHaveAttribute('id', `text-area-${args.name}`);
      await expect(field).toHaveValue('');
    });

    await step('Focus on field', async () => {
      await userEvent.click(field);
      await expect(args.onFocus).toHaveBeenCalled();
    });

    await step('Sample input', async () => {
      const content = 'Hello, happy testing!';
      await userEvent.type(field, content);
      await expect(args.onChange).toHaveBeenCalledTimes(content.length);
    });

    await step('Remove focus from field', async () => {
      await userEvent.keyboard('[Tab]');
      await expect(args.onBlur).toHaveBeenCalled();
    });
  },
};
