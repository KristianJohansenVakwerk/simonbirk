import clsx from "clsx";
import { createElement } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  debug?: boolean;
  as?: string;
  ref?: React.RefObject<HTMLElement | null>;
};
const Box = (props: Props) => {
  const { children, className, debug = false, as = "div", ref } = props;

  return createElement(as, {
    ref,
    className: clsx(
      className !== "" ? className : "flex",
      debug && "border border-red-500"
    ),
    children,
  });
};

export default Box;
