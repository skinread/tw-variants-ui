import IconArrowBack from '@assets/icon-arrow-back.svg?react';
import IconCross from '@assets/icon-cross.svg?react';
import IconEmail from '@assets/icon-email.svg?react';
import IconExclamation from '@assets/icon-exclamation.svg?react';
import IconExternal from '@assets/icon-external.svg?react';
import IconEyeCrossed from '@assets/icon-eye-crossed.svg?react';
import IconEye from '@assets/icon-eye.svg?react';
import IconInfo from '@assets/icon-info.svg?react';
import IconTick from '@assets/icon-tick-circle.svg?react';

const iconMap = {
  'arrow-back': IconArrowBack,
  cross: IconCross,
  email: IconEmail,
  exclamation: IconExclamation,
  'tick-circle': IconTick,
  external: IconExternal,
  eye: IconEye,
  'eye-crossed': IconEyeCrossed,
  info: IconInfo,
} as const;

export type SvgProps = React.ComponentPropsWithoutRef<'svg'>;
export type AllIcons = keyof typeof iconMap;
export type FeedbackIcons = Extract<AllIcons, 'info' | 'exclamation' | 'email' | 'tick-circle'>;
export type NavigationIcons = Extract<AllIcons, 'arrow-back' | 'info'>;
export interface IconProps extends SvgProps {
  /**
   * shortcut reference name of icon to display
   */
  name: AllIcons;
  className?: SvgProps['className'];
}

/**
 * Convenience component for SVG icon glyphs. Colour is set from `fill` for single colour icons. Size defaults to `1em`
 * or set by `width`/`height` attribute or `className`. Icons are just decorative, they do not have alt text like images.
 */
export const Icon = ({ className, name, ...attrs }: IconProps) => {
  const Svg = iconMap[name];

  let defaultSize = null;
  if (!className && !attrs.width && !attrs.height) defaultSize = 'w-[1em] h-[1em]';

  const svgClassName = ['inline-block', defaultSize, className, `icon-${name}`].join(' ');
  return <Svg className={svgClassName} {...attrs} aria-hidden />;
};
