'use client';
import { formatDate } from '@/utils/utils';
import Box from '../shared/ui/Box/Box';
import Text from '../shared/ui/Text/Text';
import { useStore } from '@/store/store';
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useParams } from 'next/navigation';
import { motion } from 'motion/react';
import { menuVariants } from '@/utils/animationUtils';
import { QueryProjectsResult } from '@/sanity.types';

interface Props {
  data: QueryProjectsResult;
}
const ProjectTitle = (props: Props) => {
  const { data } = props;
  const {
    setGlobalShowMenu,
    globalActiveProjectMediaLen,
    globalActiveProjectCurrentIndex,
    globalProjectOrder,
  } = useStore((state) => state);
  const pathname = usePathname();
  const params = useParams();
  const [title, setTitle] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);

  useEffect(() => {
    const projectIndex = globalProjectOrder.findIndex((p) => p === params.slug);

    if (projectIndex !== -1) {
      setTitle(data?.[projectIndex]?.title ?? null);
      setYear(data?.[projectIndex]?.year ?? null);
    }
  }, [globalProjectOrder, data, params, setTitle, setYear]);

  const handleMouseEnter = useCallback(() => {
    if (pathname === '/') return;
    setGlobalShowMenu(true);
  }, [pathname, setGlobalShowMenu]);

  const handleMouseLeave = useCallback(() => {
    if (pathname === '/') return;
    setGlobalShowMenu(false);
  }, [pathname, setGlobalShowMenu]);

  return (
    <motion.div
      className={
        'relative mb-2 mt-[16px] grid cursor-pointer grid-cols-8 gap-1 pb-[30px] last:mb-0 lg:mt-0 lg:px-0 lg:px-1 lg:pb-[100px]'
      }
      key={title + (year ?? '')}
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
