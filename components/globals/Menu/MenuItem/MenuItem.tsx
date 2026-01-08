import CustomImage from '@/components/shared/ui/Image/Image';
import Text from '@components/shared/ui/Text/Text';
import { useCallback, useEffect, useRef, useState } from 'react';
import { formatDate } from '@/utils/utils';
import { useStore } from '@/store/store';
import { useRouter, usePathname } from 'next/navigation';

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
    globalShowMenu,
    setGlobalActiveProjectIndex,
  } = useStore((state) => state);

  let TOP_MARGIN = 75;
  let SPACING = 16;

  useEffect(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const parentEl = parentRef.current;

    if (!parentEl) return;

    heightRef.current = scrollHeight - parentEl.offsetTop;
    setHeight(scrollHeight - parentEl.offsetTop);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setGlobalThumbIndex(itemIndex);
    setGlobalHoverProject(true);
  }, [itemIndex]);

  const handleMouseLeave = useCallback(() => {
    setGlobalThumbIndex(-1);
    setGlobalHoverProject(false);

    if (pathname.includes('/projects/') && globalShowMenu) {
      setGlobalShowMenu(false);
    }
  }, [globalShowMenu]);

  const handleClick = useCallback(
    async (slug: string | null) => {
      setGlobalActiveProjectIndex(itemIndex);
      await setGlobalShowMenu(false);

      if (slug) {
        await router.push(`/projects/${slug}`);
      }
    },
    [itemIndex],
  );

  return (
    <div
      ref={parentRef}
      className="relative flex flex-row flex-wrap pb-1"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pointer-events-none absolute top-0 z-10 w-[calc(50%-16px)]">
        <div
          className="pointer-events-none"
          ref={stickyElRef}
          style={{ height: `${height}px` }}
        >
          <div
            className="pointer-events-auto sticky flex w-full cursor-pointer justify-between"
            style={{ top: TOP_MARGIN + itemIndex * SPACING }}
            onClick={() => handleClick(item.slug?.current)}
          >
            <Text className={'sticky top-0'}>{item.title}</Text>
            <Text>{formatDate(item.year, 'yyyy')}</Text>
          </div>
        </div>
      </div>

      <div
        className="ml-auto w-[50%] cursor-pointer"
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
