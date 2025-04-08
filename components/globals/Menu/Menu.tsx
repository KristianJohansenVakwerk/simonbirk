"use client";

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
    <div className={""}>
      {data.map((item, index) => (
        <div key={item.title + index} className="flex gap-1 mb-1">
          <div className="w-1/2" style={{ aspectRatio: 245 / 311 }}>
            <MenuItemTexts index={index} title={item.title} year={item.year} />
          </div>
          <div className="w-1/2">
            <img
              src={item.img}
              alt={item.title}
              width={245}
              height={311}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
