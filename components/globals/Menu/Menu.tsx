'use client';
import Box from '@components/shared/ui/Box/Box';
import MenuItemTexts from './MenuItemTexts';
import { useCallback, useState } from 'react';
import clsx from 'clsx';

type Props = {
  data: {
    title: string;
    year: string;
    img: string;
  }[];
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
  activeIndex: number | null;
};
export const Menu = (props: Props) => {
  const { data, handleMouseEnter, handleMouseLeave, activeIndex } = props;

  return (
    <>
      {data.map((item, index) => (
        <Box
          key={item.title + index}
          className={clsx([
            'mb-2 grid cursor-pointer grid-cols-6 justify-between transition-colors duration-300 last:mb-0 hover:text-hover',
            activeIndex === index && 'text-hover',
          ])}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          debug
        >
          <MenuItemTexts
            title={item.title}
            year={item.year}
            index={index}
          />
          <Box className={'col-span-3'}>
            <img
              src={item.img}
              alt={item.title}
              width={245}
              height={311}
              className="h-full w-full object-cover"
            />
          </Box>
        </Box>
      ))}
    </>
  );
};

export default Menu;
