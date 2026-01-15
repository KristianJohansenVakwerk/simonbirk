'use client';
import CustomImage from '@/components/shared/ui/Image/Image';
import Text from '@components/shared/ui/Text/Text';
import { useEffect, useRef, useState } from 'react';
import { formatDate } from '@/utils/utils';
// import { useStore } from '@/store/store';
import Link from 'next/link';
import clsx from 'clsx';

type Props = {
  item: any;
  itemIndex: number;
};

const MenuItemMobile = (props: Props) => {
  const { item, itemIndex } = props;

  const stickyElRef = useRef<HTMLDivElement | null>(null);
  const originalOffsetTopRef = useRef<number | null>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [spacerHeight, setSpacerHeight] = useState(0);

  // const {
  //   setGlobalShowMenu,
  //   setGlobalActiveProjectIndex,
  //   setGlobalScrollPosition,
  // } = useStore((state) => state);

  const TOP_MARGIN = 24;
  const SPACING = 18;
  const topOffset = TOP_MARGIN + itemIndex * SPACING;

  // Initialize and check scroll position on mount
  useEffect(() => {
    const stickyEl = stickyElRef.current;

    if (!stickyEl) return;

    // Get the absolute position in the document
    const rect = stickyEl.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    originalOffsetTopRef.current = rect.top + scrollY;

    // Check if we should be fixed on initial load
    const threshold = originalOffsetTopRef.current - topOffset;
    const shouldBeFixed = scrollY >= threshold;

    if (shouldBeFixed) {
      setSpacerHeight(stickyEl.offsetHeight);
      setIsFixed(true);
    }
  }, [topOffset]);

  useEffect(() => {
    const checkScrollPosition = () => {
      const stickyEl = stickyElRef.current;

      if (!stickyEl || originalOffsetTopRef.current === null) return;

      // If not fixed, update the original position (in case layout changes)
      if (!isFixed) {
        const rect = stickyEl.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        originalOffsetTopRef.current = rect.top + scrollY;
      }

      // Check if scroll position has reached the threshold
      const scrollY = window.scrollY || window.pageYOffset;
      const threshold = originalOffsetTopRef.current - topOffset;
      const shouldBeFixed = scrollY >= threshold;

      // Store the height before it becomes fixed to use for spacer
      if (shouldBeFixed && !isFixed) {
        setSpacerHeight(stickyEl.offsetHeight);
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

  // const handleClick = useCallback(
  //   async (slug: string | null) => {
  //     await setGlobalActiveProjectIndex(itemIndex);
  //     await setGlobalShowMenu(false);

  //     if (slug) {
  //       await setGlobalScrollPosition();
  //     }
  //   },
  //   [
  //     itemIndex,
  //     setGlobalActiveProjectIndex,
  //     setGlobalShowMenu,
  //     setGlobalScrollPosition,
  //   ],
  // );

  return (
    <div className="relative flex flex-wrap gap-[8px]">
      <div className="ml-auto w-full cursor-pointer">
        <CustomImage
          asset={item?.thumbnail}
          className="h-auto w-full object-cover"
          priority={itemIndex <= 4 ? true : false}
          vw={[100, 25, 25]}
        />
      </div>

      {/* Spacer to prevent layout jump when element becomes fixed */}
      {isFixed && spacerHeight > 0 && (
        <div
          className="pointer-events-none w-full"
          style={{
            height: `${spacerHeight}px`,
          }}
        />
      )}

      <div
        ref={stickyElRef}
        className={clsx('z-10 flex w-full cursor-pointer justify-between')}
        style={{
          ...(isFixed && {
            top: `${topOffset}px`,
            position: 'fixed',
            transition: 'top 0.2s ease-out',
            willChange: 'transform',
          }),
        }}
      >
        <Link
          href={`/projects/${item.slug?.current}`}
          className={clsx(
            'z-10 flex w-full cursor-pointer justify-between px-1',
          )}
        >
          <Text>{item.title}</Text>
          <Text>{formatDate(item.year, 'yyyy')}</Text>
        </Link>
      </div>
    </div>
  );
};

export default MenuItemMobile;
