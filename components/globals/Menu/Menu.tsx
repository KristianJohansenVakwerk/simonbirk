'use client';
import Box from '@components/shared/ui/Box/Box';
import MenuItemTexts from './MenuItemTexts';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { QueryProjectsResult } from '@/sanity/types/sanity.types';
import CustomImage from '@/components/shared/ui/Image/Image';

type Props = {
  data: QueryProjectsResult | null;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
  handleClick: (url: string) => void;
  activeIndex: number | null;
};
export const Menu = (props: Props) => {
  const { data, handleMouseEnter, handleMouseLeave, handleClick, activeIndex } =
    props;
  const [parentWidth, setParentWidth] = useState(0);
  const parentRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    titleRefs.current = data?.map(() => null) || [];
  }, [data]);

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
      {data?.map((item, index) => {
        return (
          <Box
            key={item._id}
            className={clsx([
              'relative mb-2 grid cursor-pointer grid-cols-6 justify-between transition-colors duration-300 last:mb-0 hover:text-hover',
              activeIndex === index && 'text-hover',
            ])}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() =>
              handleClick(`/projects/${item?.slug?.current}` || '')
            }
          >
            <Box className={'col-span-3'}>
              <MenuItemTexts
                title={item?.title || ''}
                year={item?.year || ''}
                index={index}
                parentWidth={parentWidth}
                ref={(el: HTMLDivElement | null) =>
                  (titleRefs.current[index] = el)
                }
              />
            </Box>
            <Box
              ref={parentRef}
              className={'col-span-3'}
            >
              <CustomImage
                asset={item?.thumbnail}
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
