'use client';

import CustomImage from '@/components/shared/ui/Image/Image';
import { QueryProjectsResult } from '@/sanity.types';
import { useStore } from '@/store/store';
import { motion } from 'motion/react';
import { menuVariants } from '@/utils/animationUtils';

type Props = {
  projects: QueryProjectsResult | null;
};

const ThumbController = (props: Props) => {
  const { projects } = props;
  const { globalShowMenu } = useStore((state) => state);

  return (
    <motion.div
      className="grid-cols-15 pointer-events-none absolute left-0 top-[75px] z-10 grid w-full items-center justify-center gap-x-1 gap-y-1"
      initial={menuVariants.hide}
      animate={globalShowMenu ? menuVariants.show : menuVariants.hide}
      exit={menuVariants.hide}
    >
      <div className="col-span-1 col-start-9">
        {projects &&
          projects.map((item, index) => {
            return (
              <div
                key={item._id}
                className="mb-1"
              >
                <CustomImage
                  asset={item?.thumbnail}
                  className="h-auto w-full object-cover"
                  priority={index <= 4 ? true : false}
                  vw={[100, 25, 25]}
                />
              </div>
            );
          })}
      </div>
    </motion.div>
  );
};

export default ThumbController;
