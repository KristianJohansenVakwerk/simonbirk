'use client';

import Box from '@components/shared/ui/Box/Box';
import Text from '@components/shared/ui/Text/Text';
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { formatDate } from '@/utils/utils';

type Props = {
  title: string;
  year: string;
  index: number;
  parentWidth: number;
  ref: any;
};

export const MenuItemTexts = (props: Props) => {
  const { title, year, index, parentWidth, ref } = props;
  const [scrolledPassed, setScrolledPassed] = useState(false);

  const handleSticky = useCallback(
    (isSticky: boolean, index: number, type: 'year' | 'title') => {
      if (type === 'title' && isSticky) {
        setScrolledPassed(true);
      } else {
        setScrolledPassed(false);
      }
    },
    [index],
  );

  return (
    <>
      <Box
        className={'grid h-full cursor-pointer grid-cols-3 hover:text-hover'}
        style={{ visibility: !scrolledPassed ? 'visible' : 'hidden' }}
      >
        <Box className={'col-span-2'}>
          <MenuItemSticky
            index={index}
            handleSticky={handleSticky}
            type={'year'}
          >
            {title}
          </MenuItemSticky>
        </Box>
        <Box className={'col-span-1 flex items-end justify-end pr-1'}>
          <span ref={ref ? ref : null}>
            <MenuItemSticky
              index={index}
              handleSticky={handleSticky}
              type={'title'}
            >
              {formatDate(year)}
            </MenuItemSticky>
          </span>
        </Box>
      </Box>

      <Box
        className={'absolute left-0 top-0 z-10 col-span-3'}
        style={{ visibility: scrolledPassed ? 'visible' : 'hidden' }}
      >
        <Box
          className={'fixed grid grid-cols-3 hover:text-hover'}
          style={{ top: `calc(${index * 15}px + 75px)`, width: parentWidth }}
        >
          <Box className={'col-span-2'}>
            <Text>{title}</Text>
          </Box>
          <Box className={'col-span-1 flex items-end justify-end pr-1'}>
            <Text>{formatDate(year)}</Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export const MotionBox = motion.create(Box);

export default MenuItemTexts;

const MenuItemSticky = ({
  children,
  className = '',
  index,
  handleSticky,
  type,
}: {
  children: React.ReactNode;
  className?: string;
  index: number;
  handleSticky: (
    isSticky: boolean,
    index: number,
    type: 'year' | 'title',
  ) => void;
  type: 'year' | 'title';
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const initialPosRef = useRef<number | null>(null);
  const spacer = 15;
  const topOffset = 75;

  useEffect(() => {
    if (ref.current && !initialPosRef.current) {
      initialPosRef.current =
        ref.current.getBoundingClientRect().top + window.scrollY;
    }
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (ref.current && initialPosRef?.current) {
            const scrollPosition = window.scrollY;

            setIsSticky(
              scrollPosition >=
                initialPosRef.current - (index * spacer + topOffset),
            );
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Check if the element is sticky and call the handleSticky function to update the view of the index item
    if (isSticky) {
      handleSticky(true, index, type);
    } else {
      handleSticky(false, index, type);
    }
  }, [isSticky]);

  return (
    <div
      style={{
        position: isSticky ? 'fixed' : 'static',
        top: `calc(${index * spacer}px + ${topOffset}px)`,
      }}
    >
      <Text
        ref={ref}
        className={clsx(className)}
      >
        {children}
      </Text>
    </div>
  );
};
