'use client';
import Link from 'next/link';
import Menu from '../Menu/Menu';
import Text from '@components/shared/ui/Text/Text';
import Thumbnails from '../Thumbnails/Thumbnails';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Box from '@components/shared/ui/Box/Box';
import { usePathname, useRouter } from 'next/navigation';
import { checkIfBottom, formatDate } from '@/utils/utils';

import {
  QueryProjectsResult,
  QuerySettingsResult,
} from '@/sanity/types/sanity.types';

type Props = {
  projects: QueryProjectsResult | null;
  settings: QuerySettingsResult | null;
};

import { variants, menuVariants } from '@/utils/animationUtils';

const HeaderClient = (props: Props) => {
  const { projects, settings } = props;

  const [showMenu, setShowMenu] = useState(true);
  const [showThumbs, setShowThumbs] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerOutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const pathname = usePathname();

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

  const handleContainerMouseEnter = useCallback(() => {
    if (!pathname.includes('/projects/')) return;

    setShowMenu(true);
  }, [pathname]);

  const handleContainerMouseLeave = useCallback(() => {
    if (!pathname.includes('/projects/')) return;

    setShowMenu(false);
  }, [pathname]);

  const handleMouseLeave = useCallback(() => {
    setShowThumbs(false);
    setActiveIndex(-1);
    if (checkIfBottom()) {
      timerOutRef.current = setTimeout(() => {
        // start the interval
        intervalRef.current = setInterval(() => {
          // update the active index and loop

          if (projects) {
            setActiveIndex((prev) =>
              prev === projects?.length - 1 ? 0 : prev + 1,
            );
          }
        }, 2000);
      }, 3000);
    }
  }, [projects]);

  const handleClick = useCallback((url: string) => {
    setShowMenu(false);
    router.push(url);
  }, []);

  useEffect(() => {
    setShowThumbs(false);
    if (pathname.includes('/projects/')) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  }, [pathname]);

  const handleMouseEnter = useCallback((index: number) => {
    console.log('index', index);
    setActiveIndex(index);
    setShowThumbs(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Clear the timers to prevent double renders interval issues
      clearTimers();

      // Check if we are the bottom of the page
      if (checkIfBottom()) {
        // set a timer to start the interval after 3 seconds
        setShowThumbs(true);

        // start the interval
        intervalRef.current = setInterval(() => {
          // update the active index and loop
          if (projects) {
            setActiveIndex((prev) =>
              prev === projects.length - 1 ? 0 : prev + 1,
            );
          }
        }, 2000);
      } else {
        // Reset when scrolling away
        setShowThumbs(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimers();
    };
  }, [pathname]);

  return (
    <>
      <header className="height-auto debug relative z-20 grid grid-cols-20 gap-1">
        <Link
          href={'/'}
          className={'sticky top-75 col-span-2 flex h-fit flex-row pl-1'}
        >
          <Text>Simon Birk</Text>
        </Link>
        <div
          className="col-span-6 mt-75"
          onMouseEnter={handleContainerMouseEnter}
          onMouseLeave={handleContainerMouseLeave}
        >
          <AnimatePresence mode="wait">
            {showMenu ? (
              <Menu
                key={`${showMenu}`}
                data={projects}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleClick={handleClick}
                activeIndex={activeIndex}
                variants={menuVariants}
                initial={'hide'}
                animate={'show'}
                exit={'hide'}
              />
            ) : (
              <motion.div
                key={`${showMenu}`}
                variants={menuVariants}
                initial={'hide'}
                animate={'show'}
                exit={'hide'}
                className={'w-[100%]'}
              >
                <Box
                  className={
                    'relative mb-2 grid cursor-pointer grid-cols-6 justify-between transition-colors duration-300 last:mb-0'
                  }
                >
                  <Box className={'col-span-3'}>
                    <Box className={'relative left-0 top-0 z-10 col-span-3'}>
                      <Box className={'grid grid-cols-3 hover:text-hover'}>
                        <Box className={'col-span-2'}>
                          <Text>{projects?.[activeIndex]?.title}</Text>
                        </Box>
                        <Box
                          className={
                            'col-span-1 flex items-end justify-end pr-1'
                          }
                        >
                          <Text>
                            {formatDate(
                              projects?.[activeIndex]?.year as string,
                            )}
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {settings &&
          settings.info?.map((item) => {
            return (
              <Box
                className="sticky top-75 col-span-3 flex h-fit flex-row gap-1"
                key={item._key}
              >
                <Text>{item.title}</Text>

                {item.href ? (
                  <Link
                    className="gap-0 font-sans text-base leading-none capsize"
                    href={item.href}
                    target="_blank"
                  >
                    {item.hrefLabel}
                  </Link>
                ) : (
                  <Text>{item.hrefLabel}</Text>
                )}
              </Box>
            );
          })}
      </header>

      <AnimatePresence mode={'wait'}>
        {showMenu && showThumbs && !pathname.includes('/projects/') && (
          <motion.div
            key={`${showThumbs}`}
            variants={variants}
            initial={'hide'}
            animate={'show'}
            exit={'hide'}
          >
            <Thumbnails
              data={projects}
              activeIndex={activeIndex}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderClient;
