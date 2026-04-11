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
  const { children, color = 'primary', fullWidth = false, className, ...elemAttrs } = props;

  return (
    <button className={buttonVariants({ color, fullWidth, class: className })} {...elemAttrs}>
      {children}
    </button>
  );
};
