'use client';

import { AnimatePresence as _AnimatePresence } from 'motion/react';

export const AnimatePresence = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <_AnimatePresence
      mode="wait"
      onExitComplete={() => console.log('Animation Finished')}
    >
      {children}
    </_AnimatePresence>
  );
};
