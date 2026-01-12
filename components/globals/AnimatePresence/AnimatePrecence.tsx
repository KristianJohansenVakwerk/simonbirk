'use client';

import { AnimatePresence as _AnimatePresence } from 'motion/react';

export const AnimatePresence = ({
  children,
  onExitComplete,
}: {
  children: React.ReactNode;
  onExitComplete?: () => void | null;
}) => {
  return (
    <_AnimatePresence
      mode="wait"
      onExitComplete={onExitComplete}
    >
      {children}
    </_AnimatePresence>
  );
};
