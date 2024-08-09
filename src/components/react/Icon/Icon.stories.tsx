import type { Meta, StoryObj } from '@storybook/react';

import { Icon as ReactIcon } from './Icon';

const meta = {
  title: 'React/Icon',
  component: ReactIcon,
  tags: ['autodocs'],
  args: {
    name: undefined,
    className: 'fill-primary stroke-primary',
    width: 100,
  },
} satisfies Meta<typeof ReactIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icon: Story = {
  args: {
    name: 'info',
  },
};
