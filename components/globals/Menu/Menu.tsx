'use client';
import { useCallback } from 'react';
import { QueryProjectsResult } from '@/sanity/types/sanity.types';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store/store';
import MenuItem from './MenuItem/MenuItem';
import { motion } from 'motion/react';
import { menuVariants } from '@/utils/animationUtils';
import React from 'react';
import MenuItemMobile from './MenuItem/MenuItemMobile';
import { useDeviceDetection } from '@/utils/useDeviceDetection';

type Props = {
  data: QueryProjectsResult | null;
};

const Menu = (props: Props) => {
  const { data } = props;
  const pathname = usePathname();
  const { globalShowMenu, setGlobalShowMenu, setGlobalScrollPosition } =
    useStore((state) => state);

  const deviceInfo = useDeviceDetection();

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
      className="mt-[64px] lg:mt-0"
    >
      {data?.map((item, index) => (
        <React.Fragment key={`${item._id}`}>
          {deviceInfo.isDesktop && (
            <MenuItem
              item={item}
              itemIndex={index}
            />
          )}

          {deviceInfo.isMobile && (
            <div className="mt-2 block">
              <MenuItemMobile
                item={item}
                itemIndex={index}
              />
            </div>
          )}
        </React.Fragment>
      ))}
      <div className="pointer-events-none h-[100vh]" />
    </motion.div>
  );
};

export default Menu;
