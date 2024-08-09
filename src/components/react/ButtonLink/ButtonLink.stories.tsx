import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, fn } from '@storybook/test';

import { ButtonLink } from './ButtonLink';

const meta = {
  title: 'React/Button Link',
  component: ButtonLink,
  tags: ['autodocs'],
  args: {
    href: '#',
    children: 'Go there',
    color: 'primary',
    fullWidth: false,
    isExternal: undefined,
    onClick: fn(),
  },
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Polymorphic: Story = {
  args: {
    as: 'span',
  },
};

export const External: Story = {
  args: {
    children: <span>Go somehwhere else</span>,
    color: 'secondary',
    fullWidth: true,
    href: 'https://github.com/skinread/',
    isExternal: true,
  },
};

/**
 * Open this story directly to observe automated test
 */
export const InteractonTest: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');
    await expect(link.getAttribute('href')).toBe(args.href);
  },
};
