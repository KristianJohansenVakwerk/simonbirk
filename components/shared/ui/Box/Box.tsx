import clsx from "clsx";
import { createElement } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  debug?: boolean;
  as?: string;
};
const Box = (props: Props) => {
  const { children, className, debug = false, as = "div" } = props;

  return createElement(as, {
    className: clsx("flex", className, debug && "border border-red-500"),
    children,
  });
};

export default Box;
