'use client';
import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store/store';
const StoreInitializer = () => {
  const pathname = usePathname();

  const { setGlobalShowMenu, setGlobalIntroDone, globalIntroDone } = useStore(
    (state) => state,
  );

  useLayoutEffect(() => {
    setGlobalShowMenu(pathname === '/');

    if (globalIntroDone) return;
    setGlobalIntroDone(pathname !== '/');
  }, [pathname]);

  return null;
};

export default StoreInitializer;
