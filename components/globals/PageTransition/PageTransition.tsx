'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { useStore } from '@/store/store';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { saveScrollPosition, getScrollPosition } = useStore();

  useEffect(() => {
    console.log('page transition')
    return () => {
      saveScrollPosition(pathname);
    };
  }, [pathname, saveScrollPosition]);

  useEffect(() => {
    const scrollPosition = getScrollPosition(pathname);

    if (scrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, scrollPosition);
      }, 250);
    }
  }, [pathname, getScrollPosition]);

  return <>{children}</>;
};

export default PageTransition;
