'use client';
import { formatDate } from '@/utils/utils';
import Box from '../shared/ui/Box/Box';
import Text from '../shared/ui/Text/Text';
import { useStore } from '@/store/store';
import { useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface Props {
  title: string | null;
  year: string | null;
}
const ProjectTitle = (props: Props) => {
  const { title, year } = props;
  const { setGlobalShowMenu } = useStore((state) => state);
  const pathname = usePathname();

  const handleMouseEnter = useCallback(() => {
    console.log('enter: ', pathname);
    if (pathname === '/') return;
    setGlobalShowMenu(true);
  }, [pathname, setGlobalShowMenu]);

  const handleMouseLeave = useCallback(() => {
    console.log('leave: ', pathname);
    if (pathname === '/') return;
    setGlobalShowMenu(false);
  }, [pathname, setGlobalShowMenu]);

  return (
    <Box
      className={
        'relative mb-2 grid cursor-pointer grid-cols-6 justify-between transition-colors duration-300 last:mb-0'
      }
    >
      <Box
        className={'col-span-3'}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box className={'relative left-0 top-0 z-10 col-span-3'}>
          <Box className={'grid grid-cols-3 hover:text-hover'}>
            <Box className={'col-span-2'}>
              <Text>{title as string}</Text>
            </Box>
            <Box className={'col-span-1 flex items-end justify-end pr-1'}>
              <Text>{formatDate(year as string)}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectTitle;
