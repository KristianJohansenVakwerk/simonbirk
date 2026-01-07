'use client';
import { QueryProjectsResult } from '@/sanity/types/sanity.types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CustomImage from '@/components/shared/ui/Image/Image';
import Box from '@/components/shared/ui/Box/Box';
import { motion } from 'motion/react';

type Props = { projects: QueryProjectsResult | null; introEnd: () => void };
const Intro = (props: Props) => {
  const { projects, introEnd } = props;

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [introDone, setIntroDone] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef<boolean>(false); // Guard flag to prevent multiple starts

  const handleLoadDone = useCallback(() => {
    setLoadedCount((prev) => ++prev);
  }, []);

  const variants = {
    initial: {
      opacity: 0,
    },
    hide: {
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1], // Custom easing for smoother feel
      },
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1], // Custom easing for smoother feel
      },
    },
  };

  useEffect(() => {
    // Only start if all images are loaded, animation hasn't started, and we have projects
    if (
      loadedCount === projects?.length &&
      projects.length > 0 &&
      !isAnimatingRef.current
    ) {
      // Mark as animating to prevent multiple starts
      isAnimatingRef.current = true;

      // Reset delay when starting
      currentDelayRef.current = 1000;

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

            if (next >= projects.length) {
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
              300,
            );

            console.log(currentDelayRef.current);

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
      introEnd();
    }
  }, [introDone]);

  const currentDelayRef = useRef<number>(1000);
  const speedFactorRef = useRef<number>(0.9); // Slower acceleration for smoother feel

  if (!projects || !projects.length) return <>No projects</>;

  return (
    <Box
      className={'fixed right-0 top-0 z-10 h-full w-full will-change-transform'}
    >
      {projects?.map((item, index) => (
        <React.Fragment key={item._id}>
          <motion.div
            key={item._id}
            initial="initial"
            variants={variants}
            animate={index === activeIndex ? 'show' : 'hide'}
          >
            <CustomImage
              asset={item?.thumbnail}
              className={'absolute right-0 top-0 h-full w-auto'}
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
