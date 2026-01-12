'use client';
import { useCallback } from 'react';
import { QueryProjectsResult } from '@/sanity/types/sanity.types';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store/store';
import MenuItem from './MenuItem/MenuItem';
import { motion } from 'motion/react';
import { menuVariants } from '@/utils/animationUtils';

type Props = {
  data: QueryProjectsResult | null;
};

const Menu = (props: Props) => {
  const { data } = props;
  const pathname = usePathname();
  const { globalShowMenu, setGlobalShowMenu, setGlobalScrollPosition } =
    useStore((state) => state);

  const handleMouseLeave = useCallback(() => {
    setGlobalScrollPosition();
    if (pathname.includes('/projects/') && globalShowMenu) {
      setGlobalShowMenu(false);
    }
  }, [globalShowMenu, pathname, setGlobalShowMenu]);

  return (
    <motion.div
      onMouseLeave={handleMouseLeave}
      initial={menuVariants.hide}
      exit={menuVariants.hide}
      animate={globalShowMenu ? menuVariants.show : menuVariants.hide}
    >
      {data?.map((item, index) => (
        <div key={`${item._id}`}>
          <MenuItem
            item={item}
            itemIndex={index}
          />
        </div>
      ))}
      <div className="pointer-events-none h-[100vh]" />
    </motion.div>
  );
};

export default Menu;
