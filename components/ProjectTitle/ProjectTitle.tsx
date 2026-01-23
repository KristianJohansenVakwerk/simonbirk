'use client';
import { formatDate } from '@/utils/utils';
import Box from '../shared/ui/Box/Box';
import Text from '../shared/ui/Text/Text';
import { useStore } from '@/store/store';
import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
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
    <motion.div
      className={
        'relative mb-2 mt-[16px] grid cursor-pointer grid-cols-8 gap-1 pb-[100px] last:mb-0 lg:mt-0 lg:px-0 lg:px-1'
      }
      key={computedTitle + computedYear}
      initial={menuVariants.initial}
      animate={menuVariants.show as any}
      exit={menuVariants.hide as any}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseEnter}
    >
      <Box className={'col-span-4 flex flex-row gap-1'}>
        <Text>Back to overview</Text>
        <Text>
          [{globalActiveProjectCurrentIndex}/{globalActiveProjectMediaLen}]
        </Text>
      </Box>
      <Box className={'col-span-4'}>
        <Box className={'flex gap-1'}>
          <Text className="hidden lg:block">{formatDate(year as string)}</Text>
          <Text>{title as string}</Text>
        </Box>
      </Box>
    </motion.div>
  );
};

export default ProjectTitle;
