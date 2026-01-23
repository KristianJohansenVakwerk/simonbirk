'use client';
import { useCallback } from 'react';
import { QueryProjectsResult } from '@/sanity/types/sanity.types';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store/store';
import MenuItem from './MenuItem/MenuItem';
import { menuVariants } from '@/utils/animationUtils';
import { motion } from 'motion/react';
import React from 'react';

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
  }, [globalShowMenu, pathname, setGlobalScrollPosition, setGlobalShowMenu]);

  return (
    <motion.div
      onMouseLeave={handleMouseLeave}
      initial={menuVariants.initial}
      exit={menuVariants.hide as any}
      animate={menuVariants.show as any}
      className="mt-[16px] w-full lg:mt-0"
    >
      {data?.map((item, index) => (
        <React.Fragment key={`${item._id}`}>
          <MenuItem
            item={item}
            itemIndex={index}
          />
        </React.Fragment>
      ))}
      <div className="pointer-events-none h-[100vh]" />
    </motion.div>
  );
};

export default Menu;
