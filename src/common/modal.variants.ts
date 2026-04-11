import { tv, type VariantProps } from './tv';

export const modalVariants = tv({
  slots: {
    dialog: 'modal items-end sm:items-center',
    box: 'modal-box flex flex-col rounded-md p-8 pt-6 w-full max-w-none sm:max-w-xl overflow-hidden',
    header: 'flex justify-end',
    closeButton: 'btn btn-xs btn-square btn-ghost',
    body: 'mt-4 overflow-y-auto',
    title: 'font-semibold text-2xl mb-8',
    backdrop: 'modal-backdrop',
    backdropButton: 'cursor-default',
  },
});

export type ModalVariants = VariantProps<typeof modalVariants>;
