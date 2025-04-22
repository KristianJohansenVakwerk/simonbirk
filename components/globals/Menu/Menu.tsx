"use client";
import Box from "@components/shared/ui/Box/Box";
import MenuItemTexts from "./MenuItemTexts";

type Props = {
  data: {
    title: string;
    year: string;
    img: string;
  }[];
};
export const Menu = (props: Props) => {
  const { data } = props;
  return (
    <>
      {data.map((item, index) => (
        <Box
          key={item.title + index}
          className="grid grid-cols-6 mb-2 last:mb-0 justify-between"
        >
          <MenuItemTexts title={item.title} year={item.year} index={index} />
          <Box className={"col-span-3"}>
            <img
              src={item.img}
              alt={item.title}
              width={245}
              height={311}
              className="w-full h-full object-cover"
            />
          </Box>
        </Box>
      ))}
    </>
  );
};

export default Menu;
