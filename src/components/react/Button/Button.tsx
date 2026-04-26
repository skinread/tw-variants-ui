import { cloneElement, type ReactElement } from 'react';

import { buttonVariants, type ButtonVariantsWithDocs } from '@common';
import { Icon } from '../Icon/Icon';

type ButtonPropsFiltered = Omit<
  React.ComponentPropsWithRef<'button'>,
  keyof ButtonVariantsWithDocs | 'render' | 'isExternal'
>;

export interface ButtonProps extends ButtonVariantsWithDocs, ButtonPropsFiltered {
  /**
   * React children passthrough for the button content, typically just a string
   */
  children?: React.ReactNode;
  /**
   * Additional classes merged with variant output via tailwind-merge
   */
  className?: string;
  /**
   * Render a different root element (e.g. `<a href="…">` or a router `<Link />`) while keeping button styles.
   */
  render?: ReactElement<{
    className?: string;
    children?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
  }>;
  /**
   * For external links: sets `rel` / `target` and appends an external icon after children (with `render`, typically an anchor).
   */
  isExternal?: boolean;
}

function assignRef<T>(ref: React.Ref<T> | undefined, node: T | null) {
  if (!ref) return;
  if (typeof ref === 'function') ref(node);
  else ref.current = node;
}

/**
 * Styled button, or another element via `render`, with shared variant styles. Exposes intrinsic `<button>` attributes when not using `render`.
 */
export const Button = (props: ButtonProps) => {
  const {
    children,
    color = 'primary',
    fullWidth = false,
    className,
    ref,
    render,
    isExternal,
    ...elemAttrs
  } = props;

  const classes = buttonVariants({ color, fullWidth, class: className });

  if (render) {
    const childRef = render.props.ref;
    const externalAttrs: Record<string, string> = isExternal
      ? { rel: 'noopener noreferrer', target: '_blank' }
      : {};

    return cloneElement(render, {
      ...elemAttrs,
      ...externalAttrs,
      ref: (node: HTMLElement | null) => {
        assignRef(ref, node);
        assignRef(childRef, node);
      },
      className: buttonVariants({
        color,
        fullWidth,
        class: [render.props.className, className].filter(Boolean).join(' ') || undefined,
      }),
      children: (
        <>
          {children ?? render.props.children}
          {isExternal ? <Icon name="external" width={19} /> : null}
        </>
      ),
    } as never);
  }

  return (
    <button ref={ref} className={classes} {...elemAttrs}>
      {children}
    </button>
  );
};
