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
    globalShowMenu,
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
          'relative mb-2 grid cursor-pointer grid-cols-6 justify-between transition-colors duration-300 last:mb-0'
        }
        key={computedTitle + computedYear}
        initial={menuVariants.hide}
        animate={menuVariants.show}
        exit={menuVariants.hide}
      >
        <Box
          className={'col-span-3'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Box className={'row flex justify-between'}>
            <Box className={'col-span-2'}>
              <Text>{title as string}</Text>
            </Box>
            <Box className={'col-span-1 flex items-end justify-end pr-1'}>
              <Text>{formatDate(year as string)}</Text>
            </Box>
          </Box>
        </Box>
        <Box className={'col-span-3'}>
          <Text>
            [{globalActiveProjectCurrentIndex}/{globalActiveProjectMediaLen}]
          </Text>
        </Box>
      </MotionBox>
    </AnimatePresence>
  );
};

export default ProjectTitle;

const MotionBox = motion.create(Box);
