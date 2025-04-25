import clsx from 'clsx';
import { AllHTMLAttributes, createElement } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  debug?: boolean;
  as?: string;
  ref?: React.RefObject<HTMLElement | null>;
} & Omit<AllHTMLAttributes<HTMLDivElement>, 'className' | 'width' | 'height'>;
const Box = (props: Props) => {
  const {
    children,
    className,
    debug = false,
    as = 'div',
    ref,
    ...restProps
  } = props;

  return createElement(as, {
    ref,
    className: clsx(
      className !== '' ? className : 'flex',

      debug && 'border border-red-500',
    ),
    ...restProps,
    children,
  });
};

Box.displayName = 'Box';

export default Box;
