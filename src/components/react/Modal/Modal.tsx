import { ComponentPropsWithRef, forwardRef, type PropsWithChildren } from 'react';
import { Icon } from '@components/react';
import { modalVariants } from '@common';

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
  const {
    dialog: dialogStyle,
    box: boxStyle,
    header: headerStyle,
    closeButton: closeButtonStyle,
    body: bodyStyle,
    title: titleStyle,
    backdrop: backdropStyle,
    backdropButton: backdropButtonStyle,
  } = modalVariants();

  return (
    <dialog className={dialogStyle()} id={id} {...attrs} ref={ref}>
      <div className={boxStyle()}>
        <form method="dialog" className={headerStyle()}>
          <button className={closeButtonStyle()} aria-label={locale.labelClose}>
            <Icon name="cross" className="stroke-foreground" width={16} />
          </button>
        </form>
        <div className={bodyStyle()}>
          {title && <h2 className={titleStyle()}>{title}</h2>}
          {children}
        </div>
      </div>
      <form method="dialog" className={backdropStyle()} aria-hidden>
        <button className={backdropButtonStyle()} tabIndex={-1}></button>
      </form>
    </dialog>
  );
});
