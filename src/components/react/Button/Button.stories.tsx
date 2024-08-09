import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, fn } from '@storybook/test';

import { Icon } from '@components/react';
import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'React/Button',
  component: Button,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {
    children: 'Press here',
    color: 'primary',
    fullWidth: false,
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    color: 'secondary',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Icon name="info" width={19} className="mr-1" />
        <span>More info</span>
      </>
    ),
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

/**
 * Open this story directly to observe automated test
 */
export const InteractionTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
  },
};
