import { buttonVariants, type ButtonVariantsWithDocs } from '@common';

type ButtonPropsFiltered = Omit<
  React.ComponentPropsWithoutRef<'button'>,
  keyof ButtonVariantsWithDocs
>;

export interface ButtonProps extends ButtonVariantsWithDocs, ButtonPropsFiltered {
  /**
   * React children passthrough for the button content, typically just a string
   */
  children: React.ReactNode;
  /**
   * Not recommended, className override does not yet merge with tailwind-variants as expected
   */
  className?: string;
}

/**
 * Styled button element. For navigation link buttons use Button Link. Also exposes intrinsic `<button>` attributes.
 */
export const Button = (props: ButtonProps) => {
  const { children, color = 'primary', fullWidth = false, ...elemAttrs } = props;

  return (
    <button className={buttonVariants({ color, fullWidth })} {...elemAttrs}>
      {children}
    </button>
  );
};
