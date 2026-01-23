'use client';
import CustomImage from '@/components/shared/ui/Image/Image';
import Text from '@components/shared/ui/Text/Text';
import { useCallback, useEffect, useRef, useState } from 'react';
import { formatDate } from '@/utils/utils';
import { useStore } from '@/store/store';
import { usePathname, useRouter } from 'next/navigation';
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
  const pathname = usePathname();
  const {
    setGlobalHoverProject,
    setGlobalThumbIndex,
    setGlobalShowMenu,
    setGlobalScrollPosition,
  } = useStore((state) => state);

  const deviceInfo = useDeviceDetection();

  const TOP_MARGIN = deviceInfo.isMobile ? 16 : 75;
  const SPACING = deviceInfo.isMobile ? 14 : 16;

  useEffect(() => {
    const calculateHeight = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const parentEl = parentRef.current;

      if (!parentEl) return;

      heightRef.current = scrollHeight - parentEl.offsetTop;
      setHeight(scrollHeight - parentEl.offsetTop);
    };

    // Calculate initial height
    calculateHeight();

    // Add resize listener
    window.addEventListener('resize', calculateHeight);

    // Cleanup
    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (deviceInfo.isTouchDevice) return;
    router.prefetch(`/projects/${item.slug?.current}`);
    setGlobalThumbIndex(itemIndex);
    setGlobalHoverProject(true);
  }, [
    itemIndex,
    item.slug,
    router,
    setGlobalHoverProject,
    setGlobalThumbIndex,
    deviceInfo.isTouchDevice,
  ]);

  const handleMouseLeave = useCallback(() => {
    if (deviceInfo.isTouchDevice) return;

    setGlobalThumbIndex(-1);
    setGlobalHoverProject(false);
  }, [deviceInfo.isTouchDevice, setGlobalHoverProject, setGlobalThumbIndex]);

  const handleClick = useCallback(
    (slug: string | null) => {
      if (deviceInfo.isTouchDevice) {
        setGlobalThumbIndex(itemIndex);
        setGlobalHoverProject(true);

        const isOnProjectPage = pathname.startsWith('/projects/');

        if (isOnProjectPage) {
          router.push(`/projects/${slug}`);
          setGlobalShowMenu(false);
        } else {
          setGlobalShowMenu(false);

          router.push(`/projects/${slug}`);
        }
      } else {
        setGlobalShowMenu(false);

        if (slug) {
          setGlobalScrollPosition();

          router.push(`/projects/${slug}`);
        }
      }
    },
    [
      deviceInfo.isTouchDevice,
      setGlobalThumbIndex,
      itemIndex,
      setGlobalHoverProject,
      setGlobalShowMenu,
      router,
      setGlobalScrollPosition,
      pathname,
    ],
  );

  return (
    <div
      ref={parentRef}
      className="relativer group grid cursor-pointer grid-cols-8 flex-wrap gap-1 pb-1 lg:flex-row"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleClick(item.slug?.current)}
    >
      <div className="relative col-span-4 w-full cursor-pointer lg:col-span-4">
        <CustomImage
          asset={item?.thumbnail}
          className="h-auto w-full object-cover"
          priority={itemIndex <= 4 ? true : false}
          vw={[100, 25, 25]}
        />
      </div>
      <div className="relative col-span-4 lg:col-span-4">
        <div className="pointer-events-none absolute right-0 top-0 z-10 w-full">
          <div
            className="pointer-events-none"
            ref={stickyElRef}
            style={{ height: `${height}px` }}
          >
            <div
              className="pointer-events-auto sticky flex w-full cursor-pointer flex-col justify-start gap-[6px] lg:flex-row lg:gap-1"
              style={{
                top: TOP_MARGIN + itemIndex * SPACING,
              }}
            >
              <Text className="hidden transition-colors duration-300 ease-in-out lg:block lg:group-hover:text-hover">
                {formatDate(item.year, 'yyyy')}
              </Text>
              <Text
                className={
                  'sticky top-0 transition-colors duration-300 ease-in-out lg:group-hover:text-hover'
                }
              >
                {item.title}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
