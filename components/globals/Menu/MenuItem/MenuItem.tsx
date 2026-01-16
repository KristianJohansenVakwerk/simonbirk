'use client';
import CustomImage from '@/components/shared/ui/Image/Image';
import Text from '@components/shared/ui/Text/Text';
import { useCallback, useEffect, useRef, useState } from 'react';
import { formatDate } from '@/utils/utils';
import { useStore } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useDeviceDetection } from '@/utils/useDeviceDetection';

type Props = {
  item: any;
  itemIndex: number;
};

const MenuItem = (props: Props) => {
  const { item, itemIndex } = props;

  const parentRef = useRef<HTMLDivElement | null>(null);
  const stickyElRef = useRef<HTMLDivElement | null>(null);
  const heightRef = useRef<number | null>(null);
  const [height, setHeight] = useState(0);
  const router = useRouter();

  const {
    setGlobalHoverProject,
    setGlobalThumbIndex,
    setGlobalShowMenu,
    setGlobalActiveProjectIndex,
    setGlobalScrollPosition,
  } = useStore((state) => state);

  const deviceInfo = useDeviceDetection();

  const TOP_MARGIN = deviceInfo.isMobile ? 32 : 75;
  const SPACING = 16;

  useEffect(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const parentEl = parentRef.current;

    if (!parentEl) return;

    heightRef.current = scrollHeight - parentEl.offsetTop;
    setHeight(scrollHeight - parentEl.offsetTop);
  }, []);

  const handleMouseEnter = useCallback(() => {
    router.prefetch(`/projects/${item.slug?.current}`);
    setGlobalThumbIndex(itemIndex);
    setGlobalHoverProject(true);
  }, [
    itemIndex,
    item.slug,
    router,
    setGlobalHoverProject,
    setGlobalThumbIndex,
  ]);

  const handleMouseLeave = useCallback(() => {
    setGlobalThumbIndex(-1);
    setGlobalHoverProject(false);
  }, []);

  const handleClick = useCallback(
    async (slug: string | null) => {
      await setGlobalActiveProjectIndex(itemIndex);
      await setGlobalShowMenu(false);

      if (slug) {
        await setGlobalScrollPosition();
        await router.push(`/projects/${slug}`);
      }
    },
    [itemIndex, router, setGlobalActiveProjectIndex, setGlobalShowMenu],
  );

  return (
    <div
      ref={parentRef}
      className="relative flex flex-wrap gap-1 pb-2 lg:flex-row lg:pb-1"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pointer-events-none absolute top-0 z-10 w-full lg:w-[calc(50%-16px)]">
        <div
          className="pointer-events-none"
          ref={stickyElRef}
          style={{ height: `${height}px` }}
        >
          <div
            className="pointer-events-auto sticky flex w-full cursor-pointer justify-start gap-1"
            style={{
              top: TOP_MARGIN + itemIndex * SPACING,
            }}
            onClick={() => handleClick(item.slug?.current)}
          >
            <Text>{formatDate(item.year, 'yyyy')}</Text>
            <Text className={'sticky top-0'}>{item.title}</Text>
          </div>
        </div>
      </div>

      <div
        className="relative ml-auto w-full cursor-pointer lg:w-1/2"
        onClick={() => handleClick(item.slug?.current)}
      >
        <CustomImage
          asset={item?.thumbnail}
          className="h-auto w-full object-cover"
          priority={itemIndex <= 4 ? true : false}
          vw={[100, 25, 25]}
        />
      </div>
    </div>
  );
};

export default MenuItem;
