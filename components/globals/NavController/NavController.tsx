'use client';

import { QueryProjectsResult } from '@/sanity.types';
import { AnimatePresence } from '../AnimatePresence/AnimatePrecence';

import { useStore } from '@/store/store';
import ProjectTitle from '@/components/ProjectTitle/ProjectTitle';
import Menu from '../Menu/Menu';
import { useEffect, useRef } from 'react';

type Props = {
  projects: QueryProjectsResult | null;
};

const NavController = (props: Props) => {
  const { projects } = props;

  const { globalShowMenu, globalScrollPosition } = useStore((state) => state);

  const scrollPosRef = useRef<number | null>(null);

  useEffect(() => {}, []);

  useEffect(() => {
    scrollPosRef.current = globalScrollPosition;
  }, [globalScrollPosition]);

  const handleExitAnimation = () => {
    if (scrollPosRef.current !== null) {
      const targetY = scrollPosRef.current;

      // Wait for DOM to be ready and have proper height
      // Use multiple requestAnimationFrame calls to ensure content is rendered
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Check if document is tall enough to scroll to target position
          const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;
          const scrollTo = Math.min(targetY, maxScroll);

          window.scrollTo(0, scrollTo);
        });
      });
    }
  };

  return (
    <AnimatePresence onExitComplete={handleExitAnimation}>
      {globalShowMenu ? (
        <Menu
          key="menu"
          data={projects}
        />
      ) : (
        <ProjectTitle
          key="project-title"
          data={projects ?? []}
        />
      )}
    </AnimatePresence>
  );
};

export default NavController;
