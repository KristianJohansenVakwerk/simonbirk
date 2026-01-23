'use client';
import Box from '@components/shared/ui/Box/Box';
import { motion } from 'motion/react';
import clsx from 'clsx';
import CustomImage from '@/components/shared/ui/Image/Image';
import { QueryProjectsResult } from '@/sanity/types/sanity.types';
import ThumbnailsProvider from './ThumbnailsProvider';
import { useStore } from '@/store/store';
import { usePathname } from 'next/navigation';
type Props = {
  data: QueryProjectsResult | null;
};

const variants = {
  initial: {
    opacity: 0,
  },
  hide: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const, // easeInOut
    },
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const, // easeInOut
    },
  },
};

const Thumbnails = (props: Props) => {
  const { data } = props;
  const pathname = usePathname();

  const { globalStartThumbs, globalThumbIndex, globalHoverProject } = useStore(
    (state) => state,
  );

  // Hide thumbnails on project detail pages
  if (pathname.startsWith('/projects/')) {
    return null;
  }

  return (
    <ThumbnailsProvider dataLen={data?.length}>
      <Box
        className={clsx(
          'pointer-events-none fixed right-0 top-0 z-10 h-full w-full transition-opacity duration-300 ease-in-out will-change-transform',
          {
            'opacity-0': !globalStartThumbs,
            'opacity-100': globalStartThumbs || globalHoverProject,
          },
        )}
      >
        {data &&
          data?.map((item, index) => (
            <Thumb
              key={item._id}
              activeIndex={globalThumbIndex}
              index={index}
              item={item}
            />
          ))}
      </Box>
    </ThumbnailsProvider>
  );
};

export const MotionImage = motion.create(CustomImage);

export default Thumbnails;

interface ThumbProps {
  activeIndex: number;
  index: number;
  item: any;
}
const Thumb = (props: ThumbProps) => {
  const { item, activeIndex, index } = props;

  const image = item?.media ? item.media[0].asset : item?.thumbnail;

  if (!image) return <>No image</>;

  return (
    <motion.div
      variants={variants}
      initial={'initial'}
      animate={activeIndex === index ? 'show' : 'hide'}
      exit={'hide'}
      className={clsx('absolute right-0 top-0 h-full w-auto')}
    >
      <CustomImage
        asset={image}
        className={clsx('object-center-center h-full w-auto object-contain')}
      />
    </motion.div>
  );
};
