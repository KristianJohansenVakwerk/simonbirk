'use client';
import Link from 'next/link';
import Menu from '../Menu/Menu';
import Text from '@components/shared/ui/Text/Text';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

// import { usePathname, useRouter } from 'next/navigation';
// import { checkIfBottom, formatDate, getRandomProjects } from '@/utils/utils';
import { useStore } from '@/store/store';

import {
  QueryProjectsResult,
  QuerySettingsResult,
} from '@/sanity/types/sanity.types';

type Props = {
  projects: QueryProjectsResult | null;
  settings: QuerySettingsResult | null;
};

import { variants, menuVariants } from '@/utils/animationUtils';
import Intro from '../Intro/Intro';
import clsx from 'clsx';
import SettingsItems from '@/components/SettingsItems/SettingsItems';
import ProjectTitle from '@/components/ProjectTitle/ProjectTitle';

const HeaderClient = (props: Props) => {
  const { projects, settings } = props;

  const { globalIntroDone, globalShowMenu, globalActiveProjectIndex } =
    useStore((state) => state);
  // const [showMenu, setShowMenu] = useState(true);
  const [showThumbs, setShowThumbs] = useState(false);
  // const intervalRef = useRef<NodeJS.Timeout | null>(null);
  // const timerOutRef = useRef<NodeJS.Timeout | null>(null);
  // const router = useRouter();
  // const pathname = usePathname();

  // const clearTimers = useCallback(() => {
  //   if (timerOutRef.current) {
  //     clearTimeout(timerOutRef.current);
  //     timerOutRef.current = null;
  //   }
  //   if (intervalRef.current) {
  //     clearInterval(intervalRef.current);
  //     intervalRef.current = null;
  //   }
  // }, []);

  // const handleContainerMouseEnter = useCallback(() => {
  //   if (!pathname.includes('/projects/')) return;

  //   setShowMenu(true);
  // }, [pathname]);

  // const handleContainerMouseLeave = useCallback(() => {
  //   if (!pathname.includes('/projects/')) return;

  //   setShowMenu(false);
  // }, [pathname]);

  // const handleMouseLeave = useCallback(() => {
  //   setShowThumbs(false);
  //   setActiveIndex(-1);
  //   if (checkIfBottom()) {
  //     timerOutRef.current = setTimeout(() => {
  //       // start the interval
  //       intervalRef.current = setInterval(() => {
  //         // update the active index and loop

  //         if (projects) {
  //           setActiveIndex((prev) =>
  //             prev === projects?.length - 1 ? 0 : prev + 1,
  //           );
  //         }
  //       }, 2000);
  //     }, 3000);
  //   }
  // }, [projects]);

  // const handleClick = useCallback((url: string) => {
  //   setShowMenu(false);
  //   router.push(url);
  // }, []);

  // const handleMouseEnter = useCallback((index: number) => {
  //   setActiveIndex(index);
  //   setShowThumbs(true);
  // }, []);

  // useEffect(() => {
  //   setShowThumbs(false);
  //   if (pathname.includes('/projects/')) {
  //     setShowMenu(false);
  //   } else {
  //     setShowMenu(true);
  //   }
  // }, [pathname]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     // Clear the timers to prevent double renders interval issues
  //     clearTimers();

  //     // Check if we are the bottom of the page
  //     if (checkIfBottom()) {
  //       // set a timer to start the interval after 3 seconds
  //       setShowThumbs(true);

  //       // start the interval
  //       intervalRef.current = setInterval(() => {
  //         // update the active index and loop
  //         if (projects) {
  //           setActiveIndex((prev) =>
  //             prev === projects.length - 1 ? 0 : prev + 1,
  //           );
  //         }
  //       }, 2000);
  //     } else {
  //       // Reset when scrolling away
  //       setShowThumbs(false);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll, { passive: true });

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //     clearTimers();
  //   };
  // }, [pathname]);

  // const handleIntroEnd = useCallback(() => {
  //   setIntroState(false);
  // }, []);

  return (
    <>
      {/* <div
        className={clsx('pointer-events-none', {
          'opacity-0': !introState,
          'opacity-100': introState,
        })}
      >
        <Intro
          projects={randomProjects}
          introEnd={handleIntroEnd}
        />
      </div> */}
      <header
        className={clsx(
          'relative z-20 grid h-auto grid-cols-20 gap-1 transition-opacity delay-500 duration-1000 ease-in-out',
          {
            'opacity-0': !globalIntroDone,
            'opacity-100': globalIntroDone,
          },
        )}
      >
        <Link
          href={'/'}
          className={'sticky top-75 col-span-2 flex h-fit flex-row pl-1'}
        >
          <Text>Simon Birk</Text>
        </Link>
        <div
          className="col-span-6 mt-75"
          // onMouseEnter={handleContainerMouseEnter}
          // onMouseLeave={handleContainerMouseLeave}
        >
          <AnimatePresence mode="wait">
            {globalShowMenu ? (
              <Menu
                key={`${globalShowMenu}`}
                data={projects}
                activeIndex={globalActiveProjectIndex}
                variants={menuVariants}
                initial={'hide'}
                animate={'show'}
                exit={'hide'}
              />
            ) : (
              <motion.div
                key={`${globalShowMenu}`}
                variants={menuVariants}
                initial={'hide'}
                animate={'show'}
                exit={'hide'}
                className={'w-[100%]'}
              >
                <ProjectTitle
                  title={projects?.[globalActiveProjectIndex]?.title ?? null}
                  year={projects?.[globalActiveProjectIndex]?.year ?? null}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {settings && <SettingsItems settings={settings} />}
      </header>

      {/* <AnimatePresence mode={'wait'}>
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
      </AnimatePresence> */}
    </>
  );
};

export default HeaderClient;
