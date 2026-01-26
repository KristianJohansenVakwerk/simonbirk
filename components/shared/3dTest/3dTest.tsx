'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

import Box from '@components/shared/ui/Box/Box';
import { useRouter, usePathname } from 'next/navigation';
import { QueryProjectBySlugResult } from '@/sanity/types/sanity.types';
import CustomImage from '@components/shared/ui/Image/Image';
import { useStore } from '@/store/store';
// import { urlFor } from '@/sanity/lib/image';
import clsx from 'clsx';
import { useDeviceDetection } from '@/utils/useDeviceDetection';

type Props = {
  data: QueryProjectBySlugResult;
};
const ThreeDTest = (props: Props) => {
  const { data } = props;
  const router = useRouter();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const {
    globalProjectOrder,
    resetGlobalScrollPosition,
    setGlobalActiveProjectMediaLen,
    setGlobalActiveProjectCurrentIndex,
    globalShowMenu,
  } = useStore((state) => state);

  const deviceInfo = useDeviceDetection();

  const [cursorClass, setCursorClass] = useState<
    'cursor-w-resize' | 'cursor-e-resize'
  >('cursor-w-resize');
  const containerRef = useRef<HTMLDivElement>(null);
  const initialRef = useRef<boolean>(true);
  const currenMediaLengthRef = useRef<number>(0);

  // Swipe preview state
  const [swipeProgress, setSwipeProgress] = useState<number>(0); // -1 to 1, negative = forward, positive = backward
  const [isSwiping, setIsSwiping] = useState<boolean>(false);

  // Combine current media with next project's first image
  const combinedMedia = useMemo(
    () => [
      ...(data?.media || []),
      ...(data?.nextProject?.media?.[0] ? [data.nextProject.media[0]] : []),
    ],
    [data?.media, data?.nextProject?.media],
  );

  const isTouchDevice = deviceInfo.isTouchDevice || deviceInfo.isMobile;

  const zMultiplier = isTouchDevice ? -100 : -8000;

  const [scales, setScales] = useState<
    {
      show: boolean;
      scale: number;
      z: number;
      opacity: number;
    }[]
  >(
    combinedMedia.map((item, index) => ({
      show: index >= activeIndex && index < activeIndex + 2,
      scale: index === 0 ? 1 : 0.1 ** (index - activeIndex),
      z: (index - activeIndex) * zMultiplier,
      opacity: index === 0 ? 1 : 0,
    })),
  );

  useEffect(() => {
    setActiveIndex(0);
    initialRef.current = true;
    setSwipeProgress(0);
    setIsSwiping(false);
  }, [pathname]);

  useEffect(() => {
    if (combinedMedia?.length) {
      currenMediaLengthRef.current = combinedMedia?.length || 0;
    }
  }, [combinedMedia?.length]);

  const isAtNavigationBoundary = useMemo(() => {
    return activeIndex === currenMediaLengthRef.current - 1;
  }, [activeIndex]);

  useEffect(() => {
    if (initialRef.current) return;
    setScales((prev) => {
      return prev.map((e, index) => ({
        ...e,
        show: index >= activeIndex && index < activeIndex + 2,
        scale: index === activeIndex ? 1 : 0.1 ** (index - activeIndex),
        z: (index - activeIndex) * zMultiplier,
        opacity:
          index >= activeIndex &&
          index < activeIndex + 2 &&
          (index === activeIndex ? 1 : 0.1 ** (index - activeIndex)) > 0
            ? 1
            : 0,
      }));
    });
  }, [activeIndex, zMultiplier]);

  useEffect(() => {
    setGlobalActiveProjectCurrentIndex(1);
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
    if (!data?.media?.length) return;
    setGlobalActiveProjectMediaLen(data.media.length);
  }, [data?.media?.length, setGlobalActiveProjectMediaLen]);

  // Swipe gesture tracking refs
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number | null>(null);
  const minSwipeDistance = 50; // Minimum distance in pixels for a valid swipe
  const maxVerticalSwipeDistance = 100; // Maximum vertical movement to consider it a horizontal swipe

  // Swipe gesture handling for mobile with preview animation
  useEffect(() => {
    if (!isTouchDevice || !containerRef.current) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartX.current = touch.clientX;
      touchStartY.current = touch.clientY;
      touchStartTime.current = Date.now();
      setIsSwiping(false);
      setSwipeProgress(0);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartX.current;
      const deltaY = touch.clientY - touchStartY.current;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      // Check if it's a horizontal swipe (more horizontal than vertical movement)
      if (absDeltaX > absDeltaY && absDeltaX > 10) {
        e.preventDefault();
        setIsSwiping(true);

        const windowWidth =
          typeof window !== 'undefined' ? window.innerWidth : 1;
        // Calculate progress: -1 (full forward) to 1 (full backward)
        // Clamp to reasonable range
        const maxSwipeDistance = windowWidth * 0.5; // 50% of screen width
        const progress = Math.max(-1, Math.min(1, deltaX / maxSwipeDistance));

        // Only show preview if above threshold
        if (
          absDeltaX > minSwipeDistance &&
          absDeltaY < maxVerticalSwipeDistance
        ) {
          setSwipeProgress(progress);
        } else {
          // Below threshold, show minimal preview (30% of movement)
          setSwipeProgress(progress * 0.3);
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (
        touchStartX.current === null ||
        touchStartY.current === null ||
        touchStartTime.current === null
      ) {
        return;
      }

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartX.current;
      const deltaY = touch.clientY - touchStartY.current;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      // Reset swipe preview
      setIsSwiping(false);
      setSwipeProgress(0);

      // Check if it's a horizontal swipe (more horizontal than vertical movement)
      if (
        absDeltaX > absDeltaY &&
        absDeltaX > minSwipeDistance &&
        absDeltaY < maxVerticalSwipeDistance
      ) {
        // Swipe left (negative deltaX) = navigate forward
        if (deltaX < 0) {
          // Swipe left = forward
          if (!isAtNavigationBoundary) {
            setActiveIndex((prev) => ++prev);
          }
        } else {
          // Swipe right (positive deltaX) = navigate backward
          setActiveIndex((prev) => {
            if (prev === 0) return 0;
            return --prev;
          });
        }
      }

      // Reset touch tracking
      touchStartX.current = null;
      touchStartY.current = null;
      touchStartTime.current = null;
    };

    const container = containerRef.current;
    container.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    });
    container.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('touchcancel', handleTouchEnd, {
      passive: true,
    });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [
    isTouchDevice,
    isAtNavigationBoundary,
    minSwipeDistance,
    maxVerticalSwipeDistance,
  ]);

  useEffect(() => {
    const isTouchDevice = deviceInfo.isTouchDevice || deviceInfo.isMobile;

    const handleMousemove = (event: MouseEvent) => {
      const { x, wwhalf } = getClientY(event);

      if (x >= wwhalf) {
        setCursorClass('cursor-e-resize');
        // Safari fallback: set cursor on document.body
        if (typeof document !== 'undefined') {
          document.body.style.cursor = 'e-resize';
        }
      } else {
        setCursorClass('cursor-w-resize');
        // Safari fallback: set cursor on document.body
        if (typeof document !== 'undefined') {
          document.body.style.cursor = 'w-resize';
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key;

      switch (key) {
        case 'ArrowRight':
          if (isAtNavigationBoundary) return;
          setActiveIndex((prev) => ++prev);
          break;

        case 'ArrowLeft':
          setActiveIndex((prev) => {
            if (prev === 0) return 0;
            return --prev;
          });
          break;
      }
    };

    if (!isTouchDevice) {
      window.addEventListener('keyup', handleKeyUp);
      window.addEventListener('mousemove', handleMousemove);
    }

    return () => {
      if (!isTouchDevice) {
        window.removeEventListener('keyup', handleKeyUp);
        window.removeEventListener('mousemove', handleMousemove);
      }
      // Reset body cursor on cleanup
      if (typeof document !== 'undefined') {
        document.body.style.cursor = '';
      }
    };
  }, [deviceInfo.isMobile, deviceInfo.isTouchDevice, isAtNavigationBoundary]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!combinedMedia.length) return;
    const { x, wwhalf } = getClientY(event);

    if (x >= wwhalf) {
      if (isAtNavigationBoundary) return;
      setActiveIndex((prev) => ++prev);
    } else {
      setActiveIndex((prev) => {
        if (prev === 0) return 0;
        return --prev;
      });
    }
  };

  useEffect(() => {
    if (!combinedMedia.length || !data) return;

    setGlobalActiveProjectCurrentIndex(activeIndex + 1);

    const nextSlug = data.nextProject?.slug?.current;
    const currentMediaLength = data?.media?.length || 0;

    if (activeIndex >= currentMediaLength) {
      if (nextSlug) {
        setTimeout(() => {
          router.push(`/projects/${nextSlug}`);
        }, 300);
      } else {
        resetGlobalScrollPosition();
        router.push('/');
      }
    }
  }, [
    activeIndex,
    combinedMedia.length,
    data,
    globalProjectOrder,
    router,

    setGlobalActiveProjectCurrentIndex,
    resetGlobalScrollPosition,
  ]);

  // Calculate scale, z, and opacity during swipe using the same formulas as the original animation
  const getSwipeValues = (index: number) => {
    if (!isSwiping || swipeProgress === 0) {
      return {
        scale: scales[index]?.scale ?? 1,
        z: scales[index]?.z ?? 0,
        opacity: scales[index]?.opacity ?? 0,
        show: scales[index]?.show ?? false,
      };
    }

    // Calculate virtual activeIndex based on swipe progress
    // swipeProgress: -1 (forward) to 1 (backward)
    const virtualActiveIndex = activeIndex - swipeProgress; // Negative progress moves forward

    // Use the same formulas as the original animation
    const relativeIndex = index - virtualActiveIndex;
    const scale = relativeIndex === 0 ? 1 : 0.1 ** relativeIndex;
    const z = relativeIndex * zMultiplier;
    const calculatedOpacity = relativeIndex === 0 ? 1 : 0.1 ** relativeIndex;
    const opacity = calculatedOpacity > 0 ? 1 : 0;
    const show =
      index >= Math.floor(virtualActiveIndex) &&
      index < Math.floor(virtualActiveIndex) + 2;

    return { scale, z, opacity, show };
  };

  // Dynamic loading strategy for Safari compatibility
  const getLoadingProps = (index: number) => {
    // First 3 images: priority (blocks render, loads immediately)
    if (index <= 2) {
      return { priority: true, loading: 'eager' as const };
    }
    // Images within active window + 3 ahead: eager but not priority
    if (index >= activeIndex && index < activeIndex + 4) {
      return { priority: false, loading: 'eager' as const };
    }
    // Rest: lazy load
    return { priority: false, loading: 'lazy' as const };
  };

  // Preload next images for Safari compatibility
  // useEffect(() => {
  //   // Preload next 2-3 images when activeIndex changes
  //   const imagesToPreload = combinedMedia.slice(
  //     activeIndex + 1,
  //     activeIndex + 4,
  //   );
  //   imagesToPreload.forEach((item) => {
  //     if (item?.asset) {
  //       const src = urlFor(item.asset)?.format('webp').url();
  //       if (src && typeof window !== 'undefined') {
  //         // Create image element to force browser to fetch
  //         const img = new Image();
  //         img.src = src;
  //       }
  //     }
  //   });

  //   return () => {
  //     imagesToPreload.forEach((img: any) => {
  //       img.src = '';
  //     });

  //   }
  // }, [activeIndex, combinedMedia]);

  return (
    <Box
      ref={containerRef}
      className={clsx(
        'duration-400 fixed left-0 top-0 flex h-full w-full select-none flex-col overflow-hidden outline-none transition-opacity ease-in-out',
        cursorClass,
        { 'pointer-events-none': globalShowMenu },
        { 'pointer-events-auto': !globalShowMenu },
        { 'opacity-0 lg:opacity-100': globalShowMenu },
        { 'opacity-100': !globalShowMenu },
      )}
      style={{
        perspective: isTouchDevice ? '100px' : '2000px', // Increased perspective for stronger effect
        perspectiveOrigin: 'center center',
        pointerEvents: 'auto', // Explicitly set for Safari
      }}
      onClick={handleClick}
    >
      {combinedMedia.map((item, index) => {
        const swipeValues = getSwipeValues(index);
        const currentZ = isSwiping ? swipeValues.z : (scales[index]?.z ?? 0);
        const currentOpacity = isSwiping
          ? swipeValues.opacity
          : (scales[index]?.opacity ?? 0);
        const shouldShow = isSwiping
          ? swipeValues.show
          : (scales[index]?.show ?? false);

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
              zIndex: combinedMedia.length - index,
              opacity: shouldShow ? currentOpacity : 0,
              transform: `translate(-50%, -50%) translate3d(0, 0, ${currentZ}px)`,
              transition: isSwiping ? 'none' : 'all .3s ease-in-out',
              willChange: shouldShow || isSwiping ? 'transform' : 'auto',
            }}
          >
            <CustomImage
              asset={item?.asset}
              className="pointer-events-none h-full w-auto origin-center select-none object-contain object-center transition-all duration-300 ease-in-out will-change-transform"
              vw={[100, 50, 50]}
              {...getLoadingProps(index)}
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
  const ww = window.innerWidth;
  const whhalf = (wh / 3) * 2;
  const wwhalf = ww / 2;
  const y = event.clientY;
  const x = event.clientX;

  return { y, whhalf, x, wwhalf };
};
