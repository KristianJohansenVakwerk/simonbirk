'use client';
import Link from 'next/link';
import Menu from '../Menu/Menu';
import Text from '@components/shared/ui/Text/Text';
import Thumbnails from '../Thumbnails/Thumbnails';
import { useCallback, useEffect, useState } from 'react';

import Box from '@components/shared/ui/Box/Box';
import clsx from 'clsx';
import { formatClasses } from '../../../utils/utils';

const titles = [
  'Adidas Magazine',
  'Distance',
  'The Greatest Magazine',
  'Pas Normal Studios aw24',
  'Doxa',
  'Salomon Sportstyle',
  'Salomon S_LAB',
  'Adidas Magazine',
  'Distance',
  'The Greatest Magazine',
  'Pas Normal Studios aw24',
  'Doxa',
  'Salomon Sportstyle',
  'Adidas Magazine',
  'Distance',
  'The Greatest Magazine',
  'Pas Normal Studios aw24',
  'Doxa',
  'Salomon Sportstyle',
  'Adidas Magazine',
  'Distance',
  'The Greatest Magazine',
  'Pas Normal Studios aw24',
  'Doxa',
  'Salomon Sportstyle',
];

const testData = titles.map((title, index) => ({
  title,
  year: '2024',
  img: `/image_${(index % 5) + 1}.jpg`,
}));

const Header = () => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const handleMouseEnter = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveIndex(-1);
  }, []);

  useEffect(() => {
    let timerOut: NodeJS.Timeout | null = null;
    let interval: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      if (timerOut) {
        clearTimeout(timerOut);
        timerOut = null;
      }
      if (interval) {
        clearInterval(interval);
        interval = null;
      }

      const scrollPosition = window.scrollY;
      const wh = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      if (Math.floor(scrollPosition + wh) === scrollHeight) {
        timerOut = setTimeout(() => {
          interval = setInterval(() => {
            setActiveIndex((prev) =>
              prev === testData.length - 1 ? 0 : prev + 1,
            );
          }, 2000);
        }, 3000);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header className="relative z-20 grid min-h-screen grid-cols-20 gap-1">
        <Link
          href={'/'}
          className={
            'sticky top-75 col-span-2 flex h-fit flex-row justify-center'
          }
        >
          <Text>Simon Birk</Text>
        </Link>
        <div className={'col-span-6 mt-75'}>
          <Menu
            data={testData}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            activeIndex={activeIndex}
          />

          <div className={'pointer-event-none col-span-6 h-[100vh]'}></div>
        </div>
        <Text className="sticky top-75 col-span-3 h-fit">Photographer</Text>

        <Text className="sticky top-75 col-span-3 flex h-fit flex-row gap-1">
          <span>Agency</span>
          <span>Preview</span>
        </Text>

        <Text className="sticky top-75 col-span-3 flex h-fit flex-row gap-1">
          <span>Email</span>
          <span>info@simonbirk.com</span>
        </Text>

        <Text className="sticky top-75 col-span-3 flex h-fit flex-row gap-1">
          <span>Instagram</span>
          <span>@simonbirk</span>
        </Text>
      </header>

      <Thumbnails
        data={testData}
        activeIndex={activeIndex}
      />
    </>
  );
};

export default Header;
