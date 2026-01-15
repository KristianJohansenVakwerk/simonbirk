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
          'relative mb-2 mt-2 flex cursor-pointer flex-row justify-between px-1 last:mb-0 lg:mt-0 lg:grid lg:grid-cols-6 lg:px-0'
        }
        key={computedTitle + computedYear}
        initial={menuVariants.hide}
        animate={menuVariants.show}
        exit={menuVariants.hide}
        style={{ border: '1px solid blue' }}
      >
        <Box
          className={'col-span-6 lg:col-span-3'}
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
        <Box className={'col-span-6 lg:col-span-3'}>
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
