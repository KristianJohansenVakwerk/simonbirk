const typeSizes = {
  base: "text-base",
  xl: "text-xl",
};

type TextSizesProps = "base" | "xl";

export const getTextSize = (size: TextSizesProps) => {
  return typeSizes[size];
};
