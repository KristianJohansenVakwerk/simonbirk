import CustomImage from '@/components/shared/ui/Image/Image';
import Text from '@components/shared/ui/Text/Text';
import clsx from 'clsx';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { formatDate } from '@/utils/utils';
import { flushSync } from 'react-dom';

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

  let spacing = 16;

  useEffect(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const parentEl = parentRef.current;

    if (!parentEl) return;

    heightRef.current = scrollHeight - parentEl.offsetTop;
    setHeight(scrollHeight - parentEl.offsetTop);
  }, []);

  return (
    <div
      ref={parentRef}
      className="relative flex flex-row flex-wrap pb-1"
    >
      <div className="pointer-events-none absolute top-0 z-10 w-[calc(50%-16px)]">
        <div
          className="pointer-events-none"
          ref={stickyElRef}
          style={{ height: `${height}px` }}
        >
          <a
            href={`/projects/${item.slug?.current}`}
            className="pointer-events-auto sticky flex w-full justify-between"
            style={{ top: 75 + itemIndex * spacing }}
          >
            <Text className={'sticky top-0'}>{item.title}</Text>
            <Text>{formatDate(item.year, 'yyyy')}</Text>
          </a>
        </div>
      </div>

      <a
        href={`/projects/${item.slug?.current}`}
        style={{ width: '50%', marginLeft: 'auto' }}
      >
        <CustomImage
          asset={item?.thumbnail}
          className="h-auto w-full object-cover"
        />
      </a>
    </div>
  );
};

export default MenuItem;
