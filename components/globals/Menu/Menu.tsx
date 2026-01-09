'use client';
import { useCallback } from 'react';
import { QueryProjectsResult } from '@/sanity/types/sanity.types';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store/store';
import MenuItem from './MenuItem/MenuItem';

type Props = {
  data: QueryProjectsResult | null;
};
const Menu = (props: Props) => {
  const { data } = props;
  const pathname = usePathname();
  const { globalShowMenu, setGlobalShowMenu } = useStore((state) => state);

  const handleMouseLeave = useCallback(() => {
    if (pathname.includes('/projects/') && globalShowMenu) {
      setGlobalShowMenu(false);
    }
  }, [globalShowMenu, pathname, setGlobalShowMenu]);

  return (
    <div onMouseLeave={handleMouseLeave}>
      {data?.map((item, index) => (
        <div key={`${item._id}`}>
          <MenuItem
            item={item}
            itemIndex={index}
          />
        </div>
      ))}
      <div className="pointer-events-none h-[100vh]" />
    </div>
  );
};

export default Menu;
