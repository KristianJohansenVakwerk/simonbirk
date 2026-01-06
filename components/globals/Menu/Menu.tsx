'use client';
import { useEffect, useRef, useState } from 'react';
import { QueryProjectsResult } from '@/sanity/types/sanity.types';

import MenuItem from './MenuItem/MenuItem';
import { motion } from 'motion/react';

type Props = {
  data: QueryProjectsResult | null;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
  handleClick: (url: string) => void;
  activeIndex: number | null;
};
export const Menu = (props: Props) => {
  const { data, handleMouseEnter, handleMouseLeave, handleClick, activeIndex } =
    props;

  return (
    <>
      <>
        {data?.map((item, index) => (
          <div key={`${item._id}`}>
            <MenuItem
              item={item}
              itemIndex={index}
            />
          </div>
        ))}
        <div className="pointer-events-none h-[100vh]" />
      </>
    </>
  );
};

export default motion.create(Menu);
