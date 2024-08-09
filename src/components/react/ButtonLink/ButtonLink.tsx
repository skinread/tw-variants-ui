import { buttonVariants } from '@common';
import { Icon, type ButtonProps } from '@components/react';

interface PolymorphicAsProps<E extends React.ElementType> {
  as?: E;
}

// see https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/#create-reusable-utility-polymorphic-types
export type PolymorphicProps<E extends React.ElementType> = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<E> & PolymorphicAsProps<E>
>;

type ButtonPropsFiltered = Pick<ButtonProps, 'children' | 'color' | 'fullWidth' | 'className'>;

export interface ButtonLinkProps extends ButtonPropsFiltered {
  /**
   * Destination URL
   */
  href?: string;
  /**
   * Indicate the link goes to an external domain. Important for meeting accessibility best practice by indicating the external nature of the link with an icon
   */
  isExternal?: boolean;
  /**
   * Setting the target is not recommended in production, there are both secuirty and accessibility implications
   */
  target?: React.HTMLAttributeAnchorTarget;
}

const defaultElement = 'a';

type PolymorphicButtonLinkProps<E extends React.ElementType = typeof defaultElement> =
  ButtonLinkProps & PolymorphicProps<E>;

const externalAttrs = {
  rel: 'noopener noreferrer',
  target: '_blank',
};

/**
 * Button styled anchor tag for navigation links. Compose a custom router link (e.g. React Router <Link>) by using the `as` prop. For non navigation buttons, use the standard Button. Default redners as `<a>` tag.
 */
export function ButtonLink<E extends React.ElementType = typeof defaultElement>(
  props: PolymorphicButtonLinkProps<E>
) {
  const {
    as: Component = defaultElement,
    children,
    color,
    fullWidth = false,
    isExternal,
    ...elemAttrs
  } = props;

  const linkAttrs = isExternal ? { ...externalAttrs, ...elemAttrs } : elemAttrs;

  return (
    <Component className={buttonVariants({ color, fullWidth })} {...linkAttrs}>
      {children}
      {!!isExternal && <Icon name="external" width={19} />}
    </Component>
  );
}
