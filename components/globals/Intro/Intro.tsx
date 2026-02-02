'use client';
import { QueryProjectsResult } from '@/sanity/types/sanity.types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CustomImage from '@/components/shared/ui/Image/Image';
import Box from '@/components/shared/ui/Box/Box';
import { motion } from 'motion/react';
import { useStore } from '@/store/store';
import clsx from 'clsx';
import { introVariants } from '@/utils/animationUtils';
import { getRandomProjects } from '@/utils/utils';
type Props = { data: QueryProjectsResult | null };
const Intro = (props: Props) => {
  const { data } = props;
  const [projects, setProjects] = useState<QueryProjectsResult | null>(null);

  const { globalIntroDone, setGlobalIntroDone } = useStore((state) => state);

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [introDone, setIntroDone] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef<boolean>(false); // Guard flag to prevent multiple starts
  const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const randomProjects = getRandomProjects(data, 10) || [];
    setProjects(randomProjects);
  }, [data]);

  // Fallback: start animation after short wait so intro never freezes on cold load (new tab)
  // Cached images often don't fire onLoad, so we don't wait long.
  const INTRO_MAX_WAIT_MS = 2000;
  useEffect(() => {
    if (!projects?.length) return;
    fallbackTimeoutRef.current = setTimeout(() => {
      setLoadedCount((prev) => {
        if (prev < projects.length && !isAnimatingRef.current) {
          return projects.length; // Force "all loaded" so animation starts
        }
        return prev;
      });
    }, INTRO_MAX_WAIT_MS);
    return () => {
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
        fallbackTimeoutRef.current = null;
      }
    };
  }, [projects?.length]);

  const handleLoadDone = useCallback(() => {
    setLoadedCount((prev) => ++prev);
  }, []);

  useEffect(() => {
    // Only start if all images are loaded, animation hasn't started, and we have projects
    if (
      loadedCount === projects?.length &&
      projects.length > 0 &&
      !isAnimatingRef.current
    ) {
      // Mark as animating to prevent multiple starts
      isAnimatingRef.current = true;

      const initialDelay = 800;
      const minDelay = 100;
      // Reset delay when starting
      currentDelayRef.current = initialDelay;

      const scheduleNext = () => {
        // Clear any existing timeout first
        if (intervalRef.current) {
          clearTimeout(intervalRef.current);
          intervalRef.current = null;
        }

        if (!projects?.length) return;

        intervalRef.current = setTimeout(() => {
          setActiveIndex((prev) => {
            const next = prev + 1;

            if (next >= projects.length - 1) {
              if (intervalRef.current) {
                clearTimeout(intervalRef.current);
                intervalRef.current = null;
              }
              isAnimatingRef.current = false; // Reset flag when done
              setIntroDone(true);
              return next;
            }

            currentDelayRef.current = Math.max(
              currentDelayRef.current * speedFactorRef.current,
              minDelay,
            );

            // Schedule next transition
            scheduleNext();

            return next;
          });
        }, currentDelayRef.current);
      };

      scheduleNext();
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [loadedCount, projects?.length]);

  useEffect(() => {
    if (introDone) {
      setTimeout(() => {
        setGlobalIntroDone(true);
      }, 300);
    }
  }, [introDone, setGlobalIntroDone]);

  const currentDelayRef = useRef<number>(1000);
  const speedFactorRef = useRef<number>(0.8); // Slower acceleration for smoother feel

  if (!projects || !projects.length) return <>No projects</>;

  return (
    <Box
      className={clsx(
        'pointer-events-none fixed right-0 top-0 z-[99] h-[100svh] w-full bg-white transition-opacity duration-500 ease-in-out lg:h-full',
        {
          'opacity-100': !globalIntroDone,
          'opacity-0': globalIntroDone,
        },
      )}
    >
      {projects?.map((item, index) => (
        <React.Fragment key={item._id}>
          <motion.div
            key={item._id}
            initial={introVariants.hide}
            exit={introVariants.hide}
            animate={
              index === activeIndex ? introVariants.show : introVariants.hide
            }
          >
            <CustomImage
              asset={item?.thumbnail}
              className={'absolute right-0 top-0 h-full w-auto object-contain'}
              priority={true}
              loadDone={handleLoadDone}
            />
          </motion.div>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Intro;
