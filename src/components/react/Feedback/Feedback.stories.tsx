import type { Meta, StoryObj } from '@storybook/react';

import { Feedback } from './Feedback';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'React/Feedback',
  component: Feedback,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    children: 'This is error feedback content',
    color: 'error',
    iconName: 'exclamation',
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Feedback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Error: Story = {};

export const Success: Story = {
  args: {
    children: 'Your update has been saved.',
    color: 'success',
    iconName: 'tick-circle',
  },
};
