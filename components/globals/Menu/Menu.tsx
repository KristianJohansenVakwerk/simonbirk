'use client';
import Box from '@components/shared/ui/Box/Box';
import MenuItemTexts from './MenuItemTexts';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

type Props = {
  data: {
    title: string;
    year: string;
    img: string;
  }[];
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
  handleClick: () => void;
  activeIndex: number | null;
};
export const Menu = (props: Props) => {
  const { data, handleMouseEnter, handleMouseLeave, handleClick, activeIndex } =
    props;
  const [parentWidth, setParentWidth] = useState(0);
  const parentRef = useRef<HTMLDivElement>(null);

  // Get the width of the parent element to set the width of the fixed text elements based on the image container
  useEffect(() => {
    if (parentRef.current) {
      setParentWidth(parentRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (parentRef.current) {
        setParentWidth(parentRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {data.map((item, index) => {
        const titleRef = useRef<HTMLDivElement>(null);

        return (
          <Box
            key={item.title + index}
            className={clsx([
              'relative mb-2 grid cursor-pointer grid-cols-6 justify-between transition-colors duration-300 last:mb-0 hover:text-hover',
              activeIndex === index && 'text-hover',
            ])}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            <Box className={'col-span-3'}>
              <MenuItemTexts
                title={item.title}
                year={item.year}
                index={index}
                parentWidth={parentWidth}
                ref={titleRef}
              />
            </Box>
            <Box
              ref={parentRef}
              className={'col-span-3'}
            >
              <img
                src={item.img}
                alt={item.title}
                width={245}
                height={311}
                className="h-full w-full object-cover"
              />
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default Menu;
