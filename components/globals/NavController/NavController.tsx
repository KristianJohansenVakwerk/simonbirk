'use client';

import { QueryProjectsResult } from '@/sanity.types';
import { AnimatePresence } from '../AnimatePresence/AnimatePrecence';

import { useStore } from '@/store/store';
import ProjectTitle from '@/components/ProjectTitle/ProjectTitle';
import Menu from '../Menu/Menu';
import { useEffect, useRef, useState } from 'react';

type Props = {
  projects: QueryProjectsResult | null;
};

const NavController = (props: Props) => {
  const { projects } = props;

  const { globalShowMenu, globalActiveProjectIndex, globalScrollPosition } =
    useStore((state) => state);

  const scrollPosRef = useRef<number | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);

  useEffect(() => {
    if (projects?.[globalActiveProjectIndex]) {
      setTitle(projects?.[globalActiveProjectIndex]?.title ?? null);
      setYear(projects?.[globalActiveProjectIndex]?.year ?? null);
    }
  }, [globalActiveProjectIndex, projects]);

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
          title={title ?? null}
          year={year ?? null}
        />
      )}
    </AnimatePresence>
  );
};

export default NavController;
