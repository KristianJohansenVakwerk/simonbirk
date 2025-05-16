'use client';
import { useEffect, useRef, useState } from 'react';

import Box from '@components/shared/ui/Box/Box';
import { useRouter } from 'next/navigation';
import { QueryProjectBySlugResult } from '@/sanity/types/sanity.types';
import CustomImage from '@components/shared/ui/Image/Image';

type Props = {
  data: QueryProjectBySlugResult;
};
const ThreeDTest = (props: Props) => {
  const { data } = props;
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const [scales, setScales] = useState<
    {
      show: boolean;
      scale: number;
      z: number;
      opacity: number;
    }[]
  >(
    data?.media?.map((item, index) => ({
      show: index >= activeIndex && index < activeIndex + 2,
      scale: index === 0 ? 1 : 0.1 ** (index - activeIndex),
      z: (index - activeIndex) * -8000,
      opacity: 0,
    })) || [],
  );

  useEffect(() => {
    if (activeIndex <= 0) return;

    setScales((prev) => {
      return prev.map((e, index) => ({
        ...e,
        show: index >= activeIndex && index < activeIndex + 2,
        scale: index === activeIndex ? 1 : 0.1 ** (index - activeIndex),
        z: (index - activeIndex) * -8000,
      }));
    });
  }, [activeIndex]);

  const handleClick = () => {
    if (!data?.media) return;

    if (activeIndex >= data.media.length - 1) {
      router.push('/');
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <Box
      ref={containerRef}
      className={
        'fixed left-0 top-0 flex h-[100vh] w-[100vw] flex-col overflow-hidden'
      }
      style={{
        perspective: '2000px', // Increased perspective for stronger effect
        perspectiveOrigin: 'center center',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      {data?.media?.map((item, index) => {
        return (
          <Box
            key={index}
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: index % 2 ? 'flex-start' : 'flex-end',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '100%',
              zIndex: data?.media ? data.media.length - index : 0,
              opacity: scales[index].show && scales[index].scale > 0 ? 1 : 0,
              transform: `translate(-50%, -50%) translate3d(0, 0, ${scales[index].z}px)`,
              transition: `all 0.3s ease-in-out`,
              willChange: 'transform',
            }}
          >
            <CustomImage
              asset={item?.asset}
              className="pointer-events-none h-full w-auto origin-center select-none object-contain object-center transition-all duration-300 ease-in-out will-change-transform"
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default ThreeDTest;
