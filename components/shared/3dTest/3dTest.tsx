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

  const [cursor, setCursor] = useState<'n-resize' | 's-resize'>('n-resize');
  const containerRef = useRef<HTMLDivElement>(null);
  const initialRef = useRef<boolean>(true);

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
      opacity: index === 0 ? 1 : 0,
    })) || [],
  );

  useEffect(() => {
    if (initialRef.current) return;
    console.log(activeIndex);
    setScales((prev) => {
      return prev.map((e, index) => ({
        ...e,
        show: index >= activeIndex && index < activeIndex + 2,
        scale: index === activeIndex ? 1 : 0.1 ** (index - activeIndex),
        z: (index - activeIndex) * -8000,
        opacity:
          index >= activeIndex &&
          index < activeIndex + 2 &&
          (index === activeIndex ? 1 : 0.1 ** (index - activeIndex)) > 0
            ? 1
            : 0,
      }));
    });
  }, [activeIndex]);

  useEffect(() => {
    // Trigger initial transition after mount
    const timer = setTimeout(() => {
      setScales((prev) => {
        return prev.map((e, index) => ({
          ...e,
          opacity:
            index >= activeIndex &&
            index < activeIndex + 2 &&
            (index === activeIndex ? 1 : 0.1 ** (index - activeIndex)) > 0
              ? 1
              : 0,
        }));
      });

      initialRef.current = false;
    }, 600);

    return () => clearTimeout(timer);
  }, []); // Run once on mount

  useEffect(() => {
    const handleMousemove = (event: MouseEvent) => {
      const { y, whhalf } = getClientY(event);

      if (y <= whhalf) {
        setCursor('n-resize');
      } else {
        setCursor('s-resize');
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key;

      switch (key) {
        case 'ArrowUp':
          setActiveIndex((prev) => ++prev);
          break;

        case 'ArrowDown':
          setActiveIndex((prev) => {
            if (prev === 0) return 0;
            return --prev;
          });
          break;

        default:
          return;
          break;
      }
    };

    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMousemove);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMousemove);
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!data?.media) return;
    const { y, whhalf } = getClientY(event);
    console.log('data: ', data);
    if (activeIndex >= data.media.length - 1) {
      router.push('/');
    } else {
      if (y <= whhalf) {
        setActiveIndex((prev) => ++prev);
      } else {
        if (activeIndex === 0) return;
        setActiveIndex((prev) => --prev);
      }
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
        cursor: cursor,
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
              opacity: scales[index]?.opacity ?? 0,
              transform: `translate(-50%, -50%) translate3d(0, 0, ${scales[index].z}px)`,
              transition: `all 0.3s ease-in-out`,
              willChange: 'transform',
            }}
          >
            <CustomImage
              asset={item?.asset}
              className="pointer-events-none h-full w-auto origin-center select-none object-contain object-center transition-all duration-300 ease-in-out will-change-transform"
              vw={[100, 50, 50]}
              priority={index <= 2 ? true : false}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default ThreeDTest;

const getClientY = (event: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
  const wh = window.innerHeight;
  const whhalf = wh / 2;
  const y = event.clientY;

  return { y, whhalf };
};
