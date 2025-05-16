'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { getScrollPosition, saveScrollPosition } from '../../../utils/store';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  useEffect(() => {
    return () => {
      saveScrollPosition(pathname);
    };
  }, [pathname]);

  useEffect(() => {
    const scrollPosition = getScrollPosition(pathname);

    if (scrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, scrollPosition);
      }, 250);
    }
  }, [pathname]);

  return <>{children}</>;
};

export default PageTransition;
