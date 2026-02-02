import clsx from 'clsx';
import Box from '../Box/Box';
import { getTextSize } from './TextUtils';

type Props = {
  children: React.ReactNode;
  className?: string;
  debug?: boolean;
  as?: string;
  size?: 'base' | 'xl';
  ref?: React.RefObject<HTMLElement | null>;
};
const Text = (props: Props) => {
  const {
    children,
    className,
    size = 'base',
    debug = false,
    as = 'p',
    ref,
  } = props;

  return (
    <Box
      ref={ref}
      className={clsx([
        `gap-0 font-sans leading-none capsize`,
        getTextSize(size),
        className,
      ])}
      debug={debug}
      as={as}
    >
      {children}
    </Box>
  );
};

export default Text;
