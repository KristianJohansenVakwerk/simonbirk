'use client';

import Box from '@components/shared/ui/Box/Box';
import Text from '@components/shared/ui/Text/Text';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

type Props = {
  title: string;
  year: string;
  index: number;
};

export const MenuItemTexts = (props: Props) => {
  const { title, year, index } = props;

  return (
    <>
      <Box className={'col-span-1'}>
        <MenuItemSticky index={index}>{year}</MenuItemSticky>
      </Box>
      <Box className={'col-span-2 flex items-end justify-end pr-1'}>
        <MenuItemSticky index={index}>{title}</MenuItemSticky>
      </Box>
    </>
  );
};

export default MenuItemTexts;

const MenuItemSticky = ({
  children,
  className = '',
  index,
}: {
  children: React.ReactNode;
  className?: string;
  index: number;
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
