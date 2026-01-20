'use client';
import { formatDate } from '@/utils/utils';
import Box from '../shared/ui/Box/Box';
import Text from '../shared/ui/Text/Text';
import { useStore } from '@/store/store';
import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { menuVariants } from '@/utils/animationUtils';

interface Props {
  title: string | null;
  year: string | null;
}
const ProjectTitle = (props: Props) => {
  const { title, year } = props;
  const {
    setGlobalShowMenu,
    globalActiveProjectMediaLen,
    globalActiveProjectCurrentIndex,
  } = useStore((state) => state);
  const pathname = usePathname();

  const handleMouseEnter = useCallback(() => {
    if (pathname === '/') return;
    setGlobalShowMenu(true);
  }, [pathname, setGlobalShowMenu]);

  const handleMouseLeave = useCallback(() => {
    if (pathname === '/') return;
    setGlobalShowMenu(false);
  }, [pathname, setGlobalShowMenu]);

  const computedTitle = title ? title : '';
  const computedYear = year ? year : '';

  return (
    <AnimatePresence mode="wait">
      <MotionBox
        className={
          'relative mb-2 mt-[16px]  cursor-pointer  gap-1 lg:px-1 last:mb-0 lg:mt-0 grid grid-cols-8 lg:px-0'
        }
        key={computedTitle + computedYear}
        initial={menuVariants.hide}
        animate={menuVariants.show}
        exit={menuVariants.hide}
      >
        <Box className={'col-span-4'}>
          <Text>
            [{globalActiveProjectCurrentIndex}/{globalActiveProjectMediaLen}]
          </Text>
        </Box>
        <Box
          className={'col-span-4'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleMouseEnter}
        >
          <Box className={'flex gap-1'}>
            <Text className='hidden lg:block'>{formatDate(year as string)}</Text>
            <Text>{title as string}</Text>
          </Box>
        </Box>
      </MotionBox>
    </AnimatePresence>
  );
};

export default ProjectTitle;

const MotionBox = motion.create(Box);
