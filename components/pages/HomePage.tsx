'use client';
import Link from 'next/link';
import Text from '@components/shared/ui/Text/Text';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import Box from '@components/shared/ui/Box/Box';
import { useRouter } from 'next/navigation';
import Menu from '../globals/Menu/Menu';
import Thumbnails from '../globals/Thumbnails/Thumbnails';

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
  img: `/simon-${(index % 6) + 1}.jpg`,
}));

const Homepage = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerOutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const clearTimers = useCallback(() => {
    if (timerOutRef.current) {
      clearTimeout(timerOutRef.current);
      timerOutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback((index: number) => {
    clearTimers();
    setActiveIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveIndex(-1);

    if (checkIfBottom()) {
      timerOutRef.current = setTimeout(() => {
        // start the interval
        intervalRef.current = setInterval(() => {
          // update the active index and loop
          setActiveIndex((prev) =>
            prev === testData.length - 1 ? 0 : prev + 1,
          );
        }, 2000);
      }, 3000);
    }
  }, []);

  const variants = {
    show: {
      opacity: 1,
    },
    hide: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };
  const handleClick = useCallback(() => {
    setShowMenu(false);
  }, []);

  const handleRouterUpdate = useCallback(() => {
    router.push(`/projects/test-project`);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Clear the timers to prevent double renders interval issues
      clearTimers();

      const scrollPosition = window.scrollY;
      const wh = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      // Check if we are the bottom of the page
      if (checkIfBottom()) {
        // set a timer to start the interval after 3 seconds
        timerOutRef.current = setTimeout(() => {
          // start the interval
          intervalRef.current = setInterval(() => {
            // update the active index and loop
            setActiveIndex((prev) =>
              prev === testData.length - 1 ? 0 : prev + 1,
            );
          }, 2000);
        }, 3000);
      } else {
        // Reset when scrolling away
        setActiveIndex(-1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimers();
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
        <motion.div
          className={'col-span-6 mt-75'}
          variants={variants}
          initial={'show'}
          animate={showMenu ? 'show' : 'hide'}
          onAnimationComplete={() => {
            handleRouterUpdate();
          }}
        >
          <Menu
            data={testData}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            handleClick={handleClick}
            activeIndex={activeIndex}
          />

          <div className={'pointer-event-none col-span-6 h-[100vh]'}></div>
        </motion.div>
        <Text className="sticky top-75 col-span-3 h-fit">Photographer</Text>

        <Box className="sticky top-75 col-span-3 flex h-fit flex-row gap-1">
          <Text>Agency</Text>
          <Text>Preview</Text>
        </Box>

        <Box className="sticky top-75 col-span-3 flex h-fit flex-row gap-1">
          <Text>Email</Text>
          <Text>info@simonbirk.com</Text>
        </Box>

        <Box className="sticky top-75 col-span-3 flex h-fit flex-row gap-1">
          <Text>Instagram</Text>
          <Text>@simonbirk</Text>
        </Box>
      </header>

      {/* <motion.div
        variants={variants}
        initial={'show'}
        animate={showMenu ? 'show' : 'hide'}
      > */}
      <Thumbnails
        data={testData}
        activeIndex={activeIndex}
      />
      {/* </motion.div> */}
    </>
  );
};

export default Homepage;

const checkIfBottom = () => {
  const scrollPosition = window.scrollY;
  const wh = window.innerHeight;
  const scrollHeight = document.documentElement.scrollHeight;
  return Math.floor(scrollPosition + wh) === scrollHeight;
};
