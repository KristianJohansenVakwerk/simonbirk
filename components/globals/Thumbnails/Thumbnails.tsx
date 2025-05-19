'use client';
import Box from '@components/shared/ui/Box/Box';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import React from 'react';
import CustomImage from '@/components/shared/ui/Image/Image';
import { QueryProjectsResult } from '@/sanity/types/sanity.types';

type Props = {
  data: QueryProjectsResult | null;
  activeIndex: number | null;
};

const Thumbnails = (props: Props) => {
  const { data, activeIndex } = props;

  const variants = {
    initial: {
      opacity: 0,
    },
    hide: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <Box
      className={
        'pointer-events-none fixed right-0 top-0 z-10 h-full w-full will-change-transform'
      }
    >
      <AnimatePresence mode="sync">
        {data &&
          data?.map((item, index) => (
            <React.Fragment key={item._id}>
              {activeIndex === index && (
                <MotionImage
                  key={item._id}
                  asset={item?.thumbnail}
                  className={clsx(
                    'absolute right-0 top-0 h-full w-auto',
                    activeIndex === index ? 'opacity-100' : 'opacity-0',
                  )}
                  variants={variants}
                  initial={'initial'}
                  animate={'show'}
                  exit={'hide'}
                />
              )}
            </React.Fragment>
          ))}
      </AnimatePresence>
    </Box>
  );
};

export const MotionImage = motion.create(CustomImage);

export default Thumbnails;
