'use client';
import { useEffect, useRef, useState } from 'react';

import Box from '../Box/Box';
import { useRouter } from 'next/navigation';

const data = [
  {
    type: 'image',
    src: '/simon-1.jpg',
  },
  {
    type: 'image',
    src: '/simon-2.jpg',
  },
  {
    type: 'image',
    src: '/simon-3.jpg',
  },
  {
    type: 'image',
    src: '/simon-4.jpg',
  },
  {
    type: 'image',
    src: '/simon-5.jpg',
  },
  {
    type: 'image',
    src: '/simon-6.jpg',
  },
];
const ThreeDTest = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [loadIndex, setLoadIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [scales, setScales] = useState<
    { ready: boolean; show: boolean; scale: number; z: number }[]
  >(
    data.map((item, index) => ({
      ...item,
      ready: index === 0 ? true : false,
      show: index === 0 ? true : false,
      scale: index === 0 ? 1 : 0.1 ** (index - activeIndex),
      z: (index - activeIndex) * -8000,
    })),
  );

  useEffect(() => {
    if (activeIndex <= 0) return;
    setScales((prev) => {
      return prev.map((e, index) => ({
        ...e,
        ready: true,
        show: index >= activeIndex && index < activeIndex + 3,
        scale: index === activeIndex ? 1 : 0.1 ** (index - activeIndex),
        z: (index - activeIndex) * -8000,
      }));
    });
  }, [activeIndex]);

  useEffect(() => {
    if (loadIndex >= 3) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setLoadIndex(loadIndex + 1);
    }, 300);
  }, []);

  useEffect(() => {
    // if (loadIndex >= 3) return;

    console.log(loadIndex);

    // setScales((prev) => {
    //   return prev.map((e, index) => ({
    //     ...e,
    //     show: index >= activeIndex && index < activeIndex + 3,
    //     ready: index <= loadIndex ? true : false,
    //   }));
    // });
  }, [loadIndex]);

  const handleClick = () => {
    if (activeIndex >= data.length - 1) {
      router.push('/');
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <Box
      ref={containerRef}
      className={'relative flex h-[100vh] w-[100vw] flex-col overflow-hidden'}
      style={{
        perspective: '2000px', // Increased perspective for stronger effect
        perspectiveOrigin: 'center center',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      {data.map((item, index) => {
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
              zIndex: data.length - index,
              opacity:
                scales[index].ready &&
                scales[index].show &&
                scales[index].scale > 0
                  ? 1
                  : 0,
              transform: `translate(-50%, -50%) translate3d(0, 0, ${scales[index].z}px)`,
              transition: `all 0.3s ease-in-out`,
              willChange: 'transform',
            }}
          >
            <img
              src={item.src}
              width={'auto'}
              height={'100%'}
              style={{
                pointerEvents: 'none',
                objectFit: 'contain',
                width: 'auto',
                height: '100%',
                objectPosition: 'center center',
                transform: `translateZ(0)`,
                // filter: `blur(${(1 - scales[index].scale) * 100}px)`,
                transformOrigin: 'center center',
                transition: `all 0.3s ease-in-out`,
                willChange: 'transform',
                userSelect: 'none',
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default ThreeDTest;
