import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { Button } from '@components/react';
import { Modal } from './Modal';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'React/Modal',
  component: Modal,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    id: undefined,
    title: 'Modal title',
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: <p>Press ESC key or click outside to close</p>,
    id: 'modal-demo-basic',
  },
  decorators: [
    (Story) => (
      <div>
        <Button
          onClick={() => {
            (document.getElementById('modal-demo-basic') as HTMLDialogElement).showModal();
          }}
        >
          Open demo
        </Button>
        <Story />
      </div>
    ),
  ],
};

const triggerText = 'Modal trigger';
export const InteractionTest: Story = {
  args: {
    ...Basic.args,
    id: 'interaction-test',
  },
  decorators: [
    (Story) => (
      <div>
        <Button
          onClick={() => {
            (document.getElementById('interaction-test') as HTMLDialogElement).showModal();
          }}
        >
          {triggerText}
        </Button>
        <Story />
      </div>
    ),
  ],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText(triggerText);
    const modal = canvas.getByRole('dialog');
    const closeButton = canvas.getByLabelText('close modal');

    async function clickWithDelay(e: Element) {
      await userEvent.click(e);
      await new Promise((resolve) => setTimeout(resolve, 330));
    }

    await step('Initial state', async () => {
      await expect(modal).not.toBeVisible();
    });

    await step('Display modal', async () => {
      await clickWithDelay(button);
      await expect(modal).toBeVisible();
      await expect(modal).toHaveTextContent(args.title!);
      await expect(modal).toHaveTextContent(modal.getElementsByTagName('p')[0]!.textContent!);
      await expect(closeButton).toHaveFocus();
    });

    await step('Close modal', async () => {
      await clickWithDelay(closeButton);
      await expect(modal).not.toBeVisible();
    });
  },
};
