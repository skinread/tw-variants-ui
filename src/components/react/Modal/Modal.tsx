import { ComponentPropsWithRef, forwardRef, type PropsWithChildren } from 'react';
import { Icon } from '@components/react';

const localeDefault = {
  labelClose: 'close modal',
};

type ModalAttributes = PropsWithChildren<ComponentPropsWithRef<'dialog'>>;

export interface ModalProps extends ModalAttributes {
  /**
   * You'll probably need to get the dialog element by id to trigger `showModal()`, unless you're using the shadow DOM. Then use a `ref`.
   */
  id: ModalAttributes['id'];
  /**
   * Optional title text for modal, can be passed through children slot as well
   */
  title?: string;
  /**
   * Content
   */
  children?: ModalAttributes['children'];
  /**
   * Override internal text for localisation, English defaults preset
   */
  localise?: typeof localeDefault;
}

/**
 * The modal component uses the html `<dialog>` element. React `ref` enabled.
 *
 * To trigger the modal it's possible to simply get the element by `id` (or use `ref`) and call the native `showModal()` function.
 * Example usage:
 *
 * ```tsx
 * onClick={() => {
 *  (document.getElementById('modal-id') as HTMLDialogElement)?.showModal();
 * }}
 * ```
 */
export const Modal = forwardRef<HTMLDialogElement, ModalProps>(function VuiModal(props, ref) {
  const { children, id, localise, title, ...attrs } = props;
  const locale = {
    ...localeDefault,
    ...localise,
  };

  return (
    <dialog className="modal items-end sm:items-center" id={id} {...attrs} ref={ref}>
      <div className="modal-box flex flex-col rounded-md p-8 pt-6 w-full max-w-none sm:max-w-xl overflow-hidden">
        <form method="dialog" className="flex justify-end">
          {/* main close button */}
          <button className="btn btn-xs btn-square btn-ghost" aria-label={locale.labelClose}>
            <Icon name="cross" className="stroke-foreground" width={16} />
          </button>
        </form>
        <div className="mt-4 overflow-y-auto">
          {title && <h2 className="font-semibold text-2xl mb-8">{title}</h2>}
          {children}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" aria-hidden>
        {/* clickable background overlay */}
        <button className="cursor-default" tabIndex={-1}></button>
      </form>
    </dialog>
  );
});
