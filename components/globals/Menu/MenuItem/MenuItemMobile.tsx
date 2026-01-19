'use client';
import CustomImage from '@/components/shared/ui/Image/Image';
import Text from '@components/shared/ui/Text/Text';
import { useCallback, useEffect, useRef, useState } from 'react';
import { formatDate } from '@/utils/utils';
import { useStore } from '@/store/store';
import Link from 'next/link';
import clsx from 'clsx';

type Props = {
  item: any;
  itemIndex: number;
};

const MenuItemMobile = (props: Props) => {
  const { item, itemIndex } = props;

  const stickyElRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const originalOffsetTopRef = useRef<number | null>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [leftOffset, setLeftOffset] = useState(0);
  // const [spacerHeight, setSpacerHeight] = useState(0);

  const {
    setGlobalShowMenu,
    setGlobalActiveProjectIndex,
    setGlobalScrollPosition,
  } = useStore((state) => state);

  const TOP_MARGIN = 38;
  const SPACING = 18;
  const topOffset = TOP_MARGIN + itemIndex * SPACING;

  // Calculate left offset based on image width
  useEffect(() => {
    const calculateLeftOffset = () => {
      const container = containerRef.current;
      const image = imageRef.current;

      if (!container || !image) return;

      // Get the container's left position and the image width (viewport-relative for fixed positioning)
      const containerRect = container.getBoundingClientRect();
      const imageRect = image.getBoundingClientRect();

      // Calculate left offset: container left + image width + padding
      // For fixed positioning, left is relative to viewport, so we use getBoundingClientRect directly
      const left = containerRect.left + imageRect.width + 16; // 4px for pl-1 padding
      setLeftOffset(left);
    };

    calculateLeftOffset();

    window.addEventListener('resize', calculateLeftOffset, { passive: true });

    return () => {
      window.removeEventListener('resize', calculateLeftOffset);
    };
  }, []);

  // Initialize and check scroll position on mount
  useEffect(() => {
    const stickyEl = stickyElRef.current;
    const container = containerRef.current;

    if (!stickyEl || !container) return;

    // Get the absolute position in the document
    const rect = stickyEl.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    originalOffsetTopRef.current = rect.top + scrollY;

    // Check if we should be fixed on initial load
    const threshold = originalOffsetTopRef.current - topOffset;
    const shouldBeFixed = scrollY >= threshold;

    if (shouldBeFixed) {
      // setSpacerHeight(container.offsetHeight);
      setIsFixed(true);
    }
  }, [topOffset]);

  useEffect(() => {
    const checkScrollPosition = () => {
      const stickyEl = stickyElRef.current;
      const container = containerRef.current;

      if (!stickyEl || !container || originalOffsetTopRef.current === null)
        return;

      // If not fixed, update the original position (in case layout changes)
      if (!isFixed) {
        const rect = stickyEl.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        originalOffsetTopRef.current = rect.top + scrollY;
      }

      // Recalculate left offset when scrolling (in case container position changes)
      // For fixed positioning, left is relative to viewport
      const containerRect = container.getBoundingClientRect();
      const image = imageRef.current;
      if (image) {
        const imageRect = image.getBoundingClientRect();
        const left = containerRect.left + imageRect.width + 16; // 4px for pl-1 padding
        setLeftOffset(left);
      }

      // Check if scroll position has reached the threshold
      const scrollY = window.scrollY || window.pageYOffset;
      const threshold = originalOffsetTopRef.current - topOffset;
      const shouldBeFixed = scrollY >= threshold;

      // Store the height before it becomes fixed to use for spacer
      if (shouldBeFixed && !isFixed) {
        // setSpacerHeight(container.offsetHeight);
      }

      setIsFixed(shouldBeFixed);
    };

    checkScrollPosition();

    window.addEventListener('scroll', checkScrollPosition, {
      passive: true,
    });
    window.addEventListener('resize', checkScrollPosition, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [topOffset, isFixed]);

  const handleClick = useCallback(
    (slug: string | null) => {
      setGlobalActiveProjectIndex(itemIndex);
      setGlobalShowMenu(false);

      if (slug) {
        setGlobalScrollPosition();
      }
    },
    [
      itemIndex,
      setGlobalActiveProjectIndex,
      setGlobalShowMenu,
      setGlobalScrollPosition,
    ],
  );

  return (
    <div
      ref={containerRef}
      className="relative flex flex-wrap px-1"
    >
      {/* Spacer to prevent layout jump when element becomes fixed */}
      {/* {isFixed && spacerHeight > 0 && (
        <div
          className="pointer-events-none w-full"
          style={{
            height: `${spacerHeight}px`,
          }}
        />
      )} */}

      <div
        ref={imageRef}
        className="w-1/4"
      >
        <CustomImage
          asset={item?.thumbnail}
          className="h-auto w-full object-cover"
          priority={itemIndex <= 4 ? true : false}
          vw={[100, 25, 25]}
        />
      </div>
      <div
        ref={stickyElRef}
        className={clsx('z-10 flex flex-row justify-between')}
        style={{
          ...(isFixed && {
            top: `${topOffset}px`,
            left: `${leftOffset}px`,
            position: 'fixed',
            transition: 'top 0.2s ease-out, left 0.2s ease-out',
            willChange: 'transform',
          }),
        }}
      >
        <Link
          href={`/projects/${item.slug?.current}`}
          className={clsx(
            'row z-10 flex w-full flex-row items-start justify-start gap-1 pl-1',
          )}
          onClick={() => handleClick(item.slug?.current)}
        >
          <Text>{formatDate(item.year, 'yyyy')}</Text>
          <Text>{item.title}</Text>
        </Link>
      </div>
    </div>
  );
};

export default MenuItemMobile;
